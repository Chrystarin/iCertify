import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';

import './../../Assets/Styles/Page/style-DashboardUser.scss';
import './../../Assets/Styles/Page/style-Event.scss';
import Navigation from './../../Components/DashboardUserNavigation/DashboardNavigation';
import HeaderNavigation from './../../Components/DashboardUserNavigation/HeaderNavigation';

import CredentialTab from '../../Components/Credential/CredentialTab.js';
import EventCard from '../../Components/Events/EventCard.js';

function Event() {

  const [events, setEvents] = useState(null)

  useEffect(() => {
      const fetchEvents = async () => {
          const response  = await fetch('http://localhost:5000/api/events')
          const json = await response.json()

          if(response.ok){
              setEvents(json)
          }
      }

      fetchEvents()
  }, [])

  return (
    <div id='DashboardHolder'>
      <div id="Navigation">
        <Navigation />
      </div>
      <div id="Holder_Content">
        <HeaderNavigation/>
        <div id="Content">
          <section id='Events'>
            <h4>Events</h4>
            <div id="Navigatoin_Event">
              <button id="FeaturedEvents" className="Selected">Featured Events</button>
              <button id="JoinedEvents" >Joined Events</button>
              <button id="ManageEvents">Manage Events</button>
            </div>
            <div class="container">
              <div class="Container_Event_SlideShow">Container_Event_SlideShow</div>
              <div class="Container_Advertisement">Container_Advertisement</div>
              <div class="Container_UpcomingEvents">
              {events.map((event) => 
                    <EventCard title={event.title} eventId={event.eventId}/>
                )}
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

export default Event;
