import getLetterClassName from '../../utils/getLetterClassName';
import S from './GameField.module.css';

interface GameFieldProps {
  attemptsArray: string[];
  attemptsColors: string[];
  isError?: boolean;
  animate?: boolean;
}

export const GameField = ({ attemptsArray, attemptsColors, isError = false, animate = false }: GameFieldProps) => {
  return (
    <section className={`${S.gameField}${animate ? '' : ' ' + S.noAnimation}`}>
      {attemptsArray.map((word: string, wordIndex: number) => (
        <div
          className={`${S.row}${isError && wordIndex === attemptsArray.length ? ` ${S.error}` : ''}`}
          key={wordIndex}
        >
          {word.split('').map((letter: string, letterIndex: number) => (
            <p
              className={attemptsColors[wordIndex] ? getLetterClassName(attemptsColors[wordIndex], letterIndex) : `${S.letter}`}
              key={letterIndex}
            >
              {letter}
            </p>
          ))}
        </div>
      ))}
    </section>
  );
};
