import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button, Typography } from '@mui/material';

const drawerWidth = 240;

export default function PersistentDrawerRight() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Box>
      <IconButton
        color="primary"
        edge="end"
        onClick={() => setOpen(true)}
        sx={{ width: 54, height: 54 }}
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
            height: { xs: '48px', sm: '64px', md: '72px' },
            pl: 2,
          }}
        >
          <Button onClick={() => setOpen(false)}>
            <ChevronLeftIcon />
            <Typography>Назад</Typography>
          </Button>
        </Box>

        <Divider />
        <List>
          <ListItem
            sx={{
              display: { xs: 'flex', sm: 'flex', md: 'none' },
            }}
          >
            <ListItemButton
              onClick={() => {
                setOpen(false);
                navigate('/');
              }}
            >
              Правила
            </ListItemButton>
          </ListItem>
          <ListItem
            sx={{
              display: { xs: 'flex', sm: 'none', md: 'none' },
            }}
          >
            <ListItemButton
              onClick={() => {
                setOpen(false);
                navigate('game');
              }}
            >
              Игра
            </ListItemButton>
          </ListItem>
          <ListItem
            sx={{
              display: { xs: 'flex', sm: 'flex', md: 'none' },
            }}
          >
            <ListItemButton
              onClick={() => {
                setOpen(false);
                navigate('chat');
              }}
            >
              Чат
            </ListItemButton>
          </ListItem>
          <ListItem
            sx={{
              display: { xs: 'flex', sm: 'none', md: 'none' },
            }}
          >
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
