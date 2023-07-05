import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const drawerWidth = 240;

export default function PersistentDrawerRight() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Box>
      <IconButton
        color="primary"
        edge="end"
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            background: '#212121',
            color: '#fff',
            fontSize: '20px',
            width: drawerWidth,
          },
        }}
      >
        <IconButton
          color="primary"
          sx={{ height: '48px', width: '48px' }}
          onClick={() => setOpen(false)}
        >
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
        <Divider />
        <List>
          <ListItem>
            <ListItemButton
              onClick={() => {
                setOpen(false);
                navigate('/');
              }}
            >
              Правила
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                setOpen(false);
                navigate('game');
              }}
            >
              Игра
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                setOpen(false);
                navigate('chat');
              }}
            >
              Чат
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                setOpen(false);
                navigate('results');
              }}
            >
              Результаты
            </ListItemButton>
          </ListItem>
        </List>
      </SwipeableDrawer>
    </Box>
  );
}
