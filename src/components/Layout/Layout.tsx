import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Box } from '@mui/material';
import background from '../../assets/images/pattern-1.svg';

export const Layout = () => {
  return (
    <>
      <Header />
      <Box
        component={'main'}
        sx={{
          pt: {
            xs: 'calc(48px)',
            sm: 'calc(64px)',
            md: 'calc(72px)',
          },
          minHeight: {
            xs: 'calc(100vh - 48px)',
            sm: 'calc(100vh - 64px)',
            md: 'calc(100vh - 72px)',
          },
          color: 'white',
          background: '#212121',
          backgroundImage: `linear-gradient(to right, #212121c0 0% 100%), url(${background})`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: { xs: 'start', sm: 'start', md: 'center' },
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};
