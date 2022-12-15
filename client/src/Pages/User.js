import React from 'react'
import './../Assets/Styles/Page/style-DashboardUser.scss';

import {Route, Routes, Navigate } from 'react-router-dom';

// Layouts
import Navigation from './../Layouts/Dashboard/DashboardNavigation.js';
import HeaderNavigation from './../Layouts/Dashboard/HeaderNavigation';


//Paths

import Dashboard from '../Pages/Dashboard/Dashboard(User)'

function User() {
  return (
    <div id='DashboardHolder'>
      <div id="Navigation">
        <Navigation />
      </div>
      <div id="Holder_Content">
        <HeaderNavigation/>
        <div id="Content">
            <Routes> 
                <Route path="/Dashboard" Component={<Dashboard/>}/>
            </Routes>
        </div>
      </div>
    </div>
  )
}

export default User