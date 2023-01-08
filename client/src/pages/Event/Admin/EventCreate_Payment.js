import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Submit from './EventCreate.js';

import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

import axios from '../../../config/axios';

function EventCreate_Payment({
	StepValue,
	SetStepValue,
	FormValue,
	SetFormValue,
	EditMode
}) {
	const { id } = useParams();
	const url = 'http://localhost:6787/events/create';
	const navigate = useNavigate();

	function backStep() {
		if (StepValue !== 0) {
			SetStepValue(StepValue - 1);
		}
	}

	async function Submit(e, form) {
		e.preventDefault();

		// Data Validation
		form.type = form.type.toLowerCase();
		form.date.start = Number(form.date.start);
		form.date.end = Number(form.date.end);
		form.regularPrice = Number(form.regularPrice);
		form.premiumPrice = Number(form.premiumPrice);
		form.tags = form.tags ? [] : [form.tags];
		form.status = 'active';

		// When a post request is sent to the create url, we'll add a new record to the database.
		const newEvent = { ...form };

		if (EditMode) {
			await axios
				.patch(`/events/${id}`, JSON.stringify(newEvent), {
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then((response) => {
					console.log(response.data);
					navigate(`/member/event/${id}`);
				})
				.catch((error) => {
					console.log('Error:' + error);
					return;
				});
		} else {
			await axios
				.post(`events/create`, JSON.stringify(newEvent), {
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then((response) => {
					console.log(response.data);
					navigate(`/member/event/${response.data.eventId}`);
					console.log('Submitted');
				})
				.catch((error) => {
					console.log('Error:' + error);
					return;
				});
		}
	}

	return (
		<div>
			<form action='#'>
				<div className='Subject_Seperator'>
					<div className='holder_Subject'>
						<h3>Price & Discount</h3>
						<p>Assign the entrance fee for the event</p>
					</div>
					<div className='holder_Questions'>
						<div className='Wrapper_2_Inputs'>
							<TextField
								label='Regular Price'
								id='outlined-start-adornment'
								type='Number'
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											₱
										</InputAdornment>
									)
								}}
								defaultValue={FormValue.regularPrice}
								onChange={(event) => {
									SetFormValue({
										...FormValue,
										regularPrice: event.target.value
									});
								}}
							/>
							<TextField
								label='Premium Price'
								id='outlined-start-adornment'
								type='Number'
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											₱
										</InputAdornment>
									)
								}}
								defaultValue={FormValue.premiumPrice}
								onChange={(event) => {
									SetFormValue({
										...FormValue,
										premiumPrice: event.target.value
									});
								}}
							/>
						</div>
					</div>
				</div>
				<div id='Holder_Button'>
					<Button variant='text'>Save as draft</Button>
					<Button
						variant='outlined'
						onClick={backStep}
					>
						Back
					</Button>
					<Button
						variant='contained'
						onClick={(e, form) => Submit(e, FormValue)}
					>
						Create Event
					</Button>
				</div>
			</form>
		</div>
	);
}

export default EventCreate_Payment;
