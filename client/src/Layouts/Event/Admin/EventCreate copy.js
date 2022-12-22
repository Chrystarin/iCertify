import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import '../../../Assets/Styles/Page/style-EventCreate.scss'

import TabBtn from '../../../Components/Button.js';
import TextField from '@mui/material/TextField';

// Dropdown
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';


//datePicker

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
export default function EventCreate() {

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
                return <TextField id="outlined-search" label="link" type="text" required/>
            default:
                return 
        }
    }
    // End


        
    // Tags
    const [Tags, setTags] = useState();
    const PredefinedTags = [ "Computer","Technology", "Blockchain", "Entertainment","UserInterface","UserExperience"];

    // +================================================================================


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
            
            console.log("Error:" + error);
            return;
        });
    }
    
    




    return (
        
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
                            <div className="Wrapper_Title_Form">
                                <h3>Basic Details</h3>
                                <p>Necessary Information for new event.</p>
                            </div>
                            <div className='Wrapper_Inputs_Form'>

                                <TextField id="outlined-search" label="Event Name" type="text" required  />
                                <TextField id="outlined-search" label="Event Description" type="text" required multiline/>
                                <div className='Wrapper_3_Inputs'>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                        label="Start Date & Time"
                                        value={StartDateTime}
                                        onChange={handleChangeStartDateTime}
                                        renderInput={(params) => <TextField required {...params} />}
                                        />
                                    </LocalizationProvider>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker
                                        label="End Date & Time"
                                        value={EndDateTime}
                                        onChange={handleChangeEndDateTime}
                                        renderInput={(params) => <TextField required {...params} />}
                                        />
                                    </LocalizationProvider>
                                    <Autocomplete
                                        multiple
                                        id="tags-outlined"
                                        options={PredefinedTags.map((option) => option)}
                                        defaultValue={[PredefinedTags[1]]}
                                        freeSolo
                                        renderTags={(value, getTagProps) =>
                                        value.map((option, index) => (
                                            // Inputs
                                            <Chip variant="filled" label={option} {...getTagProps({ index })} />
                                        ))
                                        }
                                        onChange={(option, index) => setTags(index)}
                                        renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Event Tags"
                                            placeholder="Tags"
                                            
                                        />
                                        )}
                                    />
                                </div>
                                <div className='Wrapper_2_Inputs'>
                                    <TextField id="outlined-search" label="Email" type="email"/>
                                    <TextField id="outlined-search" label="Contact Number" type="tel"   />
                                </div>
                                
                            </div>
                        </div>
                        <div className='Wrapper_Button_Create'>
                            <div>
                                <TabBtn Action="Function" BtnType="Primary2" Value="Save as Default"/>
                            </div>
                            <div onClick={()=>setopenPanel(2)}>
                                <TabBtn Action="Function" BtnType="Primary" Value="Next"/>
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
                                {/* <Input Title="Event Type" Holder="Dianne"/> */}
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
                    </div>
                </form>
            </div>
        </section>
    )
}
