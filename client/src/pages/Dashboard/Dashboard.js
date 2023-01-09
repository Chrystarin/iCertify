import React from 'react';
import './Dashboard.scss'
import CredentialTab from '../../components/CredentialTab/CredentialTab.js';
import Card from '../../components/Card/Card.js';


function Dashboard() {

  return (
    <div>
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
              <h6 className="AlertMessage">Update Account</h6>
            </a>
            <h6 className="Close">X</h6>
          </li>
          <li>
              <a href='/ProileUpdate'>
                <h6 className="AlertMessage">Have a tour</h6>
              </a>
              <h6 className="Close">X</h6>
          </li> 
        </ul>
      </div>
      <section className='DashBoard__Container'>
        <h4 className='SectionTitle'>Owned Certificates</h4>
        <div className="Wrapper__Card">
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
      </section>
      <section className='DashBoard__Container'>
        <h4 className='SectionTitle'>Upcoming Events</h4>
        <div id='Holder_EventCard'>
          <div id='Wrapper_EventCard' style={{display: 'flex' , gap: '10px'}}>
            <Card/>
            <Card/>
          </div>
          <div>
              
          </div>
        </div>
      </section>
    </div>
  )
}





export default Dashboard;
