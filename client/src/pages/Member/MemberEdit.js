import React,{useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';

import axios from '../../config/axios';

const MemberEdit = (props) => {
    const navigate = useNavigate();
    const { id } = useParams()
    const [member, setMember] = useState(null)

    // Executes on load
    useEffect(() => {
        // Retrieves Member Data
        const fetchMember = async () => {
            const response = await axios.get(`members/${id}`)
            .then((response)=>{
                setMember(response.data)
            })
        }
        
        fetchMember();
    }, [])

    // Updates form from input
    function updateForm(e) {
        return setMember((prev) => {
            const [key, value] = Object.entries(e)[0];
            if(key == 'name' || key == 'contact' || key == 'location') {
                const [type, subValue] = Object.entries(value)[0];
                prev[key][type] = subValue;
            } else {
                prev[key] = value;
            }
            return prev;
    });}

    // Submits Data
    async function Submit(e) {
        e.preventDefault();
        await axios.patch(`members/${id}`, JSON.stringify({...member}), {
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => {
            console.log(response.data);
            navigate(`/member/${id}`);
        })
        .catch(error => {
            console.log("Error:" + error);
            return;
        });
    }

    // Returns if member is null
    if(!member) return <div>loading...</div>

    return (
        <div>
            <h3>Edit Profile</h3>{member.walletAddress}<br/><br/>
            <TextField 
                id="outlined-search" 
                label="Firstname" 
                type="text" 
                fullWidth
                required
                defaultValue={member.name.firstName}
                onChange={(e)=>updateForm({  name: {firstName: e.target.value} })}
            />
            <TextField 
                id="outlined-search" 
                label="Middle Name" 
                type="text" 
                fullWidth
                required 
                defaultValue={member.name.middleName}
                onChange={(e)=>updateForm({  name: {middleName: e.target.value} })}
            />
            <TextField 
                id="outlined-search" 
                label="Lastname" 
                type="text" 
                fullWidth
                required 
                defaultValue={member.name.lastName}
                onChange={(e)=>updateForm({  name: {lastName: e.target.value} })}
            />
            <TextField 
                id="outlined-search" 
                label="Extension" 
                type="text" 
                fullWidth
                required 
                defaultValue={member.name.extension}
                onChange={(e)=>updateForm({  name: {extension: e.target.value} })}
            />
            <TextField 
                id="outlined-search" 
                label="About" 
                type="text" 
                fullWidth
                required 
                defaultValue={member.about}
                onChange={(e)=>updateForm({  about: e.target.value })}
            />
            <TextField 
                id="outlined-search" 
                label="occupation" 
                type="text" 
                fullWidth
                required 
                defaultValue={member.occupation}
                onChange={(e)=>updateForm({  occupation: e.target.value })}
            />
            <TextField 
                id="outlined-search" 
                label="mobile" 
                type="text" 
                fullWidth
                required 
                defaultValue={member.contact.mobile}
                onChange={(e)=>updateForm({   contact: {mobile: e.target.value} })}
            />
            <TextField 
                id="outlined-search" 
                label="telephone" 
                type="text" 
                fullWidth
                required 
                defaultValue={member.contact.telephone}
                onChange={(e)=>updateForm({   contact: {telephone: e.target.value} })}
            />
            <TextField 
                id="outlined-search" 
                label="barangay" 
                type="text" 
                fullWidth
                required 
                defaultValue={member.location.barangay}
                onChange={(e)=>updateForm({  location: {barangay: e.target.value} })}
            />
            <TextField 
                id="outlined-search" 
                label="city" 
                type="text" 
                fullWidth
                required 
                defaultValue={member.location.city}
                onChange={(e)=>updateForm({  location: {city: e.target.value} })}
            />
            <TextField 
                id="outlined-search" 
                label="province" 
                type="text" 
                fullWidth
                required 
                defaultValue={member.location.province}
                onChange={(e)=>updateForm({  location: {province: e.target.value} })}
            />
            <TextField  
                id="outlined-search" 
                label="country" 
                type="text" 
                fullWidth
                required 
                defaultValue={member.location.country}
                onChange={(e)=>updateForm({  location: {country: e.target.value} })}
            />
            <Button variant="contained" onClick={() => console.log(member)}>Check Member Data</Button>
            <Button variant="contained" onClick={() => console.log(JSON.stringify(member))}>Check Member JSON Data</Button>
            <Button variant="contained" onClick={(e) => Submit(e)}>Submit</Button>
        </div>
    )
}

export default MemberEdit