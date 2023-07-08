import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import challengeJpg from '../assets/images/challenge.jpg';
import trainJpg from '../assets/images/train.jpg';

export const GameSelect = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  return loading ? (
    <CircularProgress color="primary" />
  ) : (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: { xs: '200px', sm: '350px', md: '600px' },
        padding: '12px',
      }}
    >
      <Card sx={{ background: '#272727' }}>
        <CardMedia
          component="img"
          image={challengeJpg}
          alt="challenge"
          sx={{ height: { xs: '100px', sm: '150px', md: '200px' } }}
        />
        <CardContent sx={{ padding: { xs: 1, sm: 1, md: 2 } }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontSize: { xs: '16px', sm: '20px', md: '24px' } }}
          >
            Соревнование
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: { xs: '12px', sm: '14px', md: '16px' } }}
          >
            {user ? 'Одно слово для всех. Обновляется раз в день.' : 'Доступно только для авторизованных пользователей.'}
          </Typography>
        </CardContent>
        <CardActions sx={{ padding: { xs: 0, sm: 1, md: 1 } }}>
          {user ? (
            <Button onClick={() => navigate('/game/challenge')}>Играть</Button>
          ) : (
            <Button onClick={() => navigate('/auth')}>Войти на сайт</Button>
          )}
        </CardActions>
      </Card>

      <Card sx={{ background: '#272727' }}>
        <CardMedia
          component="img"
          image={trainJpg}
          alt="train"
          sx={{ height: { xs: '100px', sm: '150px', md: '200px' } }}
        />
        <CardContent sx={{ padding: { xs: 1, sm: 1, md: 2 } }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontSize: { xs: '16px', sm: '20px', md: '24px' } }}
          >
            Тренировка
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: { xs: '12px', sm: '14px', md: '16px' } }}
          >
            Количество игр неограничено.
          </Typography>
        </CardContent>
        <CardActions sx={{ padding: { xs: 0, sm: 1, md: 1 } }}>
          <Button onClick={() => navigate('/game/train')}>Играть</Button>
        </CardActions>
      </Card>
    </Box>
  );
};
