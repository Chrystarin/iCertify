import React from 'react'
import './style-DashboardUser.scss';

import { Outlet } from 'react-router-dom';

// layouts
import Navigation from '../layouts/Dashboard/DashboardNavigation.js';
import HeaderNavigation from '../layouts/Dashboard/HeaderNavigation';


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