import { useEffect, useState } from 'react';
import { doesWordExists } from '../utils/wordsCheck';
import attemptCheck from '../utils/attemptCheck';
import { Keyboard } from './Keyboard';
import { auth, getAttempts, getWordOfTheDay, sendAttempt } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import formatUTC from '../utils/formatUTC';
import { GameField } from './GameField';
import { getRandomWord } from '../utils/wordsList';
import { useNavigate } from 'react-router-dom';
import { GameResult } from './GameResult';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Modal } from '@mui/material';
import Countdown from './Countdown';

interface GameProps {
  gameMode: 'train' | 'challenge';
}

export const Game = ({ gameMode }: GameProps) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [answer, setAnswer] = useState('');
  const [attempts, setAttempts] = useState<string[]>([]);
  const [attemptsColors, setAttemptsColors] = useState<string[]>([]);
  const [greenKeys, setGreenKeys] = useState<Set<string>>(new Set());
  const [yellowKeys, setYellowKeys] = useState<Set<string>>(new Set());
  const [blackKeys, setBlackKeys] = useState<Set<string>>(new Set());
  const [isError, setIsError] = useState(false);
  const [gameResult, setGameResult] = useState<'win' | 'loss' | ''>('');
  const [user, loading] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(gameMode === 'train' ? false : true);

  const getAnswer = async () => {
    if (gameMode === 'challenge') {
      setIsLoading(true);
      const answer = await getWordOfTheDay(formatUTC(new Date(), 'date')).then((answer) => {
        console.log('answer: >>', answer);
        return answer;
      });
      setIsLoading(false);
      return answer;
    } else if (gameMode === 'train') {
      const answer = getRandomWord();
      console.log('answer :>> ', answer);
      return answer;
    } else return 'error';
  };

  const startGame = async () => {
    if (gameMode === 'challenge') {
      const answer = await getAnswer();
      setAnswer(answer);
      const att = async () => {
        if (user) {
          setIsLoading(true);
          const res = await getAttempts(formatUTC(new Date(), 'date'), user.uid);
          if (res) {
            setAttempts(res.attempts);
            setAttemptsColors(res.attemptsColors);
            setGreenKeys(res.charColors.greenSet);
            setYellowKeys(res.charColors.yellowSet);
            setBlackKeys(res.charColors.blackSet);
            setGreenKeys(new Set([...res.charColors.greenSet]));
            setYellowKeys(new Set([...res.charColors.yellowSet]));
            setBlackKeys(new Set([...res.charColors.blackSet]));
          }
          setIsLoading(false);
        }
      };
      att();
    } else if (gameMode === 'train') {
      const answer = await getAnswer();
      setAnswer(answer);
    } else navigate('/game');
  };

  const submitAttempt = (word: string) => {
    if (doesWordExists(word)) {
      const check = attemptCheck(word, answer);
      const newAttempts = [...attempts, check.attempt.word];
      setAttempts(newAttempts);
      setGreenKeys(new Set([...greenKeys, ...check.colors.green]));
      setYellowKeys(new Set([...yellowKeys, ...check.colors.yellow]));
      setBlackKeys(new Set([...blackKeys, ...check.colors.black]));
      setAttemptsColors([...attemptsColors, check.attempt.check.join('')]);
      setInputValue('');

      if (gameMode === 'challenge') {
        const date = formatUTC(new Date(), 'date');
        if (user && date) {
          sendAttempt(
            user.uid,
            date,
            [...attempts, check.attempt.word],
            [...attemptsColors, check.attempt.check.join('')],
            {
              greenSet: new Set([...greenKeys, ...check.colors.green]),
              yellowSet: new Set([...yellowKeys, ...check.colors.yellow]),
              blackSet: new Set([...blackKeys, ...check.colors.black]),
            },
            user.displayName || user.email || user.uid,
            user.photoURL || './default.png',
          );
        }
      }
      if (newAttempts.includes(answer)) {
        console.log('endgame :>> ');
        setTimeout(() => {
          setGameResult('win');
        }, 2400);
      } else if (newAttempts.length === 6) {
        setTimeout(() => {
          setGameResult('loss');
        }, 2400);
      }
    } else {
      console.log(`${word} does not exist, try another`);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 800);
    }
  };

  useEffect(() => {
    if (!loading) {
      if (gameMode === 'train') {
        startGame();
      } else if (gameMode === 'challenge') {
        if (user) {
          startGame();
        } else {
          navigate('/game');
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, gameMode, loading]);

  const attemptsArray =
    attempts.length < 6 ? [...attempts, inputValue.padEnd(5), ...new Array(5 - attempts.length).fill('     ')] : [...attempts];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: { xs: 'start', sm: 'start', md: 'center' },
        alignItems: 'center',
        py: { xs: '12px', sm: '24px', md: '24px' },
        gap: { xs: '12px', sm: '24px', md: '24px' },
        position: 'relative',
        userSelect: 'none',
      }}
    >
      <Modal
        open={!!gameResult || isLoading || loading}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', outline: 'none', backdropFilter: 'blur(4px)' }}
      >
        <Box sx={{ outline: 'none' }}>
          {!!gameResult && (
            <GameResult
              result={gameResult}
              count={attempts.length}
              answer={answer}
              setGameResult={setGameResult}
            />
          )}
          {(isLoading || loading) && (
            <CircularProgress
              color="primary"
              sx={{ outline: 'none' }}
            />
          )}
        </Box>
      </Modal>

      {!(isLoading || loading) && (
        <>
          <GameField
            attemptsArray={attemptsArray}
            attemptsColors={attemptsColors}
            attemptsCount={attempts.length}
            isError={isError}
            animate={true}
          />
          {gameMode === 'challenge' && (attempts.length === 6 || !!gameResult || attempts.includes(answer)) ? (
            <Countdown />
          ) : (
            <Keyboard
              inputValue={inputValue}
              setInputValue={setInputValue}
              submitAttempt={submitAttempt}
              charColors={{
                greenSet: greenKeys,
                yellowSet: yellowKeys,
                blackSet: blackKeys,
              }}
              disabled={isError || attempts.length === 6 || !!gameResult || attempts.includes(answer)}
            />
          )}
        </>
      )}
    </Box>
  );
};
