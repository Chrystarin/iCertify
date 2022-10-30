import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';


import Header from './Components/Header/Header'
import LandingPage from './Pages/LandingPage'
import Footer from './Components/Footer/Footer'
import Modal from './Components/Modal/Modal'

import reportWebVitals from './reportWebVitals';
;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Header />
    <LandingPage/>
    <Footer/>
    {/* <Modal/> */}
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
