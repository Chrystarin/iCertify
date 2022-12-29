import React,{useEffect, useState} from 'react';
import { useParams } from "react-router-dom";

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const MemberEdit = (props) => {
    const { id } = useParams()
    const [member, setMember] = useState(null)

    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        occupation: '',
        email: '',
        password: ''
    });

    useEffect(()=>{
        const fetchMember = async () => {
            const response  = await fetch(`http://localhost:6787/members/${id}`)

            const json = await response.json()

            if(response.ok){
                setMember(json);
                console.log(json);
                console.log(member);
                console.log(json.name.firstName || '');
                console.log("success");
            }
            else{
                console.log("error");
            }
        }

        fetchMember()
        
        // console.log(`${id}`);
    }, [])

    

    function updateForm(e) {
        return setUserInfo((prev) => {
            const [key, value] = Object.entries(e)[0];
            prev[key] = value;

            console.log(prev);
            console.log(userInfo);
            return prev;
        
    });}

    if(!member) return <div>loading...</div>

    return (
        <div>
            <TextField 
                id="outlined-search" 
                label="Firstname" 
                type="text" 
                fullWidth
                required 
                
                onChange={(e)=>updateForm({ firstName: e.target.value })}
            />
            <TextField 
                id="outlined-search" 
                label="Lastname" 
                type="text" 
                fullWidth
                required 
                onChange={(e)=>updateForm({ lastName: e.target.value })}
            />
            <FormControl fullWidth required>
                <InputLabel id="demo-simple-select-label">Occupation</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Occupation"
                    onChange={(e)=>updateForm({ occupation: e.target.value })}
                >
                    <MenuItem value={"Student"}>Student</MenuItem>
                    <MenuItem value={"Professional"}>Professional</MenuItem>
                    <MenuItem value={"None"}>None</MenuItem>
                </Select>
            </FormControl>
            <TextField 
                id="outlined-search" 
                label="Email" 
                type="email" 
                fullWidth
                required 
                onChange={(e)=>updateForm({ email: e.target.value })}
            />
            <TextField 
                id="outlined-search" 
                label="Password" 
                type="Password" 
                fullWidth
                required 
                onChange={(e)=>updateForm({ password: e.target.value })}
            />

            <Button variant="contained">Contained</Button>
        </div>

    )
}

export default MemberEdit