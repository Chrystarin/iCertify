import React,{useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom";

import './../../styles/Form.scss';
import './UpdatePaymentMethod.scss';

import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { TextField } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import WalletIcon from '@mui/icons-material/Wallet';
// Import Utilities
import axiosInstance from '../../utils/axios';
import { useAuth } from "../../utils/AuthContext";
import UploadFileImage from './../../images/Resources/Design/UploadFile.png'

function DocumentRequestForm() {

    const { user, isAuth, isJoined } = useAuth();
    const { id, docId } = useParams();
    const navigate = useNavigate();

    // Constants Declarations
    const [institution, setInstitution] = useState();
    const [document, setDocument] = useState();

    // Excecutes on page load
    // useEffect(() => {
    //   // Retrieves Institution Data
    //   const fetchInstitution = async () => {
    //     await axiosInstance
    //       .get(`institutions`,{
    //                   params: {
    //                       walletAddress: `${id}`
    //                   }
    //               })
    //       .then((response) => {
    //         setInstitution(response.data)
    //                   function findValue(obj, val) {
    //                       for (let key in obj) {
    //                           if (typeof obj[key] === 'object') {
    //                               const result = findValue(obj[key], val);
    //                               if (result !== undefined) {
    //                               return result;
    //                               }
    //                           } else if (obj[key] === val) {
    //                               return obj;
    //                           }
    //                       }
    //                       return undefined;
    //                   }
    //                   setDocument(findValue(response.data.docOffers, docId))
    //       });
    //   };
		// fetchInstitution();
    // }, [])



  // Stepper
  const [activeStep,setActiveStep] = useState(0);
  function nextStep(){
      if(activeStep !== 2){
        setActiveStep(activeStep+1);
      }
  }
  function backStep(){
    if(activeStep > 0){
      setActiveStep(activeStep-1);
    }
}
  
  function VIEWFORM(){

    const [paymentValue,setPaymentValue] = useState({
      modePayment:"EWallet",
      modePayment_Item:"",
    });

   
    switch (activeStep) {
      
      case 0:
        return <>
          <form className='formTemplate'>
            <div className="Category__Seperator">
              <div className="Category__Title">
                  <h4>Mode of Payement</h4>
                  <p className='BodyText3'>Select mode of payment you want to use</p>
              </div>
              <div className="Category__Content">
                wew
              </div>
            </div>
            
            <div  id='Holder_Button'>
              <Button variant='contained' onClick={nextStep}>Next</Button>
            </div>
            
          </form>
        </>
        break;
      case 1:
        return<>
          <form className='formTemplate'>
            <div className="Category__Seperator">
              <div className="Category__Title">
                <h4>Proof of Payment</h4>
                <p className='BodyText3'>Upload a reciept of payment</p>
              </div>
              <div className="Category__Content">
                <div id='Category__Content__File'>
                  <input type="file" id="files" className="hidden"/>
                  <label htmlFor="files" id='Category__Content__Button'>
                      <img src={UploadFileImage} alt="" />
                      <div>
                          <p className='BodyText3'>Upload any proof of payment</p>
                          <h5>Click to upload a file</h5>
                      </div>
                  </label>
                </div>
              </div>
            </div>
            <div  id='Holder_Button'>
              <Button variant='' onClick={backStep}>Back</Button>
              <Button variant='contained' >Send Request</Button>
            </div>
          </form>
        </>
      default:
          break;
    }
  }

  // if(!institution || !document) return <div>Loading...</div>

  return (
    <section>
      <div id="Stepper">
          <div id="Holder_Stepper">
              <Stepper activeStep={activeStep}>
                  <Step>
                      <StepLabel>Payment Method</StepLabel>
                  </Step>
                  <Step>
                      <StepLabel>Confirmation</StepLabel>
                  </Step>
              </Stepper>
          </div>
      </div>
      <VIEWFORM institution={institution} document={document}/>
  </section>
  )
}

export default DocumentRequestForm