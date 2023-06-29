import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import WelcomePage from './pages/WelcomePage';
import MainPage from './pages/MainPage';
import ErrorPage from './pages/ErrorPage';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';
import ResultsPage from './pages/ResultsPage';

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
        path: 'main',
        element: <MainPage />,
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
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
