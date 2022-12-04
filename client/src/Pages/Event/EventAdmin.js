import React,{useState} from 'react';
import './../../Assets/Styles/Page/style-DashboardUser.scss';
import './../../Assets/Styles/Page/style-EventAdmin.scss';

import Navigation from '../../Components/DashboardAdminNavigation/DashboardNavigationAdmin';
import HeaderNavigation from '../../Components/DashboardUserNavigation/HeaderNavigation';
import Analytics from '../../Components/Events/Analytics'
import EventCard from '../../Components/Events/EventCard.js';

import Filter_Icon from './../../Assets/Images/icons/filter.png';

function Dashboard() {
    const [isOpenPanel_Events , setIsOpenPanel_Events] = useState("All");
  return (
    <div id='DashboardHolder'>
      <div id="Navigation">
        <Navigation/>
      </div>
      <div id="Holder_Content">
        <HeaderNavigation/>
        <div id="Content">
            <div id='AdminDasboard'>
                <section id='Events'>
                    <h4>Events</h4>
                    
                    <div className='Navigation_Event'>
                        <button className={(isOpenPanel_Events === "All")? "Selected":""} onClick={() => setIsOpenPanel_Events("All")}>All</button>
                        <button className={(isOpenPanel_Events === "Ongoing")? "Selected":""} onClick={() => setIsOpenPanel_Events("Ongoing")}>Ongoing</button>
                        <button className={(isOpenPanel_Events === "Upcoming")? "Selected":""} onClick={() => setIsOpenPanel_Events("Upcoming")}>Upcoming</button>
                        <button className={(isOpenPanel_Events === "Done")? "Selected":""} onClick={() => setIsOpenPanel_Events("Done")}>Done</button>
                        <button className={(isOpenPanel_Events === "Drafts")? "Selected":""} onClick={() => setIsOpenPanel_Events("Drafts")}> Drafts</button>

                        <a id="AddEventBtn" href="/Admin/Event/Create" style={{float:"right", height:"100%"}}>Add Event</a>
                        <div className='Container_Filer'>
                            <img src={Filter_Icon} alt="" />
                        </div>
                    </div>
                    <div id='Panel_Events'>
                        <Panel_Events open={isOpenPanel_Events}/>
                    </div>
                </section>
                
                <div>
                    <Analytics/>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

function Panel_Events(props){
    if(props.open === "All"){
        return <div id='Container_All_Events'>
            <div className='Container_All_Overview' id='Container_Ongoing_Events'>
                <h5>Ongoing Events</h5>
                <div className='Wrapper_Eventcard'>
                    <EventCard/>
                    <EventCard/>
                    <EventCard/>
                    <EventCard/>
                    <EventCard/>
                    <EventCard/>
                    <EventCard/>
                    <EventCard/>
                </div>
            </div>
            <div id='Container_Ongoing Events'> 
                <h5>Upcoming Events</h5>
                <div className='Wrapper_Eventcard'>
                    <EventCard/>
                    <EventCard/>
                    <EventCard/>
                    <EventCard/>
                    <EventCard/>
                    <EventCard/>
                    <EventCard/>
                    <EventCard/>
                </div>
            </div>
        </div>
        
    }
    else if(props.open === "Ongoing"){
        return <div id='Container_Ongoing Events'> 
            <div className='Wrapper_Eventcard'>
                <EventCard/>
                <EventCard/>
                <EventCard/>
                <EventCard/>
                <EventCard/>
                <EventCard/>
                <EventCard/>
                <EventCard/>
            </div>
         </div>
    }
    else if(props.open === "Upcoming"){
        return <div id='Container_Ongoing Events'> 
        <div className='Wrapper_Eventcard'>
            <EventCard/>
            <EventCard/>
            <EventCard/>
            <EventCard/>
            <EventCard/>
            <EventCard/>
            <EventCard/>
            <EventCard/>
        </div>
     </div>
    }
    else if(props.open === "Done"){
        return <div id='Container_Ongoing Events'> 
        <div className='Wrapper_Eventcard'>
            <EventCard/>
            <EventCard/>
            <EventCard/>
            <EventCard/>
            <EventCard/>
        </div>
     </div>
    }
    else if(props.open === "Drafts"){
        return <div id='Container_Ongoing Events'> 
        <div className='Wrapper_Eventcard'>
            <EventCard/>
            <EventCard/>
            <EventCard/>
        </div>
     </div>
    }
};




export default Dashboard;
