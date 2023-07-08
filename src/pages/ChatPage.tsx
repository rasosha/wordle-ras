import { useEffect, useState } from 'react';
import { auth, getMessages, sendMessage } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IMessage } from '../types';
import Message from '../components/Message';
import SendIcon from '@mui/icons-material/Send';
import { Box, Modal, Stack, CircularProgress, Typography, TextField, IconButton } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

export const ChatPage = () => {
  const [user, loading] = useAuthState(auth);
  const [inputValue, setInputValue] = useState('');
  const [chatHistory, setChatHistory] = useState<IMessage[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const getMsgs = async () => {
    if (!isLoading) {
      setIsLoading(true);
      const res = await getMessages('chat');
      setChatHistory(res);
      console.log(res);
      setIsLoading(false);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault;
    setInputValue(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    console.log('value :>> ', inputValue, Date.now());
    user &&
      inputValue.trim() !== '' &&
      (await sendMessage(
        user.uid,
        inputValue,
        user.displayName || user.uid,
        user.photoURL || './src/assets/images/avatar.png',
      ));
    getMsgs();
    setInputValue('');
    setIsSending(false);
  };

  useEffect(() => {
    getMsgs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      component={'main'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        pb: '24px',
        height: { xs: 'calc(100vh - 48px - 24px)', sm: 'calc(100vh - 64px - 24px)', md: 'calc(100vh - 72px - 24px)' },
        width: { xs: '100%', sm: '100%', md: '600px' },
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

      <Stack
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          gap: '12px',
          flexDirection: 'column-reverse',
          justifyContent: 'end',
          overflow: 'auto',
        }}
      >
        {chatHistory?.length ? (
          chatHistory.map((msg) => (
            <Message
              message={msg.message}
              name={msg.name}
              uid={msg.uid}
              photoURL={msg.photoURL}
              createdAt={msg.createdAt}
              key={msg.createdAt}
            />
          ))
        ) : (
          <Typography
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Нет сообщений.
          </Typography>
        )}
      </Stack>
      {isSending && (
        <Box sx={{ width: '100%', position: 'absolute', bottom: '0' }}>
          <LinearProgress color="primary" />
        </Box>
      )}
      <form
        onSubmit={handleSubmit}
        style={{ width: '100%' }}
      >
        <Stack
          direction={'row'}
          sx={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextField
            id="outlined-basic"
            label="Ваше сообщение"
            variant="outlined"
            fullWidth
            disabled={isSending || !user}
            onChange={handleInput}
            type="text"
            value={inputValue}
            sx={{ px: 1 }}
          />
          <IconButton
            sx={{ padding: '12px', transition: 'all 1s', display: inputValue ? 'flex' : 'none' }}
            aria-label="menu"
            color={inputValue ? 'primary' : 'default'}
            disabled={isSending || !user || !inputValue}
            type="submit"
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
    </Box>
  );
};
