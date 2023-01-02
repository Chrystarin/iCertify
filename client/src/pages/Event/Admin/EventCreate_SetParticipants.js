import React,{useState} from 'react';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SearchInput from '../../../components/SearchInput/SearchInput.js'
import ParticipantsList from "./../../../layouts/Event/Admin/EventParticipantsList";
import Button from '@mui/material/Button'

function EventCreate_SetParticipants({StepValue,SetStepValue}) {

    const [AcceptVlunteerVal, setAcceptVlunteerVal] = useState(false)

    function AcceptVlunteerValHandleChange(){
        setAcceptVlunteerVal(!AcceptVlunteerVal);
    };

    const [EventMembersAccessibility, setEventMembersAccessibility] = React.useState('');
    
    const EventMembersAccessibilityhandleChangeEvent = (event) => {
        setEventMembersAccessibility(event.target.value);
    };


    // Button Next
    function nextStep(){
        if(StepValue !== 2){
        SetStepValue(StepValue+1);
        }
    }
    function backStep(){
        if(StepValue !== 0){
            SetStepValue(StepValue-1);
        }
    }

    return (
        <div>
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
                <div id="Holder_Button">
                    <Button variant="text">Save as draft</Button>
                    <Button variant="outlined" onClick={backStep}>Back</Button>
                    <Button variant="contained" onClick={nextStep}>Next</Button>
                </div>
            </form>
        </div>
    )
}

export default EventCreate_SetParticipants