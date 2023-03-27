import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FormHelperText from '@mui/material/FormHelperText';
// import Tags from '../../../components/Tags/Tags.js';

function EventCreate_EventDetails({
	StepValue,
	SetStepValue,
	FormValue,
	SetFormValue
}) {
	// Tags Predifined for help searching
	const PredefinedTags = [
		'Computer',
		'Technology',
		'Blockchain',
		'Entertainment',
		'UserInterface',
		'UserExperience'
	];

	// Event Type
	const EventTypehandleChangeEvent = (event) => {
		SetFormValue({
			...FormValue,
			type: event.target.value
		});
	};

	// Tags
	function TagsValHandleChange(option, index) {
		SetFormValue({
			...FormValue,
			tags: index
		});
	}

	// Start Date and Time
	const [startDateTimeVal, setStartDateTimeVal] = useState(
		FormValue.date.start
	);
	const [endDateTimeVal, setEndDateTimeVal] = useState(FormValue.date.end);

	const [ErrorHandling, setErrorHandling] = useState({
		type:"",
		title:"",
		description:"",
		link:"",
		location:"",
		date:{
			start:'',
			end:""
		},
		tags:"",
		canClaimCertificate: ""
	});

	function EmptyInputChecker(e){
		let EmptyErrorMessage = "This Field is Required"
		
		// return setErrorHandling((prev) => {
		// 	const [key, value] = Object.entries(e)[0];
		// 	if(value==''){
		// 		prev[key] = EmptyErrorMessage;
		// 	} else{
		// 		prev[key] = '';
		// 	}
		// 	prev[key] = value;
		// 	return prev;
		// });

	}

	// const endDateTimeValhandleChange = (newValue) => {
	// 	SetFormValue(prevState => ({
	// 	  ...FormValue,
	// 	  date:{
	// 		...prevState.date,
	// 		end: Date.parse(newValue)
	// 	  }
	// 	}));
	// };

	// Button Next
	function nextStep(e) {
		e.preventDefault();

		// EmptyInputChecker();
		console.log(FormValue);
		console.log(ErrorHandling);
		if (StepValue !== 2) {
			SetStepValue(StepValue + 1);
		}
	}

	// These methods will update the form data
	function updateForm(e) {
		return SetFormValue((prev) => {
			const [key, value] = Object.entries(e)[0];
			// prev[key] = value;
			// return prev;

			// Identify if toChange is date
			if (key == 'date') {
				const [dateType, date] = Object.entries(value)[0];
				prev[key][dateType] = date;
			} else {
				prev[key] = value;
			}
			console.log(e)
			console.log(prev)
			return prev;
		});
	}
	return (
		<form onSubmit={nextStep}>
			<div className='Subject_Seperator'>
				<div className='holder_Subject'>
					<h3>Event Type</h3>
					<p>Necessary Information for new event.</p>
				</div>
				<div className='holder_Questions'>
					<div className='Wrapper_2_Inputs'>
						<FormControl
							fullWidth
							required
							helpertext='Select Event'
							error={(ErrorHandling.type=="")?false:true}
						>
							<InputLabel
								id='demo-simple-select-label'
								required
							>
								Event Type
							</InputLabel>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={FormValue.type}
								label='Event Type'
								onChange={EventTypehandleChangeEvent}
							>
								<MenuItem value={'Online'}>Online</MenuItem>
								<MenuItem value={'Onsite'}>Onsite</MenuItem>
							</Select>
							<FormHelperText>
								{(ErrorHandling.type=="")?"Select event type":ErrorHandling.type}
								


							</FormHelperText>
						</FormControl>
						{FormValue.type == '' ? (
							''
						) : FormValue.type == 'Online' ? (
							<TextField
								id={(ErrorHandling.link=="")?"outlined":"outlined-error-helper-text"}
								label='Link'
								type='text'
								required
								error={(ErrorHandling.link=="")?false:true}
								helperText={(ErrorHandling.link=="")?"":ErrorHandling.link}
								defaultValue={FormValue.link}
								onChange={(e) =>
									updateForm({ link: e.target.value })
								}
							/>
						) : (
							<TextField
								id='outlined-search'
								label='Location'
								type='text'
								required
								defaultValue={FormValue.location}
								error={(ErrorHandling.location=="")?false:true}
								helperText={(ErrorHandling.location=="")?"":ErrorHandling.title}
								onChange={(e) =>
									updateForm({ location: e.target.value })
								}
							/>
						)}
					</div>
				</div>
			</div>
			<div className='Subject_Seperator'>
				<div className='holder_Subject'>
					<h3>Basic Details</h3>
					<p>Necessary Information for new event.</p>
				</div>
				<div className='holder_Questions'>
					<TextField
						id='outlined-search'
						label='Event Title'
						type='text'
						defaultValue={FormValue.title}
						required
						error={(ErrorHandling.title=="")?false:true}
						helperText={(ErrorHandling.title=="")?"":ErrorHandling.title}
						onInput={(e) => updateForm({ title: e.target.value })}
					/>
					<TextField
						id='outlined-search'
						label='Event Description'
						type='text'
						required
						multiline
						error={(ErrorHandling.description=="")?false:true}
						helperText={(ErrorHandling.description=="")?"":ErrorHandling.description}
						defaultValue={FormValue.description}
						onChange={(e) =>
							updateForm({ description: e.target.value })
						}
					/>

					<div className='Wrapper_2_1_Inputs'>
						<LocalizationProvider dateAdapter={AdapterDayjs} >
							<DateTimePicker
								label='Start Date & Time'
								// defaultValue={FormValue.date.start}
								value={startDateTimeVal}
								
								onChange={(newValue) => {
									updateForm({
										date: { start: Date.parse(newValue) }
									});
									setStartDateTimeVal(FormValue.date.start);
								}}
								renderInput={(params) => (
									<TextField {...params} 
										error={(ErrorHandling.date.start=="")?false:true}
										helperText={(ErrorHandling.date.start=="")?"":ErrorHandling.date.start}
										required
									/>
								)}
							/>
						</LocalizationProvider>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DateTimePicker
								label='End Date & Time'
								defaultValue={FormValue.date.end}
								value={endDateTimeVal}
								minDate={startDateTimeVal}
								onChange={(newValue) => {
									updateForm({
										date: { end: Date.parse(newValue) }
									});
									setEndDateTimeVal(FormValue.date.end);
								}}
								renderInput={(params) => (
									<TextField {...params} 
									error={(ErrorHandling.date.end=="")?false:true}
									helperText={(ErrorHandling.date.end=="")?"":ErrorHandling.date.end}
									required
									/>
								)}
							/>
						</LocalizationProvider>

						{/* <Tags
							PredefinedTags={PredefinedTags}
							HandleChange={TagsValHandleChange}
							defaultValue={FormValue.tags}
							errorhandling={ErrorHandling.tags}
						/> */}
					</div>
					<div>
						<FormControlLabel
							control={
								<Switch
									defaultChecked={
										FormValue.canClaimCertificate
									}
								/>
							}
							label='Certificate'
							onChange={(e) =>
								updateForm({
									canClaimCertificate: e.target.checked
								})
							}
							error={(ErrorHandling.canClaimCertificate=="")?false:true}
							helperText={(ErrorHandling.canClaimCertificate=="")?"":ErrorHandling.canClaimCertificate}
									
							
						/>
					</div>
				</div>
			</div>
			<div id='Holder_Button'>
				<Button variant='text'>Save as draft</Button>
				<Button
					variant='contained'
					// onClick={() => nextStep()}
					endIcon={<NavigateNextIcon />}
					type="submit"
				>
					Next
				</Button>
			</div>
		</form>
	);
}

export default EventCreate_EventDetails;
