import { useNavigate } from 'react-router-dom';
import { GameResultProps } from '../types';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import winJpg from '../assets/images/win.jpg';
import lossJpg from '../assets/images/loss.jpg';

export const GameResult = ({ result, count = 0, answer, setGameResult }: GameResultProps) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={result === 'win' ? winJpg : lossJpg}
        alt={result === 'win' ? 'win image' : 'loss image'}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
        >
          {result === 'win' ? 'Вы отгадали слово!' : 'Увы...'}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {result === 'win'
            ? `Победа за ${count === 1 ? ` 1 ход` : count < 5 ? ` ${count} хода` : ` ${count} ходов.`}`
            : `Было загадано слово ${answer}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            navigate('/game/');
          }}
        >
          В меню
        </Button>
        <Button
          onClick={() => {
            setGameResult && setGameResult('');
          }}
        >
          {result === 'win' ? 'Отлично' : 'Ок'}
        </Button>
      </CardActions>
    </Card>
  );
};
