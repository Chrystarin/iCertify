import React,{useState} from 'react'

import './../../styles/Form.scss';
import './InstitutionJoin.scss';

import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PlaceHolder from '../../images/placeholder/placeholder.png';


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
    Title : "Blockchain Technology 101",
    Certificate: true,
    Price: 400,
    Discount: "None"
  }




  function VIEWFORM(){
    switch (activeStep) {
      case 0:
        return <>
          <form id="EventJoinPayment">
              <div className="Subject_Seperator">
                <div className="holder_Subject">
                    <h3>Mode of Payment</h3>
                    <p>Select what mode of payment you want to use</p>
                </div>
                <div className="holder_Questions">
                  <div className='Wrapper_2_Inputs'>
                    <div id='Payments'>
                      <div id='Payments__Container'>
                        <ul>
                          <li>
                            <a href="#">
                              <h6>GCash</h6>
                            </a>
                          </li>
                          <li>
                            <a href="#" className='Active'>
                              <h6>Bank Transfer</h6>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <h6>
                                ShopeePay
                              </h6>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div id='EventReciept'>
                      <div id='EventReciept__Header'>
                        <div id='ImageHolder__Div'>
                          <img id='Image' src={PlaceHolder} alt="" />
                        </div>
                        <h5 id='EventTitle'>{EventDetails.Title}</h5>
                        <ul>
                          <li>
                            <p>Certificate</p>
                            <p>Have</p>
                          </li>
                          <li>
                            <p>Price</p>
                            <p>500 Pesos</p>
                          </li>
                          <li className='ListSeperator'>
                            <p>Discount</p>
                            <p>50%</p>
                          </li>
                        </ul>
                      </div>
                      <div id='EventReciept__Footer'>
                        <div id='Total'>
                          <p>You Have to Pay</p>
                          <h2>₱<span>250</span>.00</h2>
                        </div>
                        <ReceiptLongIcon sx={{ fontSize: 80 }}/>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div id="Holder_Button">
                {/* <Button variant="outlined">Back</Button>
                <Button variant="text">Save as draft</Button> */}
                <Button variant="contained" endIcon={<NavigateNextIcon/>}>Next</Button>
            </div>
          </form>
        </>
        break;
      default:
          break;
    }
  }

  return (
    <section id='Create_Event'>
      <div id="Stepper">
          <div id="Holder_Stepper">
              <Stepper activeStep={activeStep}>
                  <Step>
                      <StepLabel>Payment</StepLabel>
                  </Step>
              </Stepper>
          </div>
      </div>
      <VIEWFORM />
  </section>
  )
}

export default EventJoin