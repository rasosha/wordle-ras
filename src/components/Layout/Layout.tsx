import { Outlet } from 'react-router-dom';
import Header from './Header';
import { Box, Container } from '@mui/material';

export const Layout = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        padding: 0,
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        maxHeight: '100vh',
        overflow: 'auto',
      }}
    >
      <Header />
      <Box
        flexGrow={1}
        width="100%"
        height="100%"
        sx={{
          overflow: 'auto',
          display: 'grid',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: { sm: 'calc(100vh - 72px)', xs: 'calc(100vh - 48px)' },
        }}
        component={'main'}
      >
        <Outlet />
      </Box>
    </Container>
  );
};
