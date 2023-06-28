import { KeyboardProps } from '../../types';
import getKeyClassName from '../../utils/getKeyClassName';
import S from './Keyboard.module.css';

const letters = ['ЙЦУКЕНГШЩЗХЪ', 'ФЫВАПРОЛДЖЭ', 'ЯЧСМИТЬБЮ', '✓', '⌫'];

export const Keyboard = ({ inputValue, setInputValue, submitAttempt, charColors, isError }: KeyboardProps) => {
  const handleClick = (char: string) => {
    if (char === letters[4]) {
      // console.log('delete');
      setInputValue(inputValue.slice(0, inputValue.length - 1));
    } else if (char === letters[3]) {
      // console.log('submit');
      submitAttempt(inputValue);
    } else {
      setInputValue(inputValue + char);
      // console.log('char :>> ', char);
    }
  };

  return (
    <div className={S.keyboard}>
      <div className={S.row1}>
        {letters[0].split('').map((char, index) => {
          return (
            <button
              key={index}
              className={getKeyClassName(charColors, char.toLowerCase())}
              disabled={inputValue.length === 5 || isError}
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleClick((e.target as HTMLElement).innerText)}
            >
              {char}
            </button>
          );
        })}
      </div>
      <div className={S.row2}>
        {letters[1].split('').map((char, index) => {
          return (
            <button
              key={index}
              className={getKeyClassName(charColors, char.toLowerCase())}
              disabled={inputValue.length === 5 || isError}
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleClick((e.target as HTMLElement).innerText)}
            >
              {char}
            </button>
          );
        })}
      </div>
      <div className={S.row3}>
        <button
          className={S.special}
          disabled={inputValue.length !== 5 || isError}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleClick((e.target as HTMLElement).innerText)}
        >
          {letters[3]}
        </button>
        {letters[2].split('').map((char, index) => {
          return (
            <button
              key={index}
              className={getKeyClassName(charColors, char.toLowerCase())}
              disabled={inputValue.length === 5 || isError}
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleClick((e.target as HTMLElement).innerText)}
            >
              {char}
            </button>
          );
        })}
        <button
          className={S.special}
          disabled={inputValue.length === 0 || isError}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleClick((e.target as HTMLElement).innerText)}
        >
          {letters[4]}
        </button>
      </div>
    </div>
  );
};

export default Keyboard;
