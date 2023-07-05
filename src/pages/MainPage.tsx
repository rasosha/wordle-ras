import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export type GameMode = '' | 'train' | 'challenge';
export type GameResult = 'loss' | 'win' | '';

export const MainPage = () => {
  return (
    <Box
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        gap: '12px',
      }}
    >
      <Outlet />
    </Box>
  );
};
