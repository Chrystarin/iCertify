import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

import './../../styles/Form.scss';
import './InstitutionJoin.scss';

import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { TextField,Avatar } from '@mui/material';
import UploadFileImage from './../../images/Resources/Design/UploadFile.png'

import axios from '../../utils/axios';

function InstitutionJoin(props) {
    const { id } = useParams();
    const [user, setUser] = useState();
    const navigate = useNavigate();

    // Executes on load
    useEffect(() => {
        // Retrieves User's Data
		const fetchUser = async () => {
			await axios
				.get(`users`,{
                    params: {
                        walletAddress: JSON.parse(localStorage.getItem("user")).walletAddress
                    }
                })
				.then((response) => {
                    setUser(response.data)
				});
		};
        fetchUser();
	}, []);

    // Join Institution
    const Join = async (e) => {
        e.preventDefault();
        try{

            await axios
                .post(`requests`, JSON.stringify({
                    type: 'join',
                    walletAddress: id
                }))
                .then((response) => {
                    console.log(response.data)
                    alert("Join Request Sent! Wait for the admin to approve your request")
                    navigate(`/institutions/${id}`)
                });
        
        } catch (err) {      
            console.error(err.message);
        }
    }

    // Steppers
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

    const EventDetails = {
        Title : "Transcript of Record",
        Certificate: true,
        Price: 400,
        Discount: "None"
    }

    if (!user) return <div>Loading...</div>
  
    return (
        <section>
            <div id="Stepper">
                <div id="Holder_Stepper">
                    <Stepper activeStep={activeStep}>
                        <Step>
                            <StepLabel>Join Institution</StepLabel>
                        </Step>
                    </Stepper>
                </div>
            </div>
            <form className='formTemplate'>
                <div className="Category__Seperator">
                    <div className="Category__Title">
                        {/* <h4>Mode of Payment</h4>
                        <p>Select what mode of payment you want to use</p> */}
                    </div>
                    <div className="Category__Content">
                        <div id='UserInfo'>
                            <Avatar id="UserInfo__Avatar"/>
                            <div>
                                <h5>{user.user.name.firstName}</h5>
                                <p className='BodyText3'>FIRST NAME</p>
                            </div>
                            <div>
                                <h5>{user.user.name.middleName ? user.user.name.middleName : 'N/A'}</h5>
                                <p className='BodyText3'>MIDDLE NAME</p>
                            </div>
                            <div>
                                <h5>{user.user.name.lastName}</h5>
                                <p className='BodyText3'>LAST NAME</p>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="Category__Seperator">
                        <div className="Category__Title">
                            <h4>Institution ID Number</h4>
                            <p className='BodyText3'>Select what mode of payment you want to use</p>
                        </div>
                        <div className="Category__Content">
                            <div className='Wrapper_2_1_Inputs'>
                            <TextField id="outlined-basic" label="ID Number" variant="outlined" />
                            </div>
                        </div>
                    </div>
                    <div className="Category__Seperator">
                        <div className="Category__Title">
                            <h4>Proof of Membership</h4>
                            <p className='BodyText3'>Assuring that you are a member of this institution</p>
                        </div>
                    <div className="Category__Content">
                        <div id='Category__Content__File'>
                        <input type="file" id="files" className="hidden"/>
                        <label htmlFor="files" id='Category__Content__Button'>
                            <img src={UploadFileImage} alt="" />
                            <div>
                                <p className='BodyText3'>Upload any proof of membership</p>
                                <h5>Click to upload a file</h5>
                            </div>
                        </label>
                        </div>
                    </div>
                </div>
                <div id="Holder_Button">
                    <Button variant="contained" size="large" onClick={Join}>Submit</Button>
                </div>
            </form>
        </section>
    )
}

export default InstitutionJoin