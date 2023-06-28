import { useEffect, useState } from 'react';
import S from './MainPage.module.css';
import Game from '../../components/Game';
import { getRandomWord } from '../../utils/wordsList';

export type GameState = 'select' | 'game' | 'result';
export type GameResult = 'loss' | 'win' | '';

export const MainPage = () => {
  const [attempts, setAttempts] = useState<string[]>([]);
  const [gameState, setGameState] = useState('select');
  const [gameResult, setGameResult] = useState('');
  const [word, setWord] = useState(getRandomWord());

  const newGame = () => {
    const newWord = getRandomWord();
    setWord(newWord);
    console.log('newWord :>> ', newWord);
    setGameState('game');
    setGameResult('');
    setAttempts([]);
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
              <button
                className={S.button}
                onClick={() => newGame()}
              >
                Играть снова!
              </button>
              <button
                className={S.button}
                onClick={() => {
                  setGameState('select');
                  setGameResult('');
                }}
              >
                В меню.
              </button>
            </>
          )}

          {gameResult === 'loss' && (
            <>
              <p>Не повезло.</p>
              <p>{`Было загадано слово ${word}`}</p>
              <button
                className={S.button}
                onClick={() => newGame()}
              >
                Играть снова!
              </button>
              <button
                className={S.button}
                onClick={() => {
                  setGameState('select');
                  setGameResult('');
                }}
              >
                В меню.
              </button>
            </>
          )}
        </section>
      )}
      {gameState === 'select' && (
        <>
          <button
            className={S.button}
            onClick={() => newGame()}
          >
            Случайное слово
          </button>
          <button
            className={S.button}
            disabled
          >
            Слово дня (будет позже)
          </button>
        </>
      )}

      {gameState === 'game' && (
        <Game
          key={word}
          answer={word}
          attempts={attempts}
          setAttempts={setAttempts}
        />
      )}
    </main>
  );
};
