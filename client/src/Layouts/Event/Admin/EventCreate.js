import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import '../../../Assets/Styles/Page/style-EventCreate.scss'

// Stepper
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

// Utilities
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import TextFieldTry from '../../../Components/TextField'

// Dropdown
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

import ParticipantsList from "./ParticipantsList";

// Search Input
import SearchInput from '../../../Components/SearchInput'
import InputAdornment from '@mui/material/InputAdornment';
//datePicker
import DateTime_Picker from '../../../Components/DateTime_Picker';

// Tags
import Tags from '../../../Components/Tags.js';

// Switch
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch'
import dayjs from 'dayjs';
export default function EventCreate() {

    
    // End
    // +================================================================================
    //                      GET VALUES FROM EVENT DETAILS INPUT FORM
    //All the values initialize
    const [EventTypeVal, setEventTypeVal] = useState('');
    const [LinkAdressVal, setLinkAdressVal] = useState('');
    const [EventNameVal, setEventNameVal] = useState('');
    const [EventDescriptionVal, setEventDescriptionVal] = useState('');
    const [startDateTimeVal, setstartDateTimeVal] = useState(dayjs('2014-08-18T21:11:54'));
    const [endDateTimeVal, setendDateTimeVal] = useState(dayjs('2014-08-18T21:11:54'));
    let TagsVal = [];
    const [CertificateVal, setCertificateVal] = useState(false);
    const [EmailVal, setEmailVal] = useState('');
    
    // Setting up the values 
    const EventTypehandleChangeEvent = (event) => {
        setEventTypeVal(event.target.value);
    };

    function TagsValHandleChange(option, index){
        TagsVal = index;
    }
    const PredefinedTags = [ "Computer","Technology", "Blockchain", "Entertainment","UserInterface","UserExperience"];

    function CertificateValHandleChange(){
        setCertificateVal(!CertificateVal);
    }

    // +================================================================================
    //                      GET VALUES FROM SET PARTICIPANTS INPUT FORM

    const [AcceptVlunteerVal, setAcceptVlunteerVal] = useState(false)

    function AcceptVlunteerValHandleChange(){
        setAcceptVlunteerVal(!AcceptVlunteerVal);
    };

    const [EventMembersAccessibility, setEventMembersAccessibility] = React.useState('');
    
    const EventMembersAccessibilityhandleChangeEvent = (event) => {
        setEventMembersAccessibility(event.target.value);
    };

    // +================================================================================

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
    function EventTypeChecker(props){
        switch(props.EventType) {
            case 'Online':
                return <TextField id="outlined-search" label="link" type="text" required onChange={()=>setLinkAdressVal(LinkAdressVal)}/>

            case 'Onsite':
                return <TextField id="outlined-search" label="Address" type="text" required  onChange={()=>setLinkAdressVal(LinkAdressVal)}/>
            default:
                return 
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
                                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={EventTypeVal} label="Event Type" onChange={EventTypehandleChangeEvent}>
                                        <MenuItem value={"Online"}>Online</MenuItem>
                                        <MenuItem value={"Onsite"}>Onsite</MenuItem>
                                    </Select>
                                    <FormHelperText>Select event type</FormHelperText>
                                </FormControl>
                                <EventTypeChecker EventType={EventTypeVal}/>
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
                                <DateTime_Picker Label="Start Date & Time" Value={startDateTimeVal} SetValue={setstartDateTimeVal}/>
                                <DateTime_Picker Label="Start Date & Time" Value={endDateTimeVal} SetValue={setendDateTimeVal}/>
                                <Tags PredefinedTags={PredefinedTags} HandleChange={TagsValHandleChange}/>
                            </div>
                            <div className="Wrapper_2_Inputs">
                                <TextField id="outlined-search" label="Email" type="email" />
                                <TextField id="outlined-search" label="Contact Number" type="tel"/>
                            </div>
                            <div >
                                <FormControlLabel
                                    control={
                                    <Switch checked={CertificateVal} onChange={CertificateValHandleChange} name="Certificate" />
                                    }
                                    label= {<h5>Certificate</h5>}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </>
            break;
        case 1:
            return<>
                <form action="#">
                    <div className="Subject_Seperator">
                        <div className="holder_Subject">
                            <h3>Participants Accessibility</h3>
                            <p>Adjust participants accessibility</p>
                        </div>
                        <div className="holder_Questions">
                            <FormControlLabel
                                control={
                                <Switch checked={AcceptVlunteerVal} onChange={AcceptVlunteerValHandleChange} name="Certificate" />
                                }
                                label= {<h5>Accept Volunteer Request</h5>}
                            />
                            <div className="Wrapper_2_Inputs">
                                <FormControl fullWidth required  helperText="Select Event">
                                    <InputLabel id="demo-simple-select-label" required>Available only on</InputLabel>
                                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={EventMembersAccessibility} label="Available only on" onChange={EventMembersAccessibilityhandleChangeEvent}>
                                        <MenuItem value={"All"}>All</MenuItem>
                                        <MenuItem value={"Accountants"}>Accountants</MenuItem>
                                        <MenuItem value={"Membership"}>Members with premium membership</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                    <div className="Subject_Seperator">
                        <div className="holder_Subject">
                            <h3>Set Participants</h3>
                            <p>Assign roles to any participants</p>
                        </div>
                        <div className="holder_Questions">
                            <div className="Wrapper_2_Inputs">
                                <SearchInput/>
                            </div>
                            <div className="Wrapper_2_Inputs">
                                <ParticipantsList/>
                            </div>
                        </div>
                    </div>
                    
                </form>
            </> 

            break;
        case 2:
            return <>
                <form action="#">
                    <div className="Subject_Seperator">
                        <div className="holder_Subject">
                            <h3>Price & Discount</h3>
                            <p>Assign the entrance fee for the event</p>
                        </div>
                        <div className="holder_Questions">
                            <div className="Wrapper_2_Inputs">
                                <TextField
                                    label="With normal TextField"
                                    id="outlined-start-adornment"
                                    type="Number"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₱</InputAdornment>,
                                    }}
                                />
                                <TextField
                                    label="Premium Membership Discount"
                                    id="outlined-start-adornment"
                                    type="Number"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    
                </form>
            </>
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

            <div id="Holder_Button">
                <Button variant="outlined" onClick={backStep}>Back</Button>
                <Button variant="contained" onClick={nextStep}>Next</Button>
            </div>
        </section>
    )
}
