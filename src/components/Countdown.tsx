import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const nextDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate() + 1);
      const difference = nextDay.getTime() - currentTime;
      setRemainingTime(difference);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds
      .toString()
      .padStart(2, '0')}`;
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
      }}
    >
      <Box
        sx={{
          background: '#212121',
          borderRadius: '12px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: `${remainingTime ? '1' : '0'}`,
          transition: 'all 1s',
        }}
      >
        <Typography>Новое слово через:</Typography>
        <Typography sx={{ fontSize: '24px' }}>{formatTime(remainingTime)}</Typography>
      </Box>
    </Box>
  );
};

export default Countdown;
