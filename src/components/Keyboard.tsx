import { Box, Button } from '@mui/material';
import { KeyboardProps } from '../types';

const letters = ['ЙЦУКЕНГШЩЗХЪ', 'ФЫВАПРОЛДЖЭ', 'ЯЧСМИТЬБЮ', '✓', '⌫'];

export const Keyboard = ({ inputValue, setInputValue, submitAttempt, charColors, disabled }: KeyboardProps) => {
  const handleClick = (char: string) => {
    if (char === letters[4]) {
      setInputValue(inputValue.slice(0, inputValue.length - 1));
    } else if (char === letters[3]) {
      submitAttempt(inputValue);
    } else {
      setInputValue(inputValue + char);
    }
  };

  const getColor = (type: string, char: string) => {
    if (type === 'bg') {
      if (charColors.greenSet.has(char)) {
        return '#fedd2c';
      } else if (charColors.yellowSet.has(char)) {
        return '#5f5f5f';
      } else if (charColors.blackSet.has(char)) {
        return '#121212';
      } else {
        return '#212121';
      }
    } else if (type === 'color') {
      if (charColors.greenSet.has(char)) {
        return '#000000';
      } else if (charColors.yellowSet.has(char)) {
        return '#ffffff';
      } else if (charColors.blackSet.has(char)) {
        return '#ffffff';
      } else {
        return '#ffffff';
      }
    } else if (type === 'border') {
      if (charColors.greenSet.has(char)) {
        return 'none';
      } else if (charColors.yellowSet.has(char)) {
        return 'none';
      } else if (charColors.blackSet.has(char)) {
        return 'none';
      } else {
        return '1px solid #5f5f5f';
      }
    }
  };

  return (
    <Box
      component={'section'}
      maxWidth="sm"
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        gap: '12px',
        maxWidth: '600px',
        height: '25vh',
        width: { xs: '100vw', sm: '100vw', md: '600px' },
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '25%',
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        {letters[0].split('').map((char, index) => {
          return (
            <Button
              variant="outlined"
              key={index}
              disabled={inputValue.length === 5 || disabled}
              onClick={() => handleClick(char)}
              sx={{
                p: 0,
                m: 0,
                minWidth: '7%',
                fontSize: { xs: '16px', sm: '20px', md: '24px' },
                backgroundColor: getColor('bg', char),
                color: getColor('color', char),
                border: getColor('border', char),
                cursor: 'pointer',
                transition: 'all 3s',
                '&:disabled': {
                  backgroundColor: `${getColor('bg', char)}cc`,
                  color: `${getColor('color', char)}cc`,
                  border: getColor('border', char),
                },
                '&:hover': {
                  backgroundColor: `${getColor('bg', char)}cc`,
                  color: `${getColor('color', char)}cc`,
                  border: getColor('border', char),
                },
              }}
            >
              {char}
            </Button>
          );
        })}
      </Box>
      <Box
        sx={{
          width: '93%',
          height: '25%',
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        {letters[1].split('').map((char, index) => {
          return (
            <Button
              variant="outlined"
              key={index}
              disabled={inputValue.length === 5 || disabled}
              onClick={() => handleClick(char)}
              sx={{
                p: 0,
                m: 0,
                minWidth: '7%',
                fontSize: { xs: '16px', sm: '20px', md: '24px' },
                backgroundColor: getColor('bg', char),
                color: getColor('color', char),
                border: getColor('border', char),
                cursor: 'pointer',
                transition: 'all 3s',
                '&:disabled': {
                  backgroundColor: `${getColor('bg', char)}cc`,
                  color: `${getColor('color', char)}cc`,
                  border: getColor('border', char),
                },
                '&:hover': {
                  backgroundColor: `${getColor('bg', char)}cc`,
                  color: `${getColor('color', char)}cc`,
                  border: getColor('border', char),
                },
              }}
            >
              {char}
            </Button>
          );
        })}
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '25%',
          display: 'flex',
          justifyContent: 'space-evenly ',
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          disabled={inputValue.length !== 5 || disabled}
          onClick={() => handleClick(letters[3])}
          sx={{
            p: 0,
            m: 0,
            minWidth: '10.5%',
            fontSize: { xs: '16px', sm: '20px', md: '24px' },
            color: '#000000',
            backgroundColor: '#fedd2c',
            border: '#fedd2c',
            '&:disabled': {
              color: '#fff',
              backgroundColor: '#5f5f5f',
              border: '#5f5f5f',
            },
            '&:hover': {
              color: '#000000',
              backgroundColor: '#fede2ccc',
              border: '#fedd2ccc',
            },
          }}
        >
          {letters[3]}
        </Button>
        {letters[2].split('').map((char, index) => {
          return (
            <Button
              variant="outlined"
              key={index}
              disabled={inputValue.length === 5 || disabled}
              onClick={() => handleClick(char)}
              sx={{
                p: 0,
                m: 0,
                minWidth: '7%',
                fontSize: { xs: '16px', sm: '20px', md: '24px' },
                backgroundColor: getColor('bg', char),
                color: getColor('color', char),
                border: getColor('border', char),
                cursor: 'pointer',
                transition: 'all 3s',
                '&:disabled': {
                  backgroundColor: `${getColor('bg', char)}cc`,
                  color: `${getColor('color', char)}cc`,
                  border: getColor('border', char),
                },
                '&:hover': {
                  backgroundColor: `${getColor('bg', char)}cc`,
                  color: `${getColor('color', char)}cc`,
                  border: getColor('border', char),
                },
              }}
            >
              {char}
            </Button>
          );
        })}
        <Button
          variant="outlined"
          disabled={inputValue.length === 0 || disabled}
          onClick={() => handleClick(letters[4])}
          sx={{
            p: 0,
            m: 0,
            minWidth: '10.5%',
            fontSize: { xs: '16px', sm: '20px', md: '24px' },
            color: '#000000',
            backgroundColor: '#fff',
            border: '#fff',
            '&:disabled': {
              color: '#fff',
              backgroundColor: '#5f5f5f',
              border: '#5f5f5f',
            },
            '&:hover': {
              color: '#000000',
              backgroundColor: '#ffffffcc',
              border: '#ffffffcc',
            },
          }}
        >
          {letters[4]}
        </Button>
      </Box>
    </Box>
  );
};

export default Keyboard;
