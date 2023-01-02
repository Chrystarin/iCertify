import React from 'react';
import './style-DashboardUser.scss';
import { Outlet } from 'react-router-dom';

import Navigation from '../layouts/Dashboard/DashboardNavigation.js';
import HeaderNavigation from '../layouts/Dashboard/HeaderNavigation';


function Dashboard(props) {
  const carInfo = { name: "Ford", model: "Mustang" };
  return (
    <div id='DashboardHolder'>
      <div id="Navigation">
        <Navigation UserType="Admin"/>
      </div>
      <div id="Holder_Content">
        <HeaderNavigation dropdown={carInfo}/>
        <div id="Content">
          <Outlet/>
        </div>
      </div>
    </div>
  )
}





export default Dashboard;
