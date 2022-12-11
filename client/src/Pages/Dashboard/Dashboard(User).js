import React from 'react';
import './../../Assets/Styles/Page/style-DashboardUser.scss';

import Navigation from './../../Components/DashboardUserNavigation/DashboardNavigation';
import HeaderNavigation from './../../Components/DashboardUserNavigation/HeaderNavigation';

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
        <div id="Alert">
            <ul>
              {/* Maximum of 2 alert 
              
              <li> Container of every alerts
                <a href='/ProileUpdate'>
                    <h5 className="AlertMessage">Update Account</h5>
                  </a>
                  <h5 className="Close">X</h5>
              </li>

              */}
              <li>
                <a href='/ProileUpdate'>
                  <h5 className="AlertMessage">Update Account</h5>
                </a>
                <h5 className="Close">X</h5>
              </li>
              <li>
                  <a href='/ProileUpdate'>
                    <h5 className="AlertMessage">Update Account</h5>
                  </a>
                  <h5 className="Close">X</h5>
              </li>
              
            </ul>
          </div>
          <section>
            <h4 className='SectionTitle'>Quick Access</h4>
            <CredentialTab/>
          </section>
          <section>
            <h4 className='SectionTitle'>Upcoming Events</h4>
            <div id='Holder_EventCard'>
              <div id='Wrapper_EventCard' style={{display: 'flex' , gap: '10px'}}>
                <EventCard/>
                <EventCard/>
              </div>
              <div>
                  
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}





export default Dashboard;
