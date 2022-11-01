import React from 'react';

import Header from './../../Components/Header/Header';
import LandingPage from './../LandingPage';
import Footer from './../../Components/Footer/Footer';

import {Route, BrowserRouter as Router} from 'react-router-dom';

function Home() {
  return (
    <>
        <Header/>
        <LandingPage/>
        <Footer/>
    </>
  )
}

export default Home;
