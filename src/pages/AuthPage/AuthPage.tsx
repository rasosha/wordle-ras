import { BarLoader } from 'react-spinners';
import { auth, logout, signInWithGoogle } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import S from './AuthPage.module.css';

export const AuthPage = () => {
  const [user, loading] = useAuthState(auth);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (user) navigate('/main');
  // }, [user, loading]);

  return (
    <main className={S.main}>
      {loading ? (
        <BarLoader
          width="100%"
          height="10px"
          color="#aaffaa"
        />
      ) : user ? (
        <button
          onClick={logout}
          className={S.logOutBtn}
        >
          Выйти из аккаунта
        </button>
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
