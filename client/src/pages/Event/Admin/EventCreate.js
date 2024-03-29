import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';

import './../../../styles/Form.scss';

// Stepper
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

// Forms
import EventDetailsForm from './EventCreate_EventDetails';
import EventSetParticipantsForm from './EventCreate_SetParticipants';
import EventPaymentForm from './EventCreate_Payment';
import { Button } from '@mui/material';

import axios from '../../../config/axios';

export default function EventCreate() {
	const { id } = useParams();
	const [form, setForm] = useState({
		// Event Details
		type: '',
		title: '',
		description: '',
		link: '',
		location: '',
		date: {
			start: null,
			end: null
		},
		// start: '',
		// end: '',
		tags: [],
		canClaimCertificate: true,

		// Set Participants
		isAcceptingVolunteer: false,
		participants: [],

		// Payment
		regularPrice: null,
		premiumPrice: null,

		// Event Status
		status: ''
	});

	const [isEdit, setIsEdit] = useState(null);

	// Stepper
	const [activeStep, setActiveStep] = useState(0);
	function nextStep() {
		if (activeStep !== 2) {
			setActiveStep(activeStep + 1);
		}
	}
	function backStep() {
		if (activeStep !== 0) {
			setActiveStep(activeStep - 1);
		}
	}

	// Executes on load
	useEffect(() => {
		if (!id) {
			setIsEdit(false);
		} else {
			setIsEdit(true);

			// Fetches event data
			const fetchEvent = async () => {
				const response = await axios
					.get(`/events/${id}`)
					.then((response) => {
						setForm(response.data);
					});
			};

			fetchEvent();
		}
	}, []);

	function VIEWFORM() {
		switch (activeStep) {
			case 0:
				return (
					<EventDetailsForm
						StepValue={activeStep}
						SetStepValue={setActiveStep}
						FormValue={form}
						SetFormValue={setForm}
					/>
				);
				break;
			case 1:
				return (
					<EventSetParticipantsForm
						StepValue={activeStep}
						SetStepValue={setActiveStep}
						FormValue={form}
						SetFormValue={setForm}
					/>
				);
				break;
			case 2:
				return (
					<EventPaymentForm
						StepValue={activeStep}
						SetStepValue={setActiveStep}
						FormValue={form}
						SetFormValue={setForm}
						EditMode={isEdit}
					/>
				);
				break;
			default:
				break;
		}
	}

	return (
		<section id='Create_Event'>
			<div id='Stepper'>
				<div id='Holder_Stepper'>
					<Stepper activeStep={activeStep}>
						<Step>
							<StepLabel>Event Details</StepLabel>
						</Step>
						<Step>
							<StepLabel>Set Participants</StepLabel>
						</Step>
						<Step>
							<StepLabel>Payment</StepLabel>
						</Step>
					</Stepper>
				</div>
			</div>
			<VIEWFORM />
		</section>
	);
}
