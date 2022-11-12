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
    const [form, setForm] = useState({
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

    const navigate = useNavigate();
 
    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
    });

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
        navigate("/");
    }

    }
    return (
        <div>
            <form>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
                <Stack spacing={3}>
                    <TextField 
                        label="Title" 
                        variant="standard" 
                        value={form.title}
                        onChange={(e)=>updateForm({ title: e.target.value })}
                    />
                    
                    <TextField 
                        label="Description" 
                        variant="standard" 
                        value={form.description}
                        onChange={(e)=>updateForm({ description: e.target.value })}
                    />

                    <TextField 
                        label="Type" 
                        variant="standard" 
                        value={form.type}
                        onChange={(e)=>updateForm({ type: e.target.value })}
                    />

                    <TextField 
                        label="Link" 
                        variant="standard" 
                        value={form.link}
                        onChange={(e)=>updateForm({ link: e.target.value })}
                    />

                    <TextField 
                        label="Location" 
                        variant="standard" 
                        value={form.location}
                        onChange={(e)=>updateForm({ location: e.target.value })}
                    />

                    <TextField 
                        label="Date Start" 
                        variant="standard" 
                        value={form.date.start}
                        onChange={(e)=>updateForm({ date:{start:  e.target.value}})}
                    />

                    <TextField 
                        label="Date End" 
                        variant="standard" 
                        value={form.date.end}
                        onChange={(e)=>updateForm({ date:{end:  e.target.value}})}
                    />

                    <TextField 
                        label="Can Claim Document" 
                        variant="standard" 
                        value={form.canClaimDocument}
                        onChange={(e)=>updateForm({ canClaimDocument: e.target.value })}
                    />

                    <TextField 
                        label="Status" 
                        variant="standard" 
                        value={form.status}
                        onChange={(e)=>updateForm({ status: e.target.value })}
                    />

                    <TextField  
                        label="Accepting Volunteer" 
                        variant="standard" 
                        value={form.isAcceptingVolunteer}
                        onChange={(e)=>updateForm({ isAcceptingVolunteer: e.target.value })}
                    />

                    <TextField  
                        label="Tags" 
                        variant="standard" 
                        value={form.tags}
                        onChange={(e)=>updateForm({ tags: e.target.value })}
                    />

                    <Button type="submit" variant="contained">Contained</Button>

                    {/* <DateTimePicker
                        label="Start"
                        value={form.date.start}
                        onChange={(e)=>updateForm({ date:{start:  e.target.value}})}
                        renderInput={(params) => <TextField {...params} />}
                    /> */}

                </Stack>
            {/* </LocalizationProvider> */}
                
            </form>

        </div>
    )
}
