import React,{useState} from 'react';
import {useParams} from 'react-router-dom';

import './../../Assets/Styles/Page/style-DashboardUser.scss';
import './../../Assets/Styles/Page/style-Event.scss';
import Navigation from './../../Components/DashboardUserNavigation/DashboardNavigation';
import HeaderNavigation from './../../Components/DashboardUserNavigation/HeaderNavigation';

import CredentialTab from '../../Components/Credential/CredentialTab.js';
import EventCard from '../../Components/Events/EventCard.js';

import ImagePlaceHolder from './../../Assets/Images/placeholder/image_placeholder.jpg';
import ImagePosterSample from './../../Assets/Images/placeholder/PosterSample.jpg'

function Event() {

  //Use this id to pull event info from database
  const {id} = useParams()
  const [isOpenPanel_Events , setIsOpenPanel_Events] = useState("FeaturedEvents"); 
 
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
            <div className="Navigation_Event">
              <button id="FeaturedEvents" className="Selected"  onClick={() => setIsOpenPanel_Events("FeaturedEvents")}>Featured Events</button>
              <button id="JoinedEvents" onClick={() => setIsOpenPanel_Events("JoinedEvents")}>Joined Events</button>
              <button id="ManageEvents" onClick={() => setIsOpenPanel_Events("ManageEvents")}>Manage Events</button>
            </div>
            
            <div id='Panel_Events'>
              <Panel_Events open={isOpenPanel_Events}/>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Panel_Events(props){
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
              <EventCard/>
              <EventCard/>
              <EventCard/>
              <EventCard/>
          </div>
      </div>
    );
  }else if(props.open === "JoinedEvents"){
    return (
      <div id='Container_JoinedEvents'>
          JoinedEvents
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
