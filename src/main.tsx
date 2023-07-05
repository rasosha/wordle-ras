import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './assets/styles/index.css';
import './assets/styles/reset.css';

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
