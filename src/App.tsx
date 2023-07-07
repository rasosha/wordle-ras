import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { ThemeProvider, createTheme } from '@mui/material';
import { GameSelect } from './components/GameSelect';
import { Game } from './components/Game';
import { MainPage } from './pages/MainPage';
import { AuthPage } from './pages/AuthPage';
import { ChatPage } from './pages/ChatPage';
import { ErrorPage } from './pages/ErrorPage';
import { ResultsPage } from './pages/ResultsPage';
import { WelcomePage } from './pages/WelcomePage';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fedd2c',
    },
    secondary: {
      main: '#212121',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 320,
      md: 600,
      lg: 960,
      xl: 1280,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: 'game',
        element: <MainPage />,
        children: [
          {
            index: true,
            element: <GameSelect />,
          },
          {
            path: 'train',
            element: <Game gameMode="train" />,
          },
          {
            path: 'challenge',
            element: <Game gameMode="challenge" />,
          },
        ],
      },
      {
        path: 'auth',
        element: <AuthPage />,
      },
      {
        path: 'chat',
        element: <ChatPage />,
      },
      {
        path: 'results',
        element: <ResultsPage />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
