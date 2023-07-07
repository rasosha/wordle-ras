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
        display: 'flex',
        gap: '12px',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
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
            gap: '12px',
            width: { xs: '100vw', sm: '100vw', md: '600px' },
            height: '20vw',
            maxHeight: { xs: '32px', sm: '48px', md: '64px' },
          }}
        >
          {word.split('').map((letter: string, letterIndex: number) => {
            const color = attemptsColors[wordIndex] ? attemptsColors[wordIndex][letterIndex] : '';
            const chooseAnimation = () => {
              if (animate) {
                if (color) {
                  return `${Flip} 0.8s 1 ease ${0.4 * letterIndex}s`;
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
                  borderRadius: '12px',
                  minWidth: { xs: '32px', sm: '48px', md: '64px' },
                  minHeight: { xs: '32px', sm: '48px', md: '64px' },
                  maxWidth: { xs: '32px', sm: '48px', md: '64px' },
                  maxHeight: { xs: '32px', sm: '48px', md: '64px' },
                  width: '15%',
                  height: '15%',
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
