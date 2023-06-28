import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, NavLink } from 'react-router-dom';
import { auth } from '../../../firebase';
import S from './Header.module.css';
import { HashLoader, PuffLoader } from 'react-spinners';

const Header = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <header className={S.header}>
      <div className={S.logo}>
        <NavLink to={'/'}>
          <div className={S.logoImg}></div>
        </NavLink>
      </div>
      <nav className={S.nav}>
        <NavLink
          to={'main'}
          className={({ isActive }) => (isActive ? `${S.link} ${S.active}` : S.link)}
        >
          Игра
        </NavLink>
        <NavLink
          to={'chat'}
          className={({ isActive }) => (isActive ? `${S.link} ${S.active}` : S.link)}
        >
          Чат
        </NavLink>
      </nav>
      <div className={S.user}>
        {loading ? (
          <div className={S.loader}>
            <PuffLoader
              color="#fedd2c"
              size={16}
            />
          </div>
        ) : user ? (
          <Link to={'auth'}>
            <img
              src={user?.photoURL || './images/avatar.png'}
              alt="profile image"
              className={S.avatar}
              title={user.displayName || ''}
            />
          </Link>
        ) : (
          <NavLink
            to={'auth'}
            className={({ isActive }) => (isActive ? `${S.link} ${S.active}` : S.link)}
          >
            Войти
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
