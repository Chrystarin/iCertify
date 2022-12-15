import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

// import TextField from '@mui/material/TextField';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import EventCard from './../../Components/Events/EventCard';

import '../../Assets/Styles/Page/style-EventCreate.scss'

import Navigation from '../../Layouts/DashboardAdminNavigation/DashboardNavigationAdmin';
import HeaderNavigation from '../../Layouts/Dashboard/HeaderNavigation';

import Input from '../../Components/Small Compontents/TextInput';
import TabBtn from '../../Components/Small Compontents/Button.js';

export default function EventCreate() {
    const url = "http://localhost:6787/events/create"
    const navigate = useNavigate();
    
    let [openPanel,setopenPanel] = useState(1);

    const [form, setForm] = useState({
        eventId: '',
        type: '',
        title: '',
        description: '',
        link: '',
        location: '',
        date:{
            start: '',
            end: ''
        },
        canClaimDocument: '',
        status: '',
        isAcceptingVolunteer: '',
        tags: ''
    });

    // These methods will update the state properties.
    function updateForm(e) {
        return setForm((prev) => {
            const [key, value] = Object.entries(e)[0];

            // Identify if toChange is date
            if(key == 'date') {
                const [dateType, date] = Object.entries(value)[0];

                prev[key][dateType] = date;
            } else {
                prev[key] = value;
            }

            console.log(prev);
            console.log(form);
            return prev;
            
    });}

     // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();
    
        form.date.start = Number(form.date.start);
        form.date.end = Number(form.date.end);
        form.canClaimDocument = form.canClaimDocument == 'true' ? true : false;
        form.isAcceptingVolunteer = form.isAcceptingVolunteer == 'true' ? true : false;
        form.tags = form.tags ? [] : [form.tags];

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newEvent = { ...form };
    
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEvent),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            navigate(`/events/${data.eventId}`);
            console.log("Submitted")
        })
        .catch(error => {
            window.alert(error);
            console.log("Error:" + error);
            return;
        });
        
    }

    return (

        <div id='DashboardHolder'>
        <div id="Navigation">
        <Navigation />
        </div>
        <div id="Holder_Content">
        <HeaderNavigation/>
        <div id="Content">
            <section id='Create_Event'>
                <div id='Container_Navigatoin_Creat_Event' >
                    <div  onClick={()=>setopenPanel(1)}>
                        <TabBtn Action="ButtonTab_Number" Type="Active_ButtonTab_Number" Number="1" Value="Event Details" Status={(openPanel===1)?"Active":"Inactive"}/>
                    </div>
                    <div onClick={()=>setopenPanel(2)}>
                        <TabBtn Action="ButtonTab_Number" Type="Active_ButtonTab_Number" Number="2" Value="Set Participants" Status={(openPanel===2)?"Active":"Inactive"}/>
                    </div>
                    <div onClick={()=>setopenPanel(3)}>
                        <TabBtn Action="ButtonTab_Number" Type="Active_ButtonTab_Number" Number="3" Value="Payment" Status={(openPanel===3)?"Active":"Inactive"}/>
                    </div>
                </div>
                <div id='Container_Form_Create_Event'>
                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div id='Form1' className={(openPanel===1)? "Container_Form ActiveForm":"Container_Form InactiveForm"}>
                            <div className="Wrapper_Form_Create">
                                <div className="Wrapper_Title_Form">
                                    <h3>Event Details</h3>
                                    <p>Necessary Information for new event.</p>
                                </div>
                                <div className='Wrapper_Inputs_Form'>
                                    <Input Title="Event Type" Holder="Dianne" Action={(e)=>updateForm({ type: e.target.value })}/>
                                </div>
                                <div className="Wrapper_Title_Form">
                                    <h3>Basic Details</h3>
                                    <p>Necessary Information for new event.</p>
                                </div>
                                <div className='Wrapper_Inputs_Form'>
                                    <Input Title="Event Name" Holder="Blockchain Technology 101" Action={(e)=>updateForm({ title: e.target.value })}/>
                                    <Input Title="Event Description" Holder="Adding information about the evenT" Action={(e)=>updateForm({ description: e.target.value })}/>
                                    <Input Title="Link" Holder="www.test.com" Action={(e)=>updateForm({ link: e.target.value })}/>
                                    <Input Title="Location" Holder="Marikina" Action={(e)=>updateForm({ location: e.target.value })}/>
                                    <Input Title="Can Claim Document" Holder="www.test.com" Action={(e)=>updateForm({ canClaimDocument: e.target.value })}/>
                                    <Input Title="Status" Holder="www.test.com" Action={(e)=>updateForm({ status: e.target.value })}/>
                                    <Input Title="Accepting Volunteers" Holder="true" Action={(e)=>updateForm({ isAcceptingVolunteer: e.target.value })}/>
                                    
                                    <div className='Wrapper_3_Inputs'>
                                        <Input Title="Start Date & Time" Holder="10/3/2020 @ 4:10 PM" Action={(e)=>updateForm({ date:{start: e.target.value}})}/>
                                        <Input Title="End Date & Time" Holder="10/3/2020 @ 4:10 PM" Action={(e)=>updateForm({ date:{end: e.target.value}})}/>
                                        <Input Title="Search Tags" Holder="#Sample1, #Sample2,"/>
                                    </div>
                                    
                                    <div className='Wrapper_2_Inputs'>
                                        <Input Title="Email(Optional)" Holder="YourEmail@mail.com"/>
                                        <Input Title="Email(Optional)" Holder="YourEmail@mail.com"/>
                                    </div>
                                </div>
                            </div>
                            <div className='Wrapper_Button_Create'>
                                <div>
                                    <TabBtn Action="Function" BtnType="Primary2" Value="Save as Default"/>
                                </div>
                                <div onClick={()=>setopenPanel(2)}>
                                    <TabBtn onClick={()=>alert("")} Action="Function" BtnType="Primary" Value="Next"/>
                                </div>
                            </div>
                        </div>
                        <div className={(openPanel===2)? "Container_Form ActiveForm":"Container_Form InactiveForm"}>
                        <div className="Wrapper_Form_Create">
                                <div className="Wrapper_Title_Form">
                                    <h3>Participants</h3>
                                    <p>Assign participants</p>
                                </div>
                                <div className='Wrapper_Inputs_Form'>
                                    <Input Title="Event Type" Holder="Dianne"/>
                                </div>
                                
                            </div>
                            <div className='Wrapper_Button_Create'>
                                <div>
                                    <TabBtn Action="Function" BtnType="Primary2" Value="Save as Default"/>
                                </div>
                                <div onClick={()=>setopenPanel(3)}>
                                    <TabBtn onClick={()=>alert("")} Action="Function" BtnType="Primary" Value="Next"/>
                                </div>
                            </div>      
                        </div>
                        <div className={(openPanel===3)? "Container_Form ActiveForm":"Container_Form InactiveForm"}>
                            <TabBtn type="submit" variant="contained" onClick={(e)=>onSubmit(e)} BtnType="Primary" Value="Create"/>   
                        </div>
                    </form>
                </div>
            </section>
        </div>
        </div>
    </div>
    )
}
