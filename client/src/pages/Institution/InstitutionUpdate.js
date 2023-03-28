import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';

import './InstitutionUpdate.scss';
import './../../styles/Form.scss';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Avatar } from '@mui/material';
import axios from '../../config/axios';

function ProfileUpdate() {



	const navigate = useNavigate();
	const { id } = useParams();
	const [member, setMember] = useState(null);

	// Executes on load
	useEffect(() => {
		// Retrieves Member Data
		axios.get(`members/${id}`).then(({ data }) => setMember(data));
	}, []);

	// Updates form from input
	function updateForm(e) {
		return setMember((prev) => {
			const [key, value] = Object.entries(e)[0];
			if (key == 'name' || key == 'contact' || key == 'location') {
				const [property, subValue] = Object.entries(value)[0];
				prev[key]
					? (prev[key][property] = subValue)
					: Object.assign(prev, { [key]: { [property]: subValue } });
			} else {
				prev[key] = value;
			}
			return prev;
		});
	}

	// Submits Data
	async function Submit(e) {
		e.preventDefault();
		await axios
		.patch(`members/${id}`, JSON.stringify({ ...member }), {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((response) => {
			console.log(response.data);
			navigate(`/m/${id}`);
		})
		.catch((error) => {
			console.log('Error:' + error);
			return;
		});
	}



	// Update Visual Value
	const [dateValue, setdateValue] = React.useState(null);
	const [genderValue, setgenderValue] = React.useState(null);
	
	// Returns if member is null
	// if (!member) return <div>loading...</div>;


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
			<form onSubmit={(e) => Submit(e)} className="formTemplate">
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
							required
							disabled
							onChange={
								()=>{}
								// (e) =>
								// // 
								// // updateForm({
								// // 	about: e.target.value
								// })
							}
						/>
						<TextField
							id='outlined-search'
							label='About'
							type='text'
							required
							multiline
							onChange={
								()=>{}
								// (e) =>
								// // 
								// // updateForm({
								// // 	about: e.target.value
								// })
							}
						/>
						<div className='Wrapper_2_1_Inputs'>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Institution Type</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={genderValue}
									label="Institution Type"
									onChange={(event)=>{
										setgenderValue(event.target.value);
									}}
									>
									<MenuItem value={"Organization"}>Organization</MenuItem>
									<MenuItem value={"School"}>School</MenuItem>
									<MenuItem value={"Corporation"}>Corporation</MenuItem>
								</Select>
							</FormControl>
							<TextField
								id='outlined-search'
								label='Contact Number'
								type='text'
								required
								onChange={
									()=>{}
									// (e) =>
									// // 
									// // updateForm({
									// // 	about: e.target.value
									// })
								}
							/>
							<TextField
								id='outlined-search'
								label='Address'
								type='text'
								required
								onChange={
									()=>{}
									// (e) =>
									// // 
									// // updateForm({
									// // 	about: e.target.value
									// })
								}
							/>
						</div>
						<div className='Wrapper_2_Inputs'>
							<TextField
								id='outlined-search'
								label='Email'
								type='text'
									onChange={
									()=>{}
									// (e) =>
									// // 
									// // updateForm({
									// // 	about: e.target.value
									// })
								}
							/>
							<TextField
								id='outlined-search'
								label='Website Link'
								type='text'
								onChange={
									()=>{}
									// (e) =>
									// // 
									// // updateForm({
									// // 	about: e.target.value
									// })
								}
							/>
						</div>
					</div>
				</div>
				
				<div id='Holder_Button'>
					
					<Button variant='outlined'>cancel</Button>
					<Button
						variant='contained'
						type="submit"
					>
						Update
					</Button>
				</div>
			</form>
		</section>
	);
}

export default ProfileUpdate;
