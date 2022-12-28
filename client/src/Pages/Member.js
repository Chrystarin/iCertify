import React from 'react'
import './style-DashboardUser.scss';

import { Outlet } from 'react-router-dom';

// Layouts
import Navigation from '../Layouts/Dashboard/DashboardNavigation.js';
import HeaderNavigation from '../Layouts/Dashboard/HeaderNavigation';


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