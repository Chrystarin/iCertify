import React,{useState} from 'react'

import './../../styles/Form.scss';
import './DocumentRequestForm.scss';

import DocumentIcon from '../../images/icons/DocumentIcon.png';
import Button from '@mui/material/Button';
import ThankyouImage from '../../images/Resources/Design/Thankyou.png'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { TextField } from '@mui/material';

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
    const DocumentInformation = {
      title:"Transcript of Record",description:"Document that lists all the courses taken by a student and the grades or marks earned in each course, usually issued by the institution attended. It serves as an official record of the student's academic history.",requirements:"Student Graduate, Identification, and Signature ",price:"500"
    }
    switch (activeStep) {
      case 0:
        return <>
          <form className='formTemplate'>
            <div id='DocumentInformation'>
              <div id='DocumentInformation__Header'>
                <div id='DocumentInformation__Header__Triangle'>
                </div>
                <img src={DocumentIcon} alt="" />
              </div>
              <div id='DocumentInformation__Body'>
                <h3 id='DocumentInformation__Title'>{DocumentInformation.title}</h3>
                <div id='DocumentInformation__Details'>
                  <ul>
                    <li>
                      <h6 className='DocumentInformation__Details__Title'>Description</h6>
                      <p className='DocumentInformation__Details__Value'>{DocumentInformation.description}</p>
                    </li>
                    <li>
                      <h6 className='DocumentInformation__Details__Title'>Requirements</h6>
                      <p  className='DocumentInformation__Details__Value'>{DocumentInformation.requirements}</p>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <h6 className='DocumentInformation__Details__Title'>Price</h6>
                      <h5 className='DocumentInformation__Details__Value__Price'>{DocumentInformation.price}</h5>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div id="Holder_Button">
              <Button variant="contained" onClick={nextStep}>Next</Button>
            </div>
          </form>
        </>
        break;
      case 1:
        return <>
          <form className='formTemplate'>
            <div className="Category__Seperator">
              <div className="Category__Title">
                  <h4>Mode of Payement</h4>
                  <p className='BodyText3'>Select mode of payment you want to use</p>
              </div>
              <div className="Category__Content">
                <div id='ModeOfPayement' className='Wrapper_2_Inputs'>
                  <div id='ModeOfPayement__Selection'>
                    <div id='ModeOfPayement__Selection__List'>
                      <div id='ModeOfPayement__Selection__Cards' className='active'>GCash</div>
                      <div id='ModeOfPayement__Selection__Cards'>Bank Transfer</div>
                      <div></div>
                    </div>
                    <Button variant='contained'>Pay Now</Button>
                  </div>
                  
                </div>
              </div>
            </div>
            <div id="Holder_Button">
              <Button variant="outlined" onClick={backStep} size="Large">Back</Button>
              <Button variant="contained" onClick={nextStep} size="Large">Next</Button>
            </div>
          </form>
        </>
        break;

      case 2:
        return<>
          <div id='Confirmation'>
            <div id='Confirmation__Container'>
              <img src={ThankyouImage} alt="" />
              <div>
                <h5>Request has been sent,  Thank you for requesting a document !</h5>
                <p>We will update you sooner.</p>
              </div>
              <Button variant='contained'>Continue</Button>
            </div>
          </div>
        
        </>
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
                      <StepLabel>Document Information</StepLabel>
                  </Step>
                  <Step>
                      <StepLabel>Payment Method</StepLabel>
                  </Step>
                  <Step>
                      <StepLabel>Confirmation</StepLabel>
                  </Step>
              </Stepper>
          </div>
      </div>
      <VIEWFORM />
  </section>
  )
}

export default EventJoin