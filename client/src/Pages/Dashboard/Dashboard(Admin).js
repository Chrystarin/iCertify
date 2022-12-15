import React from 'react';
import './../../Assets/Styles/Page/style-DashboardUser.scss';


import Navigation from '../../Layouts/DashboardAdminNavigation/DashboardNavigationAdmin';
import HeaderNavigation from '../../Layouts/Dashboard/HeaderNavigation';


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
            
          
        </div>
      </div>
    </div>
  )
}





export default Dashboard;
