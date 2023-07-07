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
        maxWidth: { sm: '350px', xs: '200px' },
        padding: '12px',
      }}
    >
      <Card sx={{ background: '#272727' }}>
        <CardMedia
          component="img"
          image={challengeJpg}
          alt="challenge"
          sx={{ height: { sm: '200px', xs: '100px' } }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
          >
            Соревнование
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {user ? 'Одно слово для всех. Обновляется раз в день.' : 'Доступно только для авторизованных пользователей.'}
          </Typography>
        </CardContent>
        <CardActions>
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
          sx={{ height: { sm: '200px', xs: '100px' } }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
          >
            Тренировка
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Количество игр неограничено.
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => navigate('/game/train')}>Играть</Button>
        </CardActions>
      </Card>
    </Box>
  );
};
