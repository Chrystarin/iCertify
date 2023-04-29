import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';

// Import Stylesheets
import './InstitutionUpdate.scss';
import './../../styles/Form.scss';

// Import Components
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';

// Import Utilities
import axiosInstance from '../../utils/axios';
import { useAuth } from "../../utils/AuthContext";

function InstitutionUpdate() {

    // Constant Declarations
	const navigate = useNavigate();
	const { id } = useParams();
    const {isAuth} = useAuth();

    // State Declarations
    const [institution, setInstitution] = useState();
    const [form, setForm] = useState({
        name: '',
        instType: '',
        email: '',
        about: '',
        address: '',
        website: '',
        contactNo: '',
        id: false,
        membership: false
    });

	// Executes on load
	useEffect(() => {
        
        fetchInstitution();
	}, []);

    // Retrieves Institution Data
    const fetchInstitution = async () => {
        await axiosInstance
            .get(`institutions`,{
                params: {
                    walletAddress: id
                }
            })
            .then((response) => {
                setInstitution(response.data)
                setForm({
                    name: response.data.name,
                    instType: response.data.instType,
                    email: response.data.email,
                    about: response.data.about,
                    address: response.data.address,
                    website: response.data.website,
                    contactNo: response.data.contactNo,
                    id: response.data.needs.ID,
                    membership: response.data.needs.membership
                })
            });
    };

	// Updates form from input
	function updateForm(e) {
        return setForm((prev) => {
            const [key, value] = Object.entries(e)[0];
            prev[key] = value;
            return prev;
        });
    }

	// Edit Institution Data
    const EditInstitution = async () => {
        try {
            const formData = new FormData();
            formData.append('body', JSON.stringify({
                name: form.name,
                type: form.instType,
                email: form.email,
                about: form.about,
                address: form.address,
                website: form.website,
                contactNo: form.contactNo,
                needId: form.id,
                needMembership: form.membership
            }))
            
            await axiosInstance.patch(
                `institutions`, 
                formData,
                {headers: {'Content-Type': 'multipart/form-data'}})
            .then((response)=>{
                alert("Profile Updated")
                navigate(`/institutions/${id}`)
            })
        } catch (err) {      
            console.error(err.message);
        }
    }
	
	// Returns if institution is null
	if (!institution) 
        return <div>loading...</div>;

    // Redirects to Unauthorized Page if User not Institution Admin
    if (!isAuth(id))
        navigate("/unauthorized")

	return (
		<section id='Create_Event'>
			<div id='Stepper'>
				<div id='Holder_Stepper'>
					<Stepper>
						<Step>
							<StepLabel
								className='StepperLabel'
							>
								Update Institution Profile
							</StepLabel>
						</Step>
					</Stepper>
				</div>
			</div>
				<div className='Category__Seperator'>
					<div className='Category__Title'>
						<h4>Institution Details</h4>
						<p>Basic details of the Institution</p>
					</div>
					<div className='Category__Content'>
						<TextField
							id='outlined-search'
							label='Name'
							type='text'
                            defaultValue={form.name}
							required
							onChange={(e) => updateForm({name: e.target.value})}
						/>
						<TextField
							id='outlined-search'
							label='About'
							type='text'
                            defaultValue={form.about}
							multiline
							onChange={(e) => updateForm({about: e.target.value})}
						/>
						<div className='Wrapper_2_1_Inputs'>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Institution Type</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									defaultValue={form.instType}
									label="Institution Type"
									onChange={(e) => updateForm({instType: e.target.value})}
								>
									<MenuItem value={"organization"}>Organization</MenuItem>
									<MenuItem value={"school"}>School</MenuItem>
									<MenuItem value={"corporation"}>Corporation</MenuItem>
								</Select>
							</FormControl>
							<TextField
								id='outlined-search'
								label='Contact Number'
								type='number'
                                defaultValue={form.contactNo}
								onChange={(e) => updateForm({contactNo: e.target.value})}
							/>
							<TextField
								id='outlined-search'
								label='Address'
								type='text'
                                defaultValue={form.address}
								onChange={(e) => updateForm({address: e.target.value})}
							/>
						</div>
						<div className='Wrapper_2_Inputs'>
							<TextField
								id='outlined-search'
								label='Email'
                                type='email'
								required
                                defaultValue={form.email}
								onChange={(e) => updateForm({email: e.target.value})}
							/>
							<TextField
								id='outlined-search'
								label='Website Link'
								type='text'
                                defaultValue={form.website}
								onChange={(e) => updateForm({website: e.target.value})}
							/>
						</div>
                        <div className='Wrapper_2_Inputs'>
                            Require Member ID
                            <Switch 
                                defaultChecked={form.id}
                                onChange={() => updateForm({id: (!form.id) })}
                            />
                        </div>
                        <div className='Wrapper_2_Inputs'>
                            Require Membership Proof
                            <Switch 
                                defaultChecked={form.membership}
                                onChange={() => updateForm({membership: (!form.membership) })}
                            />
                        </div>
					</div>
                    
				</div>
				
				<div id='Holder_Button'>
					<Button 
                        variant='outlined'
                        onClick={()=>{navigate(`/institutions/${id}`)}}
                    >
                        Cancel
                    </Button>
					<Button
						variant='contained'
						type="submit"
                        onClick={(e) => EditInstitution(e)}
					>
						Update
					</Button>
				</div>
		</section>
	);
}

export default InstitutionUpdate;
