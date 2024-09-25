import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import StoreContext, { Context } from './Context/StoreContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreContext>
      <App />
    </StoreContext>
  </React.StrictMode>
);

