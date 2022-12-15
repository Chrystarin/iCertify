import React from 'react'
import './../Assets/Styles/Page/style-DashboardUser.scss';

import {Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';

// Layouts
import Navigation from './../Layouts/Dashboard/DashboardNavigation.js';
import HeaderNavigation from './../Layouts/Dashboard/HeaderNavigation';

//Paths
import Dashboard from '../Pages/Dashboard/Dashboard(User)';

import Credential from './../Layouts/Credential/Credential';
import Credential_View from './../Layouts/Credential/CredentialView.js';

import Event from './../Layouts/Event/Event.js';

function User() {
  return (
    <div id='DashboardHolder'>

      <div id="Navigation">
        <Navigation />
      </div>
      <div id="Holder_Content">
        <HeaderNavigation/>
        <div id="Content">
            <Outlet/>
        </div>
      </div>

    </div>
  )
}

export default User