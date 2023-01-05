import React,{useState} from 'react';
import './EventsAdmin.scss';

import Analytics from '../../../layouts/Event/Admin/EventAnalytics'
import Card from '../../../components/Card/Card.js';

import Filter_Icon from './../../../images/icons/filter.png';

function Dashboard() {
    const [isOpenPanel_Events , setIsOpenPanel_Events] = useState("All");
  return (
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
  )
}

function Panel_Events(props){
    if(props.open === "All"){
        return <div id='Container_All_Events'>
            <div className='Container_All_Overview' id='Container_Ongoing_Events'>
                <h5>Ongoing Events</h5>
                <div className='Wrapper_Eventcard'>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
            </div>
            <div id='Container_Ongoing Events'> 
                <h5>Upcoming Events</h5>
                <div className='Wrapper_Eventcard'>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
            </div>
        </div>
        
    }
    else if(props.open === "Ongoing"){
        return <div id='Container_Ongoing Events'> 
            <div className='Wrapper_Eventcard'>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
         </div>
    }
    else if(props.open === "Upcoming"){
        return <div id='Container_Ongoing Events'> 
        <div className='Wrapper_Eventcard'>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>
     </div>
    }
    else if(props.open === "Done"){
        return <div id='Container_Ongoing Events'> 
        <div className='Wrapper_Eventcard'>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>
     </div>
    }
    else if(props.open === "Drafts"){
        return <div id='Container_Ongoing Events'> 
        <div className='Wrapper_Eventcard'>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>
     </div>
    }
};




export default Dashboard;
