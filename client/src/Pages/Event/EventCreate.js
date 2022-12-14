import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import EventCard from './../../Components/Events/EventCard';

// import dayjs, { Dayjs } from 'dayjs';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function EventCreate() {
    const url = "http://localhost:5000/api/events/create"
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');

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

    const navigate = useNavigate();
 
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
    
        // When a post request is sent to the create url, we'll add a new record to the database.
        const newEvent = { ...form };
    
        await fetch("http://localhost:5000/api/events/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
        })
        .catch(error => {
            window.alert(error);
            return;
        });

        setForm({ 
            eventId: "",
            type: "",
            title: "",
            description: "",
            link: "",
            location: "",
            date:{
                start: "",
                end: ""
            },
            canClaimDocument: "",
            status: "",
            isAcceptingVolunteer: "",
            tags: "" 
        });
        // navigate("/");
        console.log("Submitted")
    }

    return (
        <div>
            {/* <form onSubmit={(e)=>onSubmit(e)}> */}
            <form>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
                <Stack spacing={3}>
                    <TextField 
                        label="Title" 
                        variant="standard" 
                        onInput={(e)=>updateForm({ title: e.target.value })}
                    />
                    
                    <TextField 
                        label="Description" 
                        variant="standard" 
                        onInput={(e)=>updateForm({ description: e.target.value })}
                    />

                    <TextField 
                        label="Type" 
                        variant="standard" 
                        onInput={(e)=>updateForm({ type: e.target.value })}
                    />

                    <TextField 
                        label="Link" 
                        variant="standard" 
                        onInput={(e)=>updateForm({ link: e.target.value })}
                    />

                    <TextField 
                        label="Location" 
                        variant="standard" 
                        onInput={(e)=>updateForm({ location: e.target.value })}
                    />

                    <TextField 
                        label="Date Start" 
                        variant="standard" 
                        onInput={(e)=>updateForm({ date:{start: e.target.value}})}
                    />

                    <TextField 
                        label="Date End" 
                        variant="standard" 
                        onInput={(e)=>updateForm({ date:{end: e.target.value}})}
                    />

                    {/* <TextField 
                        label="Date Start" 
                        variant="standard" 
                        value={dateStart}
                        onChange={(e)=>setDateStart(e.target.value)}
                    />

                    <TextField 
                        label="Date End" 
                        variant="standard" 
                        value={dateEnd}
                        onChange={(e)=>setDateEnd(e.target.value)}
                    /> */}

                    <TextField 
                        label="Can Claim Document" 
                        variant="standard" 
                        onInput={(e)=>updateForm({ canClaimDocument: e.target.value })}
                    />

                    <TextField 
                        label="Status" 
                        variant="standard" 
                        onInput={(e)=>updateForm({ status: e.target.value })}
                    />

                    <TextField  
                        label="Accepting Volunteer" 
                        variant="standard" 
                        onInput={(e)=>updateForm({ isAcceptingVolunteer: e.target.value })}
                    />

                    <TextField  
                        label="Tags" 
                        variant="standard" 
                        onInput={(e)=>updateForm({ tags: e.target.value })}
                    />

                    {/* <Button type="submit" variant="contained" onClick={testSubmit}>Contained</Button> */}

                    {/* <DateTimePicker
                        label="Start"
                        value={form.date.start}
                        onChange={(e)=>updateForm({ date:{start:  e.target.value}})}
                        renderInput={(params) => <TextField {...params} />}
                    /> */}

                </Stack>
            {/* </LocalizationProvider> */}
                
            </form>
            <Button type="submit" variant="contained" onClick={(e)=>onSubmit(e)}>Submit</Button>
        </div>
    )
}
