import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithGoogle } from '../../firebase';
import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import PersistentDrawerRight from './Drawer';
import CircularProgress from '@mui/material/CircularProgress';
import avatarJpg from '../../assets/images/avatar.png';
import logoJpg from '../../assets/images/logo.png';

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <AppBar
      position="static"
      sx={{
        zIndex: 100,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: { sm: '72px', xs: '48px' },
      }}
    >
      <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
        <PersistentDrawerRight />
      </Box>
      <Box sx={{ display: { xs: 'none', sm: 'flex', filter: 'invert()' } }}>
        <Avatar
          sx={{ mx: '12px', width: { sm: 48, xs: 36 }, height: { sm: 48, xs: 36 } }}
          alt="logo"
          src={logoJpg}
        />
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, gap: '6px', justifyContent: 'center' }}>
        <Button
          onClick={() => navigate('/')}
          variant="text"
          color="inherit"
        >
          Правила
        </Button>
        <Button
          onClick={() => navigate('game')}
          variant="text"
          color="inherit"
        >
          Игра
        </Button>
        <Button
          onClick={() => navigate('chat')}
          variant="text"
          color="inherit"
        >
          Чат
        </Button>
        <Button
          onClick={() => navigate('results')}
          variant="text"
          color="inherit"
        >
          Результаты
        </Button>
      </Box>

      <Box sx={{ flexGrow: 0 }}>
        {loading ? (
          <CircularProgress sx={{ mx: '12px' }} />
        ) : user ? (
          <>
            <IconButton
              onClick={(event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)}
              sx={{ mx: '12px', width: { sm: 48, xs: 36 }, height: { sm: 48, xs: 36 } }}
            >
              <Avatar
                sx={{ width: { sm: 48, xs: 36 }, height: { sm: 48, xs: 36 } }}
                alt="user"
                src={user?.photoURL || avatarJpg}
              />
            </IconButton>
            <Menu
              elevation={10}
              sx={{ mt: { sm: '64px', xs: '36px' } }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  navigate('/auth');
                }}
              >
                <Typography textAlign="center">{'Профиль'}</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  signOut(auth);
                }}
              >
                <Typography textAlign="center">{'Выйти'}</Typography>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            onClick={signInWithGoogle}
            variant="contained"
            color="primary"
          >
            Войти
          </Button>
        )}
      </Box>
    </AppBar>
  );
};

export default Header;
