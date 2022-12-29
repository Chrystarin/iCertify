import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {ethers} from 'ethers';

import './EventView.scss'



import Button from '../../components/Button.js';

import axios from '../../config/axios';

const EventView = (props) => {
    const { id } = useParams()
    const [event, setEvent] = useState(props)
    const [participants, setParticipants] = useState(null)
    const [memberAddress, setMemberAddress] = useState()

    const checkWallet = async () => {
        try{
            const accounts = await window.ethereum.request({method: 'eth_requestAccounts'}); 
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            setMemberAddress(address);
        }
        catch(err){
            console.error(err.message);
        }
    }

    const joinEvent = async () => {
        try{
            
            const response = await axios.post(`events/${id}/join`,
            JSON.stringify({ eventId: id, walletAddress: memberAddress, role: 'Participant' }),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                console.log("event joined!");
            });
        }
        catch (err){
            console.error(err.message);
        }
    };

    function eventJoined(json, value) {
        let contains = false;
        Object.keys(json).some(key => {
            contains = typeof json[key] === 'object' ? eventJoined(json[key], value) : json[key] === value;
             return contains;
        });
        return contains;
     }

    useEffect(() => {
        const fetchEvent = async () => {
            const response  = await fetch(`http://localhost:6787/events/${id}`)

            const json = await response.json()

            if(response.ok){
                setEvent(json)
            }
        }

        const fetchParticipants = async () =>{
            const response = await fetch(`http://localhost:6787/events/${id}/participants`)

            const json = await response.json()

            if(response.ok){
                setParticipants(json)
            }
        }

        fetchParticipants()
        fetchEvent()
        checkWallet()
    }, [])

    

    if(!event || !participants) return <div>loading...</div>

    return (
        <div id="Event-View">
            <div id="Container_Event_Header">
                <div id="Holder_Wallpaper_Event">
                </div>
                <div id="Holder_DateButton_Event">
                    <div id="Holder_Date_Event">
                        <h3>{event.date ? event.date.start : '...'}</h3>
                        <p>{event.date ? event.date.start : '...'}</p>
                    </div>
                    <div id="Holder_Button_Event">
                        { eventJoined(participants, memberAddress) ? (
                            // If member has already joined
                            <div>
                                <Button BtnType="Primary" Value="Joined"/>
                            </div>
                        ) : (
                            // If member has not yet joined
                            <div>
                                <Button BtnType="Primary" Value="Join Event" onClick={() => joinEvent()}/>
                            </div>
                        )
                        }
                    </div>
                </div>
                <div id="Holder_Title_Event">
                    <h5 id="Date_Event">{event.date ? (event.date.start) : '...'}</h5>
                    <h3 id="Title_Event">{event.title}</h3>
                </div>
            </div>
            <div id="Container_Event_Details">
                <div class="Wrapper_Left_Event_Details">
                    <div class="Container_Details Container_EventDetails">
                        <h4>Details</h4>
                        <p className="BodyText2">{event.description}</p>
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
                            <Button BtnType="Primary" Value="Test"/>
                        </div>
                    </div>
                    <div className="Container_EventDetails" id="Container_Multiple">
                        <div>
                            <h4>Event Type</h4>
                            <p>{event.type}</p>
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
                            <p>{event.location}</p>
                        </div>
                        <div>
                            <h4>Link</h4>
                            <p>{event.link}</p>
                        </div>
                    </div>
                    
                </div>
            </div>
            {participants.length > 0 && participants.map((participant) => {
                return(<h5>Participant: {participant.member.walletAddress}</h5>)
            })}
        </div>
    )
}

export default EventView