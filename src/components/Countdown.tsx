import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import formatUTC from '../utils/formatUTC';
import { useNavigate } from 'react-router-dom';

const Countdown = () => {
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const current = new Date(new Date().toUTCString().slice(0, -4));
      const nextDay = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 1);
      const difference = nextDay.getTime() - +current;
      if (difference === 0) {
        navigate('/game');
      }
      setRemainingTime(difference);
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        height: '25dvh',
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
        <Typography sx={{ fontSize: '24px' }}>{formatUTC(new Date(remainingTime), 'time')}</Typography>
      </Box>
    </Box>
  );
};

export default Countdown;
