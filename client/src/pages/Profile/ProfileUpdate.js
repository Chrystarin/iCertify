import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';

import './ProfileUpdate.scss';
import './../../styles/Form.scss';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Button from '@mui/material/Button';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import axios from '../../utils/axios';

function ProfileUpdate() {
	const [activeStep, setActiveStep] = useState(0);


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
	if (!member) return <div>loading...</div>;
    
	return (
		<section id='Create_Event'>
			<div id='Stepper'>
				<div id='Holder_Stepper'>
					<Stepper activeStep={activeStep}>
						<Step>
							<StepLabel
								className='StepperLabel'
								onClick={() => setActiveStep(0)}
							>
								Update Profile
							</StepLabel>
						</Step>
					</Stepper>
				</div>
			</div>
			<form onSubmit={(e) => Submit(e)} className="formTemplate">
				<div className='Category__Seperator'>
					<div className='Category__Title'>
						<h4>User Details</h4>
						<p>Basic details of the user</p>
					</div>
					<div className='Category__Content'>
						<div className='Wrapper_Name_Inputs'>
							<TextField
								id='outlined-search'
								label='First Name'
								type='text'
								required
								defaultValue={
									member.name?.firstName ?? ''
								}
								onChange={(e) =>
									updateForm({
										name: {
											firstName:
												e.target.value
										}
									})
								}
							/>
							<TextField
								id='outlined-search'
								label='Middle Name'
								type='text'
								required
								defaultValue={
									member.name?.middleName ?? ''
								}
								onChange={(e) =>
									updateForm({
										name: {
											middleName:
												e.target.value
										}
									})
								}
							/>
							<TextField
								id='outlined-search'
								label='Last Name'
								type='text'
								required
								defaultValue={
									member.name?.lastName ?? ''
								}
								onChange={(e) =>
									updateForm({
										name: {
											lastName: e.target.value
										}
									})
								}
							/>
							<TextField
								id='outlined-search'
								label='Extension'
								type='text'
								
								defaultValue={
									member.name?.extension ?? ''
								}
								onChange={(e) =>
									updateForm({
										name: {
											extension:
												e.target.value
										}
									})
								}
							/>
						</div>
						<TextField
							id='outlined-search'
							label='About '
							type='text'
							required
							multiline
							defaultValue={member.about ?? ''}
							onChange={(e) =>
								updateForm({
									about: e.target.value
								})
							}
						/>
						<div className='Wrapper_1_2_Inputs'>
							<TextField
								id='outlined-search'
								label='Address'
								type='text'
								required
								defaultValue={member.about ?? ''}
								onChange={
									()=>{}
									// (e) =>
									// // 
									// // updateForm({
									// // 	about: e.target.value
									// })
								}
							/>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Gender</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={genderValue}
									label="Gender"
									onChange={(event)=>{
										setgenderValue(event.target.value);
									}}
									>
									<MenuItem value={"Male"}>Male</MenuItem>
									<MenuItem value={"Female"}>Female</MenuItem>
									<MenuItem value={"Other"}>Other</MenuItem>
								</Select>
							</FormControl>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DesktopDatePicker
									label="Birthday"
									inputFormat="MM/DD/YYYY"
									value={dateValue}
									onChange={(newValue)=>{
										setdateValue(newValue)
									}}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						</div>
						<div className='Wrapper_2_Inputs'>
							<TextField
								id='outlined-search'
								label='Email'
								type='email'
								required
								defaultValue={member.about ?? ''}
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
								label='Mobile Number'
								type='text'
								required
								defaultValue={member.about ?? ''}
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
					<Button
						variant='outlined'
						onClick={() => console.log(member)}
					>
						TEST DATA
					</Button>
					<Button variant='outlined'>cancel</Button>
					<Button
						variant='contained'
						endIcon={<NavigateNextIcon />}
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
