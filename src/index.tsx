import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import { VisibleContextProvider } from './context/visible-context';

import './styles/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <VisibleContextProvider>
      <App />
    </VisibleContextProvider>
  </React.StrictMode>
);
