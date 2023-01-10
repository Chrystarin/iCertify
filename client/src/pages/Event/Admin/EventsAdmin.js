import React,{useState, useEffect} from 'react';
import './EventsAdmin.scss';

import Analytics from '../../../layouts/Event/Admin/EventAnalytics'
import Card from '../../../components/Card/Card.js';

import Filter_Icon from './../../../images/icons/filter.png';

import axios from '../../../config/axios';

function EventsAdmin() {
    const [isOpenPanel_Events , setIsOpenPanel_Events] = useState("All");
    

    return (
        <div id='AdminDasboard'>
            <section id='Events'>
                <div className='Title__Div'>
                <h2 className='SectionTitle'>Event</h2>
                <h5 className='SectionSubTitle'>All Event in the Organization</h5>
                </div>
                
                <div className='Navigation_Event'>
                    <button className={(isOpenPanel_Events === "All")? "Selected":""} onClick={() => setIsOpenPanel_Events("All")}>All</button>
                    {/* <button className={(isOpenPanel_Events === "Ongoing")? "Selected":""} onClick={() => setIsOpenPanel_Events("Ongoing")}>Ongoing</button> */}
                    <button className={(isOpenPanel_Events === "Upcoming")? "Selected":""} onClick={() => setIsOpenPanel_Events("Upcoming")}>Upcoming</button>
                    <button className={(isOpenPanel_Events === "Done")? "Selected":""} onClick={() => setIsOpenPanel_Events("Done")}>Done</button>
                    <button className={(isOpenPanel_Events === "Drafts")? "Selected":""} onClick={() => setIsOpenPanel_Events("Drafts")}> Drafts</button>

                    <a id="AddEventBtn" href="/a/events/create" style={{float:"right", height:"100%"}}>Add Event</a>
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
    const [events, setEvents] = useState(null);

	useEffect(() => {
		// Retrieves All Events Data
		const fetchEvents = async () => {
			const response = await axios.get(`/events`).then((response) => {
				setEvents(response.data);
			});
		};

		fetchEvents();
	}, []);

	if (!events) return <div>loading...</div>;
    
    if(props.open === "All"){
        return <div id='Container_All_Events'>
            {/* <div className='Container_All_Overview' id='Container_Ongoing_Events'>
                <h5>Ongoing Events</h5>
                <div className='Wrapper__Card'>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
            </div> */}
            <div id='Container_Ongoing Events'> 
                {/* <h5>Upcoming Events</h5> */}
                <div className='Wrapper__Card'>
                {events.length > 0 && events.map((event) => {
                    if (event.status == 'active') {
                        return (
                            <Card
                                title={event.title}
                                key={event.eventId}
                                id={event.eventId}
                                date={event.date.start}
                                type={'event_admin'}
                            />
                        );
                    }
				})}
                </div>
            </div>
        </div>
        
    }
    // else if(props.open === "Ongoing"){
    //     return <div id='Container_Ongoing Events'> 
    //         <div className='Wrapper__Card'>
    //             <Card/>
    //             <Card/>
    //             <Card/>
    //             <Card/>
    //             <Card/>
    //             <Card/>
    //             <Card/>
    //             <Card/>
    //         </div>
    //      </div>
    // }
    else if(props.open === "Upcoming"){
        return <div id='Container_Ongoing Events'> 
        <div className='Wrapper__Card'>
            {events.length > 0 && events.map((event) => {
                if (event.status == 'active') {
                    return (
                        <Card
                            title={event.title}
                            key={event.eventId}
                            id={event.eventId}
                            date={event.date.start}
                            type={'event_admin'}
                        />
                    );
                }
            })}
        </div>
     </div>
    }
    else if(props.open === "Done"){
        return <div id='Container_Ongoing Events'> 
        <div className='Wrapper__Card'>
            {events.length > 0 && events.map((event) => {
                if (event.status == 'inactive') {
                    return (
                        <Card
                            title={event.title}
                            key={event.eventId}
                            id={event.eventId}
                            date={event.date.start}
                            type={'event_admin'}
                        />
                    );
                }
            })}
        </div>
     </div>
    }
    else if(props.open === "Drafts"){
        return <div id='Container_Ongoing Events'> 
        <div className='Wrapper__Card'>
            {events.length > 0 && events.map((event) => {
                if (event.status == 'draft') {
                    return (
                        <Card
                            title={event.title}
                            key={event.eventId}
                            id={event.eventId}
                            date={event.date.start}
                            type={'event_admin'}
                        />
                    );
                }
            })}
        </div>
     </div>
    }
};




export default EventsAdmin;
