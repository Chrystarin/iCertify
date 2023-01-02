import React from 'react';
import './../styles/Dashboard.scss';
import { Outlet } from 'react-router-dom';

import SideNavBar from '../layouts/SideNavBar/SideNavBar.js';
import HeaderNavigation from '../layouts/Header/Header';


function Admin(props) {
  return (
    <div id='DashboardHolder'>
      <div id="Navigation">
        <SideNavBar UserType="Admin"/>
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


export default Admin;
