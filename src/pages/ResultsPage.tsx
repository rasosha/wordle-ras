import { auth, getResults } from '../firebase';
import { useEffect, useState } from 'react';
import formatData from '../utils/formatUTC';
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
  const [isAvailable, setAvailable] = useState(false);

  useEffect(() => {
    if (results.find((userResult) => userResult.uid === user?.uid)) {
      setAvailable(true);
    } else {
      setAvailable(false);
    }
  }, [results, user]);

  useEffect(() => {
    if (!isLoading) {
      const date = formatData(new Date(), 'date');
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
        minHeight: { xs: 'calc(100vh - 48px - 24px)', sm: 'calc(100vh - 64px - 24px)', md: 'calc(100vh - 72px - 24px)' },
        minWidth: { xs: '100vw', sm: '320px', md: '548px' },
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
              flexDirection: { xs: 'column', sm: 'column', md: 'row' },
              boxShadow: '4',
              alignItems: 'start',
              justifyContent: 'start',
              p: { xs: 1, sm: 1, md: 2 },
              gap: { xs: 0, sm: 0, md: 2 },
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
                <Typography sx={{ fontSize: { sm: 20, xs: 16 } }}>{result.name}</Typography>
                <Typography
                  sx={{ fontSize: { sm: 16, xs: 12 }, opacity: 0.5, textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                >{`Количество попыток: ${result.attempts.length}`}</Typography>
              </Box>
            </Box>
            <Button
              sx={{ margin: { xs: 0, sm: 0, lg: 2 }, alignSelf: { xs: 'end', sm: 'end', md: 'center' } }}
              onClick={() => user && setShowResult(result.uid)}
              disabled={!user || !isAvailable}
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
                key={res.uid}
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
