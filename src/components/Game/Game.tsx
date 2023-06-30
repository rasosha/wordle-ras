import { useEffect, useState } from 'react';
import { doesWordExists } from '../../utils/wordsCheck';
import attemptCheck from '../../utils/attemptCheck';
import S from './Game.module.css';
import Keyboard from '../Keyboard';
import { auth, getAttempts, sendAttempt } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import formatData from '../../utils/formatData';
import { HashLoader } from 'react-spinners';
import GameField from '../GameField';

interface GameProps {
  answer: string;
  attempts: string[];
  setAttempts: React.Dispatch<React.SetStateAction<string[]>>;
  gameState: string;
}

export const Game = ({ answer, attempts, setAttempts, gameState }: GameProps) => {
  const [inputValue, setInputValue] = useState('');
  const [attemptsColors, setAttemptsColors] = useState<string[]>([]);
  const [greenKeys, setGreenKeys] = useState<Set<string>>(new Set());
  const [yellowKeys, setYellowKeys] = useState<Set<string>>(new Set());
  const [blackKeys, setBlackKeys] = useState<Set<string>>(new Set());
  const [isError, setIsError] = useState(false);
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (gameState === 'wordOfTheDay') {
      setIsLoading(true);
      const date = formatData('date', Date.now());
      const att = async () => {
        if (user && date) {
          const res = await getAttempts(date, user.uid);
          if (res) {
            console.log('res :>> ', res.attempts);
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitAttempt = (word: string) => {
    if (doesWordExists(word)) {
      const check = attemptCheck(word, answer);
      setGreenKeys(new Set([...greenKeys, ...check.colors.green]));
      setYellowKeys(new Set([...yellowKeys, ...check.colors.yellow]));
      setBlackKeys(new Set([...blackKeys, ...check.colors.black]));
      setAttempts([...attempts, check.attempt.word.toUpperCase()]);
      setAttemptsColors([...attemptsColors, check.attempt.check.join('')]);
      setInputValue('');
      if (gameState === 'wordOfTheDay') {
        const date = formatData('date', Date.now());
        if (user && date) {
          sendAttempt(
            user.uid,
            date,
            [...attempts, check.attempt.word.toUpperCase()],
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
    } else {
      console.log(`${word} does not exist, try another`);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 500);
    }
  };

  const attemptsArray =
    attempts.length < 6 ? [...attempts, inputValue.padEnd(5), ...new Array(5 - attempts.length).fill('     ')] : [...attempts];

  return (
    <>
      {isLoading && (
        <div className={S.loader}>
          <HashLoader color="#fedd2c" />
        </div>
      )}
      <GameField
        attemptsArray={attemptsArray}
        attemptsColors={attemptsColors}
        isError={isError}
        animate={true}
      />
      <Keyboard
        inputValue={inputValue}
        setInputValue={setInputValue}
        submitAttempt={submitAttempt}
        charColors={{
          greenSet: greenKeys,
          yellowSet: yellowKeys,
          blackSet: blackKeys,
        }}
        isError={isError || attempts.length === 6}
      />
    </>
  );
};
