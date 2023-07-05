import GoogleIcon from '@mui/icons-material/Google';
import { auth, logout, signInWithGoogle } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Avatar, Button, Stack, Typography, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export const AuthPage = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
      
      }}
    >
      {loading && <CircularProgress color="primary" />}
      {user && (
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Avatar
            alt={user?.displayName || 'unknown'}
            src={user?.photoURL || '../src/assets/images/avatar.png'}
            sx={{ width: 100, height: 100 }}
          />

          <Typography
            gutterBottom
            variant="h5"
            component="div"
          >
            {user.displayName}
          </Typography>
          <Button
            disabled
            onClick={() => console.log('Изменить имя профиля')}
          >
            Изменить имя профиля
          </Button>
          <Button
            disabled
            onClick={() => console.log('Изменить изображение')}
          >
            Изменить изображение
          </Button>
          <Button
            disabled
            onClick={() => console.log('Удалить профиль')}
          >
            Удалить профиль
          </Button>
          <Button onClick={logout}>Выйти из аккаунта</Button>
        </Stack>
      )}
      {!user && (
        <Box sx={{ margin: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <Button
            onClick={signInWithGoogle}
            variant="outlined"
            startIcon={<GoogleIcon />}
            size="large"
          >
            Войти
          </Button>
        </Box>
      )}
    </Box>
  );
};
