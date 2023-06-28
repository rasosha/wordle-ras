import { Outlet } from 'react-router-dom';
import Header from './Header';
// import Footer from './Footer';
import S from './Layout.module.css';

export const Layout = () => {
  return (
    <>
      <Header />
      <main className={S.main}>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
};
