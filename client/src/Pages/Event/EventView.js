import React, { useState, useEffect } from "react";
import '../../Assets/Styles/Page/style-EventView.scss'

import Navigation from './../../Components/DashboardUserNavigation/DashboardNavigation';
import HeaderNavigation from './../../Components/DashboardUserNavigation/HeaderNavigation';

import Button from '../../Components/Small Compontents/Button.js';

import { useParams } from "react-router-dom";

const EventView = (props) => {
    const { id } = useParams()
    const [event, setEvent] = useState(props)

    useEffect(() => {
        const fetchEvent = async () => {
            const response  = await fetch(`http://localhost:5000/api/events/${id}`)

            const json = await response.json()

            if(response.ok){
                setEvent(json)
            }
        }

        fetchEvent()
    }, [])

    if(!event) return <div>loading...</div>

  return (
    <div id='DashboardHolder'>
        <div id="Navigation">
            <Navigation />
        </div>
        <div id="Holder_Content">
            <HeaderNavigation/>
            <div id="Content">
                <div id="Event-View">
                    <div id="Container_Event_Header">
                        <div id="Holder_Wallpaper_Event">
                        </div>
                        <div id="Holder_DateButton_Event">
                            <div id="Holder_Date_Event">
                                <h3>28</h3>
                                <p>JULY</p>
                            </div>
                            <div id="Holder_Button_Event">
                                <div>
                                    <Button Action="Link" Link="" BtnType="Primary" Value="Content"/>
                                </div>
                            </div>
                        </div>
                        <div id="Holder_Title_Event">
                            <h5 id="Date_Event">JULY 2, 2022 MONDAY @ 3:00 AM</h5>
                            <h3 id="Title_Event">The Future of Money, Governance, & the Law</h3>
                        </div>
                    </div>
                    <div id="Container_Event_Details">
                        <div class="Wrapper_Left_Event_Details">
                            <div class="Container_Details Container_EventDetails">
                                <h4>Details</h4>
                                <p className="BodyText2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel autem officia quia ipsam beatae voluptatum molestiae ad doloribus iste necessitatibus natus delectus animi dignissimos, veniam saepe adipisci rem eos. Facilis saepe qui sed, molestiae nihil, optio culpa est voluptatem eos dignissimos tempore debitis, voluptas eligendi similique blanditiis doloremque libero tenetur.</p>
                            </div>
                            <div id="Wrapper_Container">
                                <div class="Container_Host Container_EventDetails">
                                    <h4>Host</h4>
                                </div>
                                <div class="Container_Analytics Container_EventDetails">
                                    <h4>
                                        Going
                                    </h4>
                                </div>
                            </div>
                            
                        </div>
                        <div className="Wrapper_Right_Event_Details">
                            <div className="Container_EventDetails" id="Holder_Certificate_Event_Details">
                                <h4>Certificate</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, blanditiis?</p>
                                <div>
                                    <Button Action="Link" Link="" BtnType="Primary" Value="Claim"/>
                                </div>
                            </div>
                            <div className="Container_EventDetails" id="Container_Multiple">
                                <div>
                                    <h4>Event Type</h4>
                                    <p>Onsite</p>
                                </div>
                                <div>
                                    <h4>Contact</h4>
                                    <ul>
                                        <li>
                                            <p>0908-265-7587</p>
                                        </li>
                                        <li>
                                            02-942 3307
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h4>
                                        Email
                                    </h4>
                                    <p>YourEmail@mail.com</p>
                                </div>
                                <div>
                                    <h4>Location</h4>
                                    <p>Saint Dominic, Marikina City</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EventView
{/* <ul>
                <li>Id: {event.eventId}</li>
                <li>Type: {event.type}</li>
                <li>Title: {event.title}</li>
                <li>Description: {event.description}</li>
                <li>Link: {event.link} </li>
                <li>Location: {event.location} </li>
                <li>Date Start: {event.date ? event.date.start : '...'} </li>
                <li>Date End: {event.date ? event.date.end : '...'}  </li>
                <li>CanClaimDocument: {event.canClaimDocument} </li>
                <li>Status: {event.status} </li>
                <li>isAcceptingVolunteer: {event.isAcceptingVolunteer} </li>
            </ul> */}