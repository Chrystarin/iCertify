import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Route, BrowserRouter} from 'react-router-dom';
import './Assets/Styles/Main.scss';
import { AuthProvider } from './Context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App/>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)