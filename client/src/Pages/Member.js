import React from 'react'
import './../Assets/Styles/Page/style-DashboardUser.scss';

import { Outlet } from 'react-router-dom';

// Layouts
import Navigation from '../Layouts/Dashboard/DashboardNavigation.js';
import HeaderNavigation from '../Layouts/Dashboard/HeaderNavigation';

//Paths
import Dashboard from '../Layouts/Dashboard/Dashboard';

import Credential from '../Layouts/Credential/Credential';

import Event from '../Layouts/Event/Event.js';
import Event_View from '../Layouts/Event/EventView.js'

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