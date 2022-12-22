import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import '../../../Assets/Styles/Page/style-EventCreate.scss'

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';

// Dropdown
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';


//datePicker
import DatePicker from '../../../Components/DateTime_Picker';


import Tags from '../../../Components/Tags.js'

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


    // Event type
     
    const [EventType, setEventType] = React.useState('');
    const handleChangeEvent = (event) => {
      setEventType(event.target.value);
    };
    
    function EventTypeChecker(props){
        switch(props.EventType) {
            case 'Online':
                return <TextField id="outlined-search" label="link" type="text" required/>

            case 'Onsite':
                return <TextField id="outlined-search" label="Address" type="text" required/>
            default:
                return 
        }
    }
    // End

    
    const PredefinedTags = [ "Computer","Technology", "Blockchain", "Entertainment","UserInterface","UserExperience"];

    // +================================================================================


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
            
            console.log("Error:" + error);
            return;
        });
    }
    
    

    function VIEWFORM(){
       switch (activeStep) {
        case 0:
            return <>
                <form action="#">
                    <div className="Subject_Seperator">
                        <div className="holder_Subject">
                            <h3>Event Type</h3>
                            <p>Necessary Information for new event.</p>
                        </div>
                        <div className="holder_Questions">
                            <div className="Wrapper_2_Inputs">
                                <FormControl fullWidth required  helperText="Select Event">
                                    <InputLabel id="demo-simple-select-label" required>Event Type</InputLabel>
                                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={EventType} label="Event Type" onChange={handleChangeEvent}>
                                        <MenuItem value={"Online"}>Online</MenuItem>
                                        <MenuItem value={"Onsite"}>Onsite</MenuItem>
                                    </Select>
                                    <FormHelperText>Select event type</FormHelperText>
                                </FormControl>
                                <EventTypeChecker EventType={EventType}/>
                            </div>
                        </div>
                    </div>
                    <div className="Subject_Seperator">
                        <div className="holder_Subject">
                            <h3>Basic Details</h3>
                            <p>Necessary Information for new event.</p>
                        </div>
                        <div className="holder_Questions">
                            <TextField id="outlined-search" label="Event Name" type="text" required />
                            <TextField id="outlined-search" label="Event Description" type="text" required multiline/>
                            <div className='Wrapper_2_1_Inputs'>   
                                <DatePicker Label="Start Date & Time"/>    
                                <DatePicker Label="End Date & Time"/>  
                                <Tags PredefinedTags={PredefinedTags} />
                            </div>
                            <div className="Wrapper_2_Inputs">
                                <TextField id="outlined-search" label="Email" type="email"/>
                                <TextField id="outlined-search" label="Contact Number" type="tel"/>
                            </div>
                        </div>
                    </div>
                </form>
            </>
            break;
        case 1:
            return <h1>Hello</h1>
            break;
        case 2:
            return <h1>Hello</h1>
            break;
       
        default:
            break;
       }
    }


    return (
        
        <section id='Create_Event'>
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

            <VIEWFORM />

            <div id="Holder_Button">
                <Button variant="outlined" onClick={backStep}>Back</Button>
                <Button variant="contained" onClick={nextStep}>Next</Button>
            </div>
        </section>
    )
}
