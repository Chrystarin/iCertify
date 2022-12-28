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
