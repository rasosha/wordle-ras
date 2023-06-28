import { useEffect, useState } from 'react';
import S from './ChatPage.module.css';
import { auth, getMessages, sendMessage } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IMessage } from '../../types';
import Message from '../../components/Message';
import { BarLoader, HashLoader } from 'react-spinners';

export const ChatPage = () => {
  const [user] = useAuthState(auth);
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

  return !chatHistory && isLoading ? (
    <div className={S.loaderMsgs}>
      <HashLoader color="#fedd2c" />
    </div>
  ) : (
    <section className={S.chat}>
      <div className={S.chatHistory}>
        {chatHistory?.length &&
          chatHistory.map((msg) => (
            <Message
              message={msg.message}
              name={msg.name}
              uid={msg.uid}
              photoURL={msg.photoURL}
              createdAt={msg.createdAt}
              key={msg.createdAt}
            />
          ))}
      </div>
      {user ? (
        <form
          onSubmit={handleSubmit}
          className={S.form}
        >
          <input
            className={S.input}
            type="text"
            placeholder="Ваше сообщение"
            value={inputValue}
            onChange={handleInput}
            disabled={isSending || !user}
          />
          <button
            className={S.sendBtn}
            disabled={isSending || !user}
          >
            {'>'}
          </button>
          <div className={S.loader}>
            {isSending && (
              <BarLoader
                width="100%"
                height="10px"
                color="#fedd2c"
              />
            )}
          </div>
        </form>
      ) : (
        <div className={S.form}>
          <p className={S.warning}>Чтобы написать сообщение, неоходимо авторизоваться.</p>
        </div>
      )}
    </section>
  );
};
