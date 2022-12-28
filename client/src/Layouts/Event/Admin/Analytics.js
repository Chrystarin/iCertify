import React from 'react'
import './Analytics.scss';
import PicNotification from './../../../images/iCertifyBranding/icon.png';

function Analytics() {
  return (
    <div id='Container_Analytics'>
      <div id='AnalyticsTitle'>
        <div>
          <h5>Analytics</h5>
          <select name="cars" id="cars" className='SelectDropdown'>
            <option value="volvo">Overview of this year</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </div>
        <div>
          <img src={PicNotification} alt="" />
        </div>
      </div>

      {/* Analytics general */}
      <div id='Container_AnalyticsOverview'>
        {/* Event Analytics */}
        <div id='Event_AnalyticsOverview' className=''>
            <div id='Holder_TotalEvent_Analytics'>
              <h3>23</h3>
              <p>Total Events</p>
            </div>
            <div id='Holder_OngoingEvents_Analytics'>
              <h3>23</h3>
              <p>Ongoing Events</p>
            </div>
            <div id='holder_UpcomingEvents_Analytics'>
              <h3>23</h3>
              <p>Upcoming Events</p>
            </div>
        </div>
        {/* Accountant Analytics */}
        <div id='Accountant_AnalyticsOverview'>
          <div>
            <h3>1.5 <span>ETH</span></h3>
            <h6>125,122.3 Peso</h6>
            <p>Current ETH on Wallets</p>
          </div>
          <div>
            <h3>1.5 <span>ETH</span></h3>
            <h6>125,122.3 Peso</h6>
            <p>Current ETH on Wallets</p>
          </div>
        </div>
        {/* Members Analytics */}
        <div id='Members_AnalyticsOverview'>
          <div>
            <h3>25</h3>
            <p>Total Members</p>
          </div>
          <div>
            <h3>35</h3>
            <p>Total Premium Members</p>
          </div>
        </div>
      </div>


      {/* Container for the panel */}
      <div className='Container_Panel'>
        <div className='Container_PanelTitle'>
          <h6 className='PanelTitle'>Member Engagements</h6>
          <select name="cars" id="cars" className='SelectDropdown'>
            <option value="volvo">Overview of this year</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </div>
        <div className='Container_PanelContent'>
          <div className='Container_Graph_Panel'>
            
          </div>
          <div className='Container_Percentage_Panel'>
            <h3>23%</h3>
          </div>
        </div>
      </div>
      <div className='Container_Panel'>
        <div className='Container_PanelTitle'>
          <h6 className='PanelTitle'>Member Engagements</h6>
          <select name="cars" id="cars" className='SelectDropdown'>
            <option value="volvo">Overview of this year</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </div>
        <div className='Container_PanelContent'>
          <div className='Container_Graph_Panel'>
            
          </div>
          <div className='Container_Percentage_Panel'>
            <h3>23%</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics