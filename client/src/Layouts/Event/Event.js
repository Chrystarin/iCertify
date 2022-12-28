import React, { useState, useEffect } from "react";

import './../../routes/style-DashboardUser.scss';
import './../../Assets/Styles/Page/style-Event.scss';


import EventCard from './EventCard.js';

import ImagePosterSample from './../../Assets/Images/placeholder/PosterSample.jpg'

function Event() {

  const [isOpenPanel_Events , setIsOpenPanel_Events] = useState("FeaturedEvents"); 


  return (
    <section id='Events'>
       <h4>Events</h4>
        <div className="Navigation_Event">
          <button id="FeaturedEvents" className={(isOpenPanel_Events === "FeaturedEvents")? "Selected":""}  onClick={() => setIsOpenPanel_Events("FeaturedEvents")}>Featured Events</button>
          <button id="JoinedEvents" className={(isOpenPanel_Events === "JoinedEvents")? "Selected":""} onClick={() => setIsOpenPanel_Events("JoinedEvents")}>Joined Events</button>
          <span>.</span>
          <button id="ManageEvents" className={(isOpenPanel_Events === "ManageEvents")? "Selected":""} onClick={() => setIsOpenPanel_Events("ManageEvents")}>Manage Events</button>
        </div>
        <div id='Panel_Events'>
          <Panel_Events open={isOpenPanel_Events}/>
        </div>
    </section>
  );
}

function Panel_Events(props){
  const [events, setEvents] = useState(null)

  useEffect(() => {
      const fetchEvents = async () => {
          const response  = await fetch('http://localhost:6787/events')
          const json = await response.json()

          if(response.ok){
              setEvents(json)
          }
      }

      fetchEvents()
  }, [])
  
  if(!events) return <div>loading...</div>

  if(props.open === "FeaturedEvents"){
    return (
      <div id='Container_FeaturedEvents'>
          <div id='Container_Ads_FeaturedEvents' >
              <div id='Slider_FeaturedEvents'>
                <a href="http://"><img src={ImagePosterSample} alt=""/></a>
              </div>
              <div id='Ads_FeaturedEvents'>
                <span>Advertisement</span>
              </div>
          </div>
          <div id='Container_Upcoming_FeaturedEvents'>
            
            <h5>Upcoming Events</h5>
            <div id="Wrapper_Upcoming_FeaturedEvents">
              {events.length > 0 && events.map((event) => {
                if(event.status == 'active'){
                  return(<EventCard title={event.title} key={event.eventId} eventId={event.eventId} dateStart={event.date.start}/>)
                }
              }
              )}
            </div>
          </div>
      </div>
    );
  }
  else if(props.open === "JoinedEvents"){
    return (
      <div id='Container_JoinedEvents'>
          <div className="EventPerMonths">
            <span>October 2022</span>
            <EventCard/>
          </div>
          <div className="EventPerMonths">
            <span>October 2022</span>
            <EventCard/>
          </div>
      </div>
    );
  }else if(props.open === "ManageEvents"){
    return (
      <div id='Container_ManageEvents'>
          ManageEvents
      </div>
    );
  }
};
export default Event;
