import React from 'react';
import './../../Assets/Styles/Page/style-DashboardUser.scss';

import Navigation from '../../Components/DashboardAdminNavigation/DashboardNavigationAdmin';
import HeaderNavigation from '../../Components/DashboardAdminNavigation/HeaderNavigationAdmin';

import CredentialTab from '../../Components/Credential/CredentialTab.js';
import EventCard from '../../Components/Events/EventCard.js';
function Dashboard() {

  return (
    <div id='DashboardHolder'>
      <div id="Navigation">
        <Navigation />
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
