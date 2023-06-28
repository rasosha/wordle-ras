import { useState } from 'react';
import { doesWordExists } from '../../utils/wordsCheck';
import attemptCheck from '../../utils/attemptCheck';
import S from './Game.module.css';
import Keyboard from '../Keyboard';
import getLetterClassName from '../../utils/getLetterClassName';

interface GameProps {
  answer: string;
  attempts: string[];
  setAttempts: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Game = ({ answer, attempts, setAttempts }: GameProps) => {
  const [inputValue, setInputValue] = useState('');
  const [attemptsColors, setAttemptsColors] = useState<string[]>([]);
  const [greenKeys, setGreenKeys] = useState<Set<string>>(new Set());
  const [yellowKeys, setYellowKeys] = useState<Set<string>>(new Set());
  const [blackKeys, setBlackKeys] = useState<Set<string>>(new Set());
  const [error, setError] = useState(false);

  const submitAttempt = (word: string) => {
    if (doesWordExists(word)) {
      const check = attemptCheck(word, answer);
      setGreenKeys(new Set([...greenKeys, ...check.colors.green]));
      setYellowKeys(new Set([...yellowKeys, ...check.colors.yellow]));
      setBlackKeys(new Set([...blackKeys, ...check.colors.black]));
      setAttempts([...attempts, check.attempt.word.toUpperCase()]);
      setAttemptsColors([...attemptsColors, check.attempt.check.join('')]);
      setInputValue('');
    } else {
      console.log(`${word} does not exist, try another`);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 500);
    }
  };

  const attemptsArray =
    attempts.length < 6 ? [...attempts, inputValue.padEnd(5), ...new Array(5 - attempts.length).fill('     ')] : [...attempts];

  return (
    <>
      <section className={S.gameField}>
        {attemptsArray.map((word: string, wordIndex: number) => (
          <div
            className={`${S.row}${error && wordIndex === attempts.length ? ` ${S.error}` : ''}`}
            key={wordIndex}
          >
            {word.split('').map((letter: string, letterIndex: number) => (
              <p
                className={
                  attemptsColors[wordIndex] ? getLetterClassName(attemptsColors[wordIndex], letterIndex) : `${S.letter}`
                }
                key={letterIndex}
              >
                {letter}
              </p>
            ))}
          </div>
        ))}
      </section>
      <Keyboard
        inputValue={inputValue}
        setInputValue={setInputValue}
        submitAttempt={submitAttempt}
        charColors={{
          greenSet: greenKeys,
          yellowSet: yellowKeys,
          blackSet: blackKeys,
        }}
        isError={error || attempts.length === 6}
      />
    </>
  );
};
