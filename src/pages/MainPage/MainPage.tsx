import { useEffect, useState } from 'react';
import S from './MainPage.module.css';
import Game from '../../components/Game';
import { getRandomWord } from '../../utils/wordsList';
import formatData from '../../utils/formatData';
import { auth, getWordOfTheDay } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { HashLoader } from 'react-spinners';

export type GameState = 'select' | 'game' | 'result';
export type GameResult = 'loss' | 'win' | '';

export const MainPage = () => {
  const [user] = useAuthState(auth);
  const [attempts, setAttempts] = useState<string[]>([]);
  const [gameState, setGameState] = useState('select');
  const [gameResult, setGameResult] = useState('');
  const [word, setWord] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // checkWord('2023.06.28', 'булка');

  const startTrain = () => {
    const newWord = getRandomWord();
    setWord(newWord);
    console.log('newWord :>> ', newWord);
    setGameState('train');
    setGameResult('');
    setAttempts([]);
  };

  const startWordOfTheDay = () => {
    setIsLoading(true);
    const testDate = formatData('date', Date.now()) || '1992.10.10';
    const getWord = async () => await getWordOfTheDay(testDate.toString());
    getWord().then((answer) => {
      setWord(answer);
      console.log('answer :>> ', answer);
      setGameState('wordOfTheDay');
      setGameResult('');
      setAttempts([]);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (attempts.includes(word.toUpperCase())) {
      console.log('endgame :>> ');
      setTimeout(() => {
        setGameResult('win');
      }, 2400);
    } else if (attempts.length === 6) {
      setTimeout(() => {
        setGameResult('loss');
      }, 2400);
    }
  }, [attempts, word]);

  return (
    <main className={S.main}>
      {isLoading && (
        <section className={S.loader}>
          <HashLoader color="#fedd2c" />
        </section>
      )}
      {gameResult && (
        <section className={S.result}>
          {gameResult === 'win' && (
            <>
              <p>Ура!</p>
              <p>
                {'Победа за '}
                {attempts.length === 1
                  ? ` 1 ход`
                  : attempts.length < 5
                  ? ` ${attempts.length} хода`
                  : ` ${attempts.length} ходов`}{' '}
              </p>
              <div className={S.buttons}>
                <button
                  className={S.button}
                  onClick={() => {
                    setGameState('select');
                    setGameResult('');
                  }}
                >
                  OK!
                </button>
              </div>
            </>
          )}

          {gameResult === 'loss' && (
            <>
              <p>Не повезло.</p>
              <p>{`Было загадано слово ${word}`}</p>
              <div className={S.buttons}>
                <button
                  className={S.button}
                  onClick={() => {
                    setGameState('select');
                    setGameResult('');
                  }}
                >
                  OK!
                </button>
              </div>
            </>
          )}
        </section>
      )}
      {gameState === 'select' && (
        <div className={S.buttons}>
          <button
            className={S.button}
            disabled={!user}
            title={!user ? 'Доступно только авторизованным пользователям' : ''}
            onClick={() => startWordOfTheDay()}
          >
            Слово дня
          </button>
          <p className={S.description}>
            Одно слово для всех. <br /> Обновляется раз в день.
          </p>
          <button
            className={S.button}
            onClick={() => startTrain()}
          >
            Тренировка
          </button>
          <p className={S.description}>Количество игр неограничено. </p>
        </div>
      )}

      {(gameState === 'train' || gameState === 'wordOfTheDay') && (
        <Game
          key={word}
          answer={word}
          gameState={gameState}
          attempts={attempts}
          setAttempts={setAttempts}
        />
      )}
    </main>
  );
};
