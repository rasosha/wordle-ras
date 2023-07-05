import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../firebase';

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '24px',
      }}
    >
      <p>Страница не найдена</p>
      <button
        style={{
          padding: '6px',
        }}
        onClick={() => navigate('/')}
      >
        На стартовую страницу
      </button>

      <button onClick={() => getUserInfo('eNZh5B2jZIcdZeKwS5fPlOYHqKk2')}>test</button>
    </main>
  );
};
