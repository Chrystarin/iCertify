import React,{useState} from 'react';
import './../../Assets/Styles/Page/style-DashboardUser.scss';
import './../../Assets/Styles/Page/style-EventAdmin.scss';

import Navigation from '../../Components/DashboardAdminNavigation/DashboardNavigationAdmin';
import HeaderNavigation from '../../Components/DashboardAdminNavigation/HeaderNavigationAdmin';
import Analytics from '../../Components/Events/Analytics'
import EventCard from '../../Components/Events/EventCard.js';


function Dashboard() {
    const [isOpenPanel_Events , setIsOpenPanel_Events] = useState("All"); 
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
                
                <div className='Navigation_Event'>
                    <button className={(isOpenPanel_Events === "All")? "Selected":""} onClick={() => setIsOpenPanel_Events("All")}>All</button>
                    <button className={(isOpenPanel_Events === "Ongoing")? "Selected":""} onClick={() => setIsOpenPanel_Events("Ongoing")}>Ongoing</button>
                    <button className={(isOpenPanel_Events === "Upcoming")? "Selected":""} onClick={() => setIsOpenPanel_Events("Upcoming")}>Upcoming</button>
                    <button className={(isOpenPanel_Events === "Done")? "Selected":""} onClick={() => setIsOpenPanel_Events("Done")}>Done</button>
                    <button className={(isOpenPanel_Events === "Drafts")? "Selected":""} onClick={() => setIsOpenPanel_Events("Drafts")}> Drafts</button>

                    <a id="AddEventBtn" href="/Admin/Event/Create" style={{float:"right", height:"100%"}}>Add Event</a>
                    <button id=""  style={{float:"right"}}>Filter</button>       
                </div>
                <div id='Panel_Events'>
                    <Panel_Events open={isOpenPanel_Events}/>
                </div>
            </section>
            
            <Analytics/>

        </div>
      </div>
    </div>
  )
}

function Panel_Events(props){
    if(props.open === "All"){
        return "All"
    }
    else if(props.open === "Ongoing"){
        return "Ongoing"
    }
    else if(props.open === "Upcoming"){
        return "Upcoming"
    }
    else if(props.open === "Done"){
        return "Done"
    }
    else if(props.open === "Drafts"){
        return "Drafts"
    }
};




export default Dashboard;
