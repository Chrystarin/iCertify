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
import SnackbarComponent from '../../components/Snackbar/SnackbarComponent';
import Loading from '../../components/Loading/Loading';
import axios from '../../utils/axios';
// Import Utilities
import axiosInstance from '../../utils/axios';
import { useAuth } from "../../utils/AuthContext";

function ProfileUpdate() {
	const [openSnackBar, setOpenSnackBar] = React.useState({
		open:false,
		type:"",
		note:""
	});
    // Constant Declarations
    const { id } = useParams();
	const navigate = useNavigate();

	// States Declarations
    const [activeStep, setActiveStep] = useState(0);
	const [user, setUser] = useState(null);
    const [form, setForm] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        birthDate: '',
        address: '',
        contactNo: '',
        about: '',
    });

	// Executes on load
	useEffect(() => {
		fetchUser();
	}, []);

    // Retrieves User's Data
    const fetchUser = async () => {
        await axiosInstance
		.get(`users`,{
			params: {
				walletAddress: id
			}
		})
		.then((response) => {
			setUser(response.data);
			setForm({
				firstName: response.data.name.firstName,
				middleName: response.data.name.middleName,
				lastName: response.data.name.lastName,
				email: response.data.email,
				birthDate: response.data.birthDate,
				address: response.data.address,
				contactNo: response.data.contactNo,
				about: response.data.about,
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

	// Submits Data
	async function Submit(e) {
		e.preventDefault();

		try {
            const formData = new FormData();
            formData.append('body', JSON.stringify({
                firstName: form.firstName,
                middleName: form.middleName,
                lastName: form.lastName,
                email: form.email,
                birthDate: form.birthDate,
                address: form.address,
                contactNo: form.contactNo,
                about: form.about,
            }))
            await axiosInstance.patch(
                `users`, 
                formData,
                {headers: {'Content-Type': 'multipart/form-data'}}
            )
            .then((response)=>{
                fetchUser();
				setOpenSnackBar(openSnackBar => ({
					...openSnackBar,
					open:true,
					type:'success',
					note:"Profile Updated!",
				}));
                navigate(`/users/${user.walletAddress}`)
            })
        } catch (error) {  
			setOpenSnackBar(openSnackBar => ({
				...openSnackBar,
				open:true,
				type:'error',
				note:error.response.data.message,
			}));
        }
	}

	// Update Visual Value
	const [dateValue, setdateValue] = useState(form.birthDate);
	
	// Returns if member is null
	if (!user) return <Loading/>;
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
						<div className='Wrapper_3_1_3'>
							<TextField
								id='outlined-search'
								label='First Name'
								type='text'
								required
								defaultValue={form.firstName}
                                onChange={(e) => updateForm({firstName: e.target.value})}
							/>
							<TextField
								id='outlined-search'
								label='Middle Name'
								type='text'
								defaultValue={form.middleName}
								onChange={(e) =>updateForm({middleName: e.target.value})}
							/>
							<TextField
								id='outlined-search'
								label='Last Name'
								type='text'
								required
								defaultValue={form.lastName}
								onChange={(e) =>updateForm({lastName: e.target.value})}
							/>
						</div>
						<TextField
							id='outlined-search'
							label='About '
							type='text'
							multiline
							defaultValue={form.about}
							onChange={(e) =>updateForm({about: e.target.value})}
						/>
						<div className='Wrapper_2_Inputs'>
							<TextField
								id='outlined-search'
								label='Address'
								type='text'
								defaultValue={form.address}
								onChange={(e) =>updateForm({address: e.target.value})}
							/>
							{/* <TextField
								id='outlined-search'
								label='Address'
								type='date'
								defaultValue={form.birthDate}
								onChange={(e) =>updateForm({address: e.target.value})}
							/> */}
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DesktopDatePicker
									InputLabelProps={{ shrink: true }}
									label="Birthday"
									inputFormat="MM/DD/YYYY"
                                    // defaultValue={form.birthDate}
									defaultValue={dateValue}
                                    value={dateValue}
									maxDate={new Date()}
                                    onChange={(newValue) => {
										setdateValue(new Date(newValue));
										updateForm({birthDate: new Date(newValue)})
									}}
									renderInput={(params) => <TextField InputLabelProps={{ shrink: true }} {...params} />}
								/>
							</LocalizationProvider>
		
						</div>
						<div className='Wrapper_2_Inputs'>
							<TextField
								id='outlined-search'
								label='Email'
								type='email'
								required
								defaultValue={form.email}
								onChange={(e) =>updateForm({email: e.target.value})}
							/>
							<TextField
								id='outlined-search'
								label='Contact Number'
								type='number'
								inputProps={{ inputMode: 'tel', pattern: '[0-9]{4}-[0-9]{3}-[0-9]{4}' }}
								defaultValue={form.contactNo}
								onChange={(e) =>{
									updateForm({contactNo: e.target.value})
								}}
							/>
							
						</div>
					</div>
				</div>
				<div id='Holder_Button'>
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
			<SnackbarComponent open={openSnackBar} setter={setOpenSnackBar}/>
		</section>
	);
}

export default ProfileUpdate;
