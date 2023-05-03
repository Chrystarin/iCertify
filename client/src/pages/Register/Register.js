import React, {useState} from 'react';

import logo from '../../images/iCertifyBranding/icertify_footer.png';
import Certificate from '../../images/Resources/Certificate.png';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import './Register.scss'

import {useAuth} from "../../utils/AuthContext";

function Register() {
    // Constant Declarations;
    const { register } = useAuth();
    const [userType, setUserType] = useState();
    const [gender, setGender] = useState();
    
    // Institution Registration Form
    const [institutionForm, setInstitutionForm] = useState({
        email: '',
        name: '',
        type: '',
        txHash: '',
    });

    // Member Registration Form
    const [memberForm, setMemberForm] = useState({
        email: '',
        firstName: '',
        middleName: '',
        lastName: '',
        birthDate: ''
    })
    
    // Retrieves data from text input then assigns to form
    function updateForm(e) {
        switch(userType){
            case 'user':
                return setMemberForm((prev) => {
                    const [key, value] = Object.entries(e)[0];
                    prev[key] = value;
                    return prev;
                });
            case 'institution':
                return setInstitutionForm((prev) => {
                    const [key, value] = Object.entries(e)[0];
                    prev[key] = value;
                    return prev;
                });
        }
    }

    // Register an Account
    const Register = async (e) => {
        e.preventDefault();

        register({
            userType : userType, 
            memberForm : memberForm, 
            institutionForm : institutionForm
        });
    }

    const handleChangeGender = (event) => {
        setGender(event.target.value);
    };

    return (
        <div id='Signup'>
            <div id='Container_Signup'>
                <div id='Container_Signup_Content'>
                    <a id='Holder_GoBack_Button' href='/'>
                        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.94 24.23"><defs><style></style></defs><g id="Path_382" data-name="Path 382"><polygon className="cls-1" points="12.11 24.23 0 12.11 12.11 0 14.94 2.83 5.66 12.11 14.94 21.4 12.11 24.23"/></g></svg>
                        <h5>Go back to Home</h5>
                    </a>
                    <div id='Container_Welcome'>
                        <h2>WELCOME TO</h2>
                        <img src={logo} alt="" id='LogoImg'/>
                    </div>
                    <h6>We provide online digital certificates through implementing NFT and Blockchain technology to ensure both employees and employers that their certificates are authentic and free from falsification.</h6>
                    <img id='Certificate' src={Certificate} alt="" />
                </div>
                <div id='Container_Signup_Panel'>
                    <div id='Container_Signup_Form'>
                        {!userType?<>
                            <div>
                                <h3>Get Started</h3>
                                <h5><span>Select</span> your role to <span>create</span> an account</h5>
                                <div id='RoleSelection'>
                                    <div className='RoleSelection__Container' onClick={()=>{setUserType("user")}}>
                                        <AssignmentIndIcon className='RoleSelection__Icon'/>
                                        <h6 id='RoleSelection__Title'>Member</h6>
                                    </div>
                                    <div className='RoleSelection__Container' onClick={()=>{setUserType("institution")}}>
                                        <ApartmentIcon className='RoleSelection__Icon'/>
                                        <h6 id='RoleSelection__Title'>Institution</h6>
                                    </div>
                                </div>
                            </div>
                        </>:<></>}
                        {userType==="user"?<>
                            <div>
                                <h3>Get Started</h3>
                                <h5><span>Setup</span> your profile and <span>Connect</span> your wallet </h5>
                                <form onSubmit={Register}>
                                    <TextField 
                                        id="outlined-search" 
                                        label="First Name" 
                                        type="text" 
                                        required
                                        onChange={(e)=>updateForm({ firstName: e.target.value })}
                                    />
                                    <TextField 
                                        id="outlined-search" 
                                        label="Middle Name" 
                                        type="text" 
                                        onChange={(e)=>updateForm({ middleName: e.target.value })}
                                    />
                                    <TextField 
                                        id="outlined-search" 
                                        label="Last Name" 
                                        type="text" 
                                        required
                                        onChange={(e)=>updateForm({ lastName: e.target.value })}
                                    />
                                    <TextField 
                                        InputLabelProps={{ shrink: true }}
                                        id="outlined-search" 
                                        label="Birthday"
                                        type="date"
                                        required 
                                        onChange={(e)=>updateForm({ birthDate: e.target.value })}
                                    />
                                    <TextField 
                                        id="outlined-search" 
                                        label="Email"
                                        type="email"
                                        required 
                                        onChange={(e)=>updateForm({ email: e.target.value })}
                                    />
                                    {/* <div className='Form__2__Inputs'>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={gender}
                                                label="Gender"
                                                onChange={(event)=>{
                                                    setGender(event.target.value);
                                                }}
                                            >
                                                <MenuItem value={"Male"}>Male</MenuItem>
                                                <MenuItem value={"Female"}>Female</MenuItem>
                                                <MenuItem value={"Others"}>Others</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <TextField 
                                            id="outlined-search" 
                                            label="Email" 
                                            type="email"
                                            required 
                                            onChange={(e)=>updateForm({ lastName: e.target.value })}
                                        />
                                    </div> */}
                                    <input id='Submit' type="submit" value="Connect" />
                                </form>            
                            </div>
                        </>:<></>}
                        
                        {userType==="institution"?<>
                            <div>
                                <h3>Get Started</h3>
                                <h5><span>Setup</span> your Institution and <span>Connect</span> your wallet </h5>
                                <form onSubmit={Register}>
                                    <TextField 
                                        id="outlined-search" 
                                        label="Institution Name" 
                                        type="text" 
                                        required
                                        onChange={(e)=>updateForm({ name: e.target.value })}
                                    />
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Institution Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={institutionForm.type}
                                            label="Institution Type"
                                            onChange={(e)=>setInstitutionForm({...institutionForm, type: e.target.value})}
                                        >
                                            <MenuItem value={"organization"}>Organization</MenuItem>
                                            <MenuItem value={"school"}>School</MenuItem>
                                            <MenuItem value={"corporation"}>Corporation</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField 
                                            id="outlined-search" 
                                            label="Email" 
                                            type="email"
                                            required 
                                            onChange={(e)=>updateForm({ email: e.target.value })}
                                        />
                                    <input id='Submit' type="submit" value="Connect" />
                                </form>            
                            </div>
                        </>:<></>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register