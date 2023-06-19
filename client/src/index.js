import React,{useState} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext.js';
import './styles/Main.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
    <BrowserRouter>
        <AuthProvider >
            <Routes>
                <Route path="/*" element={<App/>}/>
            </Routes>
        </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)