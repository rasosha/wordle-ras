import { NavLink } from 'react-router-dom';
import S from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={S.footer}>
      <p>2023</p>
      <NavLink to={'https://rasosha.netlify.app'} className={S.link}>Andrei Rassokhin</NavLink>
    </footer>
  );
};

export default Footer;
