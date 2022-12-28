import React from 'react';
import './style-DashboardUser.scss';
import { Outlet } from 'react-router-dom';

import Navigation from '../Layouts/DashboardAdminNavigation/DashboardNavigationAdmin';
import HeaderNavigation from '../Layouts/Dashboard/HeaderNavigation';


function Dashboard(props) {
  const carInfo = { name: "Ford", model: "Mustang" };
  return (
    <div id='DashboardHolder'>
      <div id="Navigation">
        <Navigation />
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
