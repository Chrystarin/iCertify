import React,{useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";

import './ProfileUpdate.scss'
import './../../styles/Form.scss'

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Button from '@mui/material/Button';


import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';

import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PhoneIcon from '@mui/icons-material/Phone';
import IconButton from '@mui/material/IconButton';

import axios from '../../config/axios';

function ProfileUpdate() {
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

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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

    function VIEWFORM(){
        switch (activeStep) {
            case 0:
                return <>
                    <form>
                        <div className="Subject_Seperator">
                            <div className="holder_Subject">
                                <h3>User Details</h3>
                                <p>Basic details of the user</p>
                            </div>
                            <div className="holder_Questions">
                                <div className='Wrapper_Name_Inputs'>
                                    <TextField 
                                        id="outlined-search" 
                                        label="First Name" 
                                        type="text" 
                                        required 
                                        defaultValue={member.name.firstName}
                                        onChange={(e)=>updateForm({  name: {firstName: e.target.value} })}
                                    />
                                    <TextField 
                                        id="outlined-search" 
                                        label="Middle Name" 
                                        type="text" 
                                        required 
                                        defaultValue={member.name.middleName}
                                        onChange={(e)=>updateForm({  name: {middleName: e.target.value} })}
                                    />
                                    <TextField 
                                        id="outlined-search" 
                                        label="Last Name" 
                                        type="text" 
                                        required 
                                        defaultValue={member.name.lastName}
                                        onChange={(e)=>updateForm({  name: {lastName: e.target.value} })}
                                    />
                                    <TextField 
                                        id="outlined-search" 
                                        label="Extension" 
                                        type="text" 
                                        required 
                                        defaultValue={member.name.extension}
                                        onChange={(e)=>updateForm({  name: {extension: e.target.value} })}
                                    />
                                    
                                    
                                </div>
                                <TextField 
                                    id="outlined-search" 
                                    label="Event Description" 
                                    type="text" 
                                    required 
                                    multiline
                                    defaultValue={member.about}
                                    onChange={(e)=>updateForm({  about: e.target.value })}
                                />
                                <div className='Wrapper_1_2_Inputs'>
                                    <FormControl fullWidth required  helpertext="Select Event">
                                        <InputLabel id="demo-simple-select-label" required>Occupation</InputLabel>
                                        <Select labelId="demo-simple-select-label" id="demo-simple-select"label="Event Type"
                                            defaultValue={member.occupation}
                                            onChange={(e)=>updateForm({  occupation: e.target.value })}
                                        >
                                        <MenuItem value={"None"}>None</MenuItem>
                                            <MenuItem value={"Student"}>Student</MenuItem>
                                            <MenuItem value={"Professional"}>Professional</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField 
                                        id="outlined-search" 
                                        label="Telephone" 
                                        type="tel" 
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"><PhoneIcon/></InputAdornment>,
                                        }}
                                        defaultValue={member.contact.telephone}
                                        onChange={(e)=>updateForm({  contact: {telephone: e.target.value} })}
                                    />
                                    <TextField 
                                        id="outlined-search" 
                                        label="Mobile" 
                                        type="tel" 
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"><PhoneIphoneIcon/></InputAdornment>,
                                        }}
                                        defaultValue={member.contact.mobile}
                                        onChange={(e)=>updateForm({  contact: {mobile: e.target.value} })}
                                    />
                                </div>
                                <div className='Wrapper_4_Inputs'>
                                    <TextField 
                                        id="outlined-search" 
                                        label="Barangay" 
                                        type="text" 
                                        required 
                                        defaultValue={member.location.barangay}
                                        onChange={(e)=>updateForm({  location: {barangay: e.target.value} })}
                                    />
                                    <TextField 
                                        id="outlined-search" 
                                        label="City" 
                                        type="text" 
                                        required 
                                        defaultValue={member.location.city}
                                        onChange={(e)=>updateForm({  location: {city: e.target.value} })}
                                    />
                                    <TextField 
                                        id="outlined-search" 
                                        label="Province" 
                                        type="text" 
                                        required 
                                        defaultValue={member.location.province}
                                        onChange={(e)=>updateForm({  location: {province: e.target.value} })}
                                    />
                                    <TextField 
                                        id="outlined-search" 
                                        label="Country" 
                                        type="text" 
                                        required 
                                        defaultValue={member.location.country}
                                        onChange={(e)=>updateForm({  location: {country: e.target.value} })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div id="Holder_Button">
                            <Button variant="outlined">cancel</Button>
                            <Button variant="contained" endIcon={<NavigateNextIcon/>} onClick={(e) => Submit(e)}>Update</Button>
                        </div>
                    </form>
                </>
                break;
            case 1:
                return <>
                    <form>
                        <div className="Subject_Seperator">
                            <div className="holder_Subject">
                                <h3>User Email</h3>
                                <p>Basic details of the user</p>
                            </div>
                            <div className="holder_Questions">
                                <div className='Wrapper_2_Inputs'>
                                    <TextField 
                                        id="outlined-search" 
                                        label="Email" 
                                        value={"Harold James H. Castillo"}
                                        type="text" 
                                        required 
                                        disabled
                                        // defaultValue={FormValue.description}
                                        // onChange={(e) => updateForm({description: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="Subject_Seperator">
                            <div className="holder_Subject">
                                <h3>Password</h3>
                                <p>Basic details of the user</p>
                            </div>
                            <div className="holder_Questions">
                                <div className='Wrapper_2_Inputs'>
                                    <TextField 
                                        id="outlined-search" 
                                        label="Current Password" 
                                        type="password" 
                                        required 
                                        // defaultValue={FormValue.description}
                                        // onChange={(e) => updateForm({description: e.target.value})}
                                    />
                                </div>
                                <div className='Wrapper_2_Inputs'>
                                    <TextField 
                                        id="outlined-search" 
                                        label="New Password" 
                                        type="password" 
                                        required 
                                        // defaultValue={FormValue.description}
                                        // onChange={(e) => updateForm({description: e.target.value})}
                                    />
                                    <TextField 
                                        id="outlined-search" 
                                        label="Re-type New Password" 
                                        type="password" 
                                        required 
                                        // defaultValue={FormValue.description}
                                        // onChange={(e) => updateForm({description: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>
                        <div id="Holder_Button">
                            <Button variant="outlined">cancel</Button>
                            {/* <Button variant="contained" endIcon={<NavigateNextIcon/>}>Update</Button> */}
                            <Button variant="contained" endIcon={<NavigateNextIcon/>}>Update</Button>
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
                        <Step >
                            <StepLabel className='StepperLabel' onClick={()=>setActiveStep(0)}>User Details</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel className='StepperLabel' onClick={()=>setActiveStep(1)}>Login Details</StepLabel>
                        </Step>
                    </Stepper>
                </div>
            </div>
            <VIEWFORM />
        </section>
    )
}

export default ProfileUpdate