import React,{useState} from 'react'

import './../../styles/Form.scss';
import './InstitutionJoin.scss';

import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { TextField,Avatar } from '@mui/material';
import UploadFileImage from './../../images/Resources/Design/UploadFile.png'
function EventJoin() {

  // Stepper
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

  function VIEWFORM(){
    switch (activeStep) {
      case 0:
        return <>
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
                    <h5>Dianne Chrystalin</h5>
                    <p className='BodyText3'>FIRST NAME</p>
                  </div>
                  <div>
                    <h5>Manabat</h5>
                    <p className='BodyText3'>MIDDLE NAME</p>
                  </div>
                  <div>
                    <h5>Brandez</h5>
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
                  <input type="file" id="files" class="hidden"/>
                  <label for="files" id='Category__Content__Button'>
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
              <Button variant="contained" size="large">Submit</Button>
            </div>
          </form>
        </>
        break;
      default:
          break;
    }
  }
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
      <VIEWFORM />



  </section>
  )
}

export default EventJoin