import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {ethers} from 'ethers';

import './EventView.scss'
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Card from '../../components/Card/Card'
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import axios from '../../config/axios';

const EventView = (props) => {
    const { id } = useParams()
    const [event, setEvent] = useState(props)
    const [participants, setParticipants] = useState(null)
    const [memberAddress, setMemberAddress] = useState()
    // Claim 
    const [CertificateStatus, setCertificateStatus] = useState("ReadyToClaim");
    const EventCeritifcate = true;
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];


    // Member join event function
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
                window.location.reload();
            });
        }
        catch (err){
            console.error(err.message);
        }
    };

    // Checks if member has already joined the event
    function eventJoined(json, value) {
        let contains = false;
        Object.keys(json).some(key => {
            contains = typeof json[key] === 'object' ? eventJoined(json[key], value) : json[key] === value;
             return contains;
        });
        return contains;
     }

    // Excecutes on page load
    useEffect(() => {
        // Checks currently connected wallet
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

        // Fetches event data
        const fetchEvent = async () => {
            const response = await axios.get(`/events/${id}`)
            .then((response)=>{
                setEvent(response.data)
            })
        }

        // Fetches event participants data
        const fetchParticipants = async () => {
            const response = await axios.get(`/events/${id}/participants`)
            .then((response)=>{
                setParticipants(response.data)
            })
        }

        fetchParticipants()
        fetchEvent()
        checkWallet()
    }, [])

    // Returns a view depending on certificate status
    function CertificateStatusChecker(){
        switch(CertificateStatus) {
            case "ReadyToClaim":
                return <>
                    <div id="Certificate__Status">
                        <p>Certificate is Ready to be Claim.</p>
                    </div>
                    <div id="CertificateButton">
                        <Button variant="outlined" onClick={()=> setCertificateStatus("Pending")}>Claim</Button>
                    </div>
                </>
            case 'Pending':
                return <>
                    <div id="Certificate__Status">
                        <p>Certificate is Pending.</p>
                        <CircularProgress size='20px'/>
                    </div>
                    <div id="CertificateButton">
                        <Button variant="outlined" disabled>Claim</Button>
                    </div>
                </>
            case 'Claimed':
                return <>
                    <div id="Certificate__Status">
                        <p>Certificate is sent on your wallet</p>
                        <CheckBoxIcon color="primary" />
                    </div>
                    <div id="CertificateButton">
                        <Button variant="outlined" disabled>Claim</Button>
                    </div>
                </>
            case 'Disabled':
                return <>
                    <div id="Certificate__Status">
                        <p>Certificate is not up for release for now</p>
                    </div>
                    <div id="CertificateButton">
                        <Button variant="outlined" disabled>Claim</Button>
                    </div>
                </>
            default:
                return "Certificate Error"
        }
    }

    if(!event || !participants) return <div>loading...</div>

    return (
        <div id="Event-View">
            <div id="Container_Event_Header">
                <div id="Holder_Wallpaper_Event">
                </div>
                <div id="Holder_DateButton_Event">
                    <div id="Holder_Date_Event">
                        <h3>{event.date ? (new Date(event.date.start)).getDate() : '...'}</h3>
                        <p>{event.date ? month[(new Date(event.date.start)).getMonth()] : '...'}</p>
                    </div>
                    <div id="Holder_Button_Event">
                        { eventJoined(participants, memberAddress) ? (
                            // If member has already joined
                            <div>
                                <Button BtnType="Primary" Value="Joined" disabled/>
                            </div>
                        ) : (
                            // If member has not yet joined
                            <div id="JoinButton__Container">
                                <h5>( ₱ <span>200</span> )</h5>
                                <Button variant="contained" endIcon={<EventAvailableIcon />} onClick={()=>joinEvent()}>Join</Button>
                            </div>
                        )
                        }
                    </div>
                </div>
                <div id="Holder_Title_Event">
                    <h5 id="Date_Event">{event.date ? (new Date(event.date.start)).toDateString() + " " + (new Date(event.date.start)).toTimeString() : '...'}</h5>
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
                            <div id="Hosts_Wrapper" className="Wrapper__Card">             
                                <Card title="Dianne Chrystalin Brandez" role="Host"/>
                                <Card title="Dianne Chrystalin Brandez" role="Host"/>
                            </div>
                        </div>
                        <div>
                            <div id="Participants" class="Container_Analytics Container_EventDetails">
                                <h4>Participants</h4>
                                <div id="Participants_Div">
                                    <div id="Participants_Texts">
                                        <h1>{participants.length}</h1>
                                        <h3>Going</h3>
                                    </div>
                                    <div>
                                        <Button id="Button" variant="outlined" endIcon={<PersonAddIcon/>}>Invite</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="Wrapper_Right_Event_Details">
                    {(EventCeritifcate)?
                        <>
                            <div className="Container_EventDetails" id="Holder_Certificate_Event_Details">
                                <h4>Certificate</h4>
                                <CertificateStatusChecker/>
                            </div>
                        </>
                        :
                        <>
                        </>
                    }
        
                    <div className="Container_EventDetails" id="Container_Multiple">
                        <div>
                            <h4>Event Type</h4>
                            <p>{event.type}</p>
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
        </div>
    )
}

export default EventView