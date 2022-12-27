import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import '../../../Assets/Styles/Page/style-EventCreate.scss'

// Stepper
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


// Forms
import EventDetailsForm from '../../../Layouts/Event/Admin/EventCreate_EventDetails';
import EventSetParticipantsForm from '../../../Layouts/Event/Admin/EventCreate_SetParticipants';
import EventPaymentForm from '../../../Layouts/Event/Admin/EventCreate_Payement';


export default function EventCreate() {

    // Stepper
    const [activeStep,setActiveStep] = useState(0);
    function nextStep(){
        if(activeStep !== 2){
            setActiveStep(activeStep+1);
        }
    }
    function backStep(){
        if(activeStep !== 0){
            setActiveStep(activeStep-1);
        }
    }
   

    const url = "http://localhost:6787/events/create"
    const navigate = useNavigate();
    
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

    // These methods wileeel update the state properties.
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
            
            console.log("Error:" + error);
            return;
        });
    }
    
    

    function VIEWFORM(){
       switch (activeStep) {
        case 0:
            return <EventDetailsForm   StepValue={activeStep} SetStepValue={setActiveStep}/>
            break;
        case 1:
            return <EventSetParticipantsForm StepValue={activeStep} SetStepValue={setActiveStep}/>
            break;
        case 2:
            return <EventPaymentForm StepValue={activeStep} SetStepValue={setActiveStep}/>
            break;
        default:
            break;
       }
    }


    return (
        
        <section id='Create_Event'>
            <div id="Stepper">
                <div id="Holder_Stepper">
                    <Stepper activeStep={activeStep}>
                        <Step>
                            <StepLabel>Event Details</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Set Participants</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Payment</StepLabel>
                        </Step>
                    </Stepper>
                </div>
            </div>
            <VIEWFORM />
        </section>
    )
}
