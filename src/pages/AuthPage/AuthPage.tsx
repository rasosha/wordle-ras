import { GridLoader } from 'react-spinners';
import { auth, logout, signInWithGoogle } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import S from './AuthPage.module.css';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';

export const AuthPage = () => {
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();

  return (
    <main className={S.main}>
      {loading ? (
        <GridLoader color="#fedd2c" />
      ) : user ? (
        <section className={S.btns}>
          <p>Вы авторизованы!</p>
          <button
            className={S.logOutBtn}
            onClick={() => navigate('/main')}
          >
            Играть!
          </button>

          <button
            onClick={logout}
            className={S.logOutBtn}
          >
            Выйти из аккаунта
          </button>
        </section>
      ) : (
        <button
          onClick={signInWithGoogle}
          className={S.signInBtn}
        >
          Войти с помощью Google
        </button>
      )}
    </main>
  );
};
