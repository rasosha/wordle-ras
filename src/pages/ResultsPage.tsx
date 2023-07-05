import { auth, getResults } from '../firebase';
import { useEffect, useState } from 'react';
import formatData from '../utils/formatData';
import { GameField } from '../components/GameField';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Avatar, Box, Button, CircularProgress, Modal, Typography } from '@mui/material';
import avatarJpg from '../assets/images/avatar.png';

export interface IResults {
  attempts: string[];
  attemptsColors: string[];
  date: string;
  name: string;
  photoURL: string;
  uid: string;
}

export const ResultsPage = () => {
  const [user, loading] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<IResults[]>([]);
  const [showResult, setShowResult] = useState<string>('');

  useEffect(() => {
    if (!isLoading) {
      const date = formatData('date', Date.now());
      const att = async () => {
        if (date) {
          setIsLoading(true);
          const res = await getResults(date);
          if (res) {
            const newRes = res
              .filter((result) => result.attemptsColors.includes('+++++'))
              .sort((a, b) => a.attempts.length - b.attempts.length);
            setResults(newRes);
            setIsLoading(false);
          }
        }
      };
      att();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'start',
        gap: '12px',
        py: '12px',
        height: { sm: 'calc(100vh - 72px - 24px)', xs: 'calc(100vh - 48px - 24px)' },
        minWidth: { sm: '548px', xs: '100vw' },
      }}
    >
      <Modal
        open={isLoading || loading}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', outline: 0 }}
      >
        <CircularProgress
          color="primary"
          sx={{ outline: 0 }}
        />
      </Modal>
      {!showResult ? (
        results.map((result, index) => (
          <Box
            key={index}
            sx={{
              background: '#272727',
              display: 'flex',
              flexDirection: { sm: 'row', xs: 'column' },
              boxShadow: '4',
              alignItems: { sm: 'center', xs: 'start' },
              justifyContent: 'start',
              p: { sm: 2, xs: 1 },
              gap: { sm: 2, xs: 0 },
              overflow: 'hidden',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
              <Avatar
                sx={{ width: { sm: 72, xs: 48 }, height: { sm: 72, xs: 48 } }}
                alt="user"
                src={result.photoURL || avatarJpg}
              />
              <Box>
                <Typography sx={{ fontSize: { sm: 20, xs: 16 }, textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {result.name}
                </Typography>
                <Typography
                  sx={{ fontSize: { sm: 16, xs: 12 }, opacity: 0.5, textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                >{`Колличество попыток: ${result.attempts.length}`}</Typography>
              </Box>
            </Box>

            <Button
              sx={{ margin: { sm: 2, xs: 0 }, alignSelf: { sm: 'center', xs: 'end' } }}
              onClick={() => user && setShowResult(result.uid)}
            >
              Посмотреть
            </Button>
          </Box>
        ))
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          {results
            .filter((res) => res.uid === showResult)
            .map((res) => (
              <GameField
                attemptsArray={[...res.attempts, ...new Array(6 - res.attempts.length).fill('     ')]}
                attemptsColors={res.attemptsColors}
              />
            ))}
          <Button
            variant="contained"
            size={'large'}
            onClick={() => setShowResult('')}
          >
            Закрыть
          </Button>
        </Box>
      )}
    </Box>
  );
};
