import React,{useState} from 'react';
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
	function Upload(e, form){
		Submit(e, FormValue)

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
					navigate(`/a/events/${id}`);
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
					navigate(`/a/events/${response.data.eventId}`);
					console.log('Submitted');
				})
				.catch((error) => {
					console.log('Error:' + error);
					return;
				});
		}
	}
	function updateForm(e) {
		return SetFormValue((prev) => {
			const [key, value] = Object.entries(e)[0];

			prev[key] = value;

			console.log(e)
			console.log(prev)
			return prev;
		});
	}
	return (
		<div>
			<form action='#' onSubmit={Upload}>
				<div className='Subject_Seperator'>
					<div className='holder_Subject'>
						<h3>Price & Discount</h3>
						<p>Assign the entrance fee for the event</p>
					</div>
					<div className='holder_Questions'>
						<div className='Wrapper_2_Inputs'>
							<TextField
								id='outlined-search'
								label='Regular Price'
								type='number'
								required
								defaultValue={FormValue.regularPrice}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											₱
										</InputAdornment>
									)
								}}
								onChange={(e) =>
									updateForm({ regularPrice: e.target.value })
								}
							/>
							<TextField
								id='outlined-search'
								label='Premium Price'
								type='number'
								required
								defaultValue={FormValue.premiumPrice}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											₱
										</InputAdornment>
									)
								}}
								onChange={(e) =>
									updateForm({ premiumPrice: e.target.value })
								}
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
						type="submit"
					>
						Create Event
					</Button>
				</div>
			</form>
		</div>
	);
}

export default EventCreate_Payment;
