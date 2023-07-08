import { Box, keyframes } from '@mui/material';
import { GameFieldProps } from '../types';

const Flip = keyframes`
  0% {
    transform: scaleX(100%);
    background: #21212150;
    color: #fff;
    border: 1px solid #fdde29;
  }
  50% {
    transform: scaleX(0%);
    background: #21212150;
    color: #fff;
    border: 1px solid transparent;
  }
  100% {
    transform: scaleX(100%);
  }
`;
const Err = keyframes`
  0%, 100%{
    transform: translateX(0%);
  }
  30%, 40%, 50%, 60%, 70%{
    transform: translateX(0%) scale(90%) rotate(10deg);
    color: red;
    border-color: red;
  }
  25%, 45%, 65% {
    transform: translateX(10%) scale(90%);
    color: red;
    border-color: red;
  }
  35%, 55%, 75%{
    transform: translateX(-10%) scale(90%) rotate(-10deg);
    color: red;
    border-color: red;
  }
`;

export const GameField = ({
  attemptsArray,
  attemptsColors,
  isError = false,
  animate = false,
  attemptsCount,
}: GameFieldProps) => {
  return (
    //поле
    <Box
      component={'section'}
      sx={{
        position: 'relative',
        display: 'flex',
        gap: { xs: '6px', sm: '6px', md: '12px' },
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {attemptsArray.map((word: string, wordIndex: number) => (
        //строка
        <Box
          key={wordIndex}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: '6px', sm: '6px', md: '12px' },
          }}
        >
          {word.split('').map((letter: string, letterIndex: number) => {
            const color = attemptsColors[wordIndex] ? attemptsColors[wordIndex][letterIndex] : '';
            const chooseAnimation = () => {
              if (animate) {
                if (color) {
                  return `${Flip} 0.8s 1 ease-in-out ${0.4 * letterIndex}s`;
                } else if (isError && wordIndex === attemptsCount) {
                  return `${Err} 0.8s ease-in-out`;
                } else return 'none';
              }
            };
            return (
              //буква
              <Box
                key={letterIndex}
                sx={{
                  border: '1px solid #fdde29',
                  borderColor: color === '+' ? '#fdde29' : color === '?' ? '#fff' : color === '-' ? '#5f5f5f' : '#fdde29',
                  background: color === '+' ? '#fdde29' : color === '?' ? '#fff' : color === '-' ? '#5f5f5f' : '#21212150',
                  color: color === '+' ? '#000' : color === '?' ? '#000' : color === '-' ? '#fff' : '#fff',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: { xs: '6px', sm: '10px', md: '12px' },
                  maxWidth: '72px',
                  maxHeight: '72px',
                  width: 'calc(100vw / 5 - 12px)',
                  height: 'calc(100vw / 5 - 12px)',
                  fontSize: { xs: '20px', sm: '24px', md: '32px' },
                  animation: chooseAnimation(),
                  transition: `0.8s ${0.4 * letterIndex}s`,
                  transitionProperty: 'color, transform, border, background',
                }}
              >
                {letter}
              </Box>
            );
          })}
        </Box>
      ))}
    </Box>
  );
};
