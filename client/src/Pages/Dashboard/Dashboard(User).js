import React, {useState}from 'react';
import './../../Assets/Styles/Page/style-DashboardUser.scss';

import Navigation from './../../Components/DashboardUserNavigation/DashboardNavigation';
import HeaderNavigation from './../../Components/DashboardUserNavigation/HeaderNavigation';


function Dashboard() {

  return (
    <div id='DashboardHolder'>
      <div id="Navigation">
        <Navigation/>
      </div>
      <div id="Holder_Content">
        <HeaderNavigation/>
        <div id="Content">
        </div>
      </div>
    </div>
  )
}




export default Dashboard;
