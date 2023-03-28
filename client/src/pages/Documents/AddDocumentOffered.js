import React,{useState} from 'react'

import './../../styles/Form.scss';

import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { TextField,Avatar } from '@mui/material';
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


  function VIEWFORM(){
    switch (activeStep) {
      case 0:
        return <>
          <form className='formTemplate'>
            <div className="Category__Seperator">
              <div className="Category__Title">
                <h4>Document Details</h4>
                <p className='BodyText3'>Fill up the details of the offered document.</p>
              </div>
              <div className="Category__Content">
                <TextField id="outlined-basic" label="Name" variant="outlined" />
                <TextField id="outlined-basic" label="Description" variant="outlined" multiline/>
                <div className='Wrapper_2_Inputs'>
                  <TextField id="outlined-basic" label="Requirements" variant="outlined" multiline/>
                  <TextField id="outlined-basic" label="Price" variant="outlined" />
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
                    <StepLabel>Add Document Offered</StepLabel>
                  </Step>
              </Stepper>
          </div>
      </div>
      <VIEWFORM />
  </section>
  )
}

export default EventJoin