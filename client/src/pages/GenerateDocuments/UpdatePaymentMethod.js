import React,{useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom";

import './../../styles/Form.scss';
import './UpdatePaymentMethod.scss';

import StoreIcon from '@mui/icons-material/Store';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DocumentIcon from '../../images/icons/DocumentIcon.png';
import Button from '@mui/material/Button';
import ThankyouImage from '../../images/Resources/Design/Thankyou.png'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { TextField } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import WalletIcon from '@mui/icons-material/Wallet';
import AddIcon from '@mui/icons-material/Add';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



// Import Utilities
import axiosInstance from '../../utils/axios';
import { useAuth } from "../../utils/AuthContext";
import UploadFileImage from './../../images/Resources/Design/UploadFile.png';
import Modal from '@mui/material/Modal';

function DocumentRequestForm() {

    const { user, isAuth, isJoined } = useAuth();
    const { id, docId } = useParams();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [paymentValue,setPaymentValue] = useState({
      modePayment:"EWallet",
      modePayment_Item:"",
    });
    // Constants Declarations
    const [institution, setInstitution] = useState();
    const [document, setDocument] = useState();

    // Excecutes on page load
    useEffect(() => {
      // Retrieves Institution Data
      const fetchInstitution = async () => {
        // await axiosInstance
        //   .get(`institutions`,{
        //               params: {
        //                   walletAddress: `${id}`
        //               }
        //           })
        //   .then((response) => {
        //     setInstitution(response.data)
        //               function findValue(obj, val) {
        //                   for (let key in obj) {
        //                       if (typeof obj[key] === 'object') {
        //                           const result = findValue(obj[key], val);
        //                           if (result !== undefined) {
        //                           return result;
        //                           }
        //                       } else if (obj[key] === val) {
        //                           return obj;
        //                       }
        //                   }
        //                   return undefined;
        //               }
        //               setDocument(findValue(response.data.docOffers, docId))
        //   });
      };
		fetchInstitution();
    }, [])


    // A function to request selected document
    // const RequestDocument = async () => {
    //     try{
    //         await axiosInstance
    //             .post(`requests`, JSON.stringify({
    //                 type: 'document',
    //                 walletAddress: id,
    //                 docId: docId
    //             }))
    //             .then((response) => {
    //                 console.log(response.data)
    //                 alert("Document Request Sent! Wait for the admin to approve your request")
    //                 setActiveStep(2);
    //             });
        
    //     } catch (err) {      
    //         console.error(err.message);
    //     }
    // }

    // // A function to pay
    // const Payment = async () => {
    //     try{
    //         console.log("Test Paid")
    //         RequestDocument()
        
    //     } catch (err) {      
    //         console.error(err.message);
    //     }
    // }


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
    
    switch (activeStep) {
      case 0:
        return <>
          
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
              <Button variant='contained' onClick={()=>{}}>Send Request</Button>
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
              </Stepper>
          </div>
      </div>



      <div className='formTemplate'>
        <div className="Category__Seperator">
          <div className="Category__Title">
              <h4>Available Mode of Payement</h4>
              <p className='BodyText3'>Edit or Add new Payment Method</p>
          </div>
          <div className="Category__Content">
            <div id='ModeOfPayement__Selection'>
                <div className='ModeOfPayement__Selection__Cards' 
                  onClick={()=>setPaymentValue(paymentValue => ({
                    // Retain the existing values
                    ...paymentValue,
                    // update the firstName
                    modePayment:"EWallet",
                    modePayment_Item:""
                  }))}              
                  id={paymentValue.modePayment==="EWallet"?"Active":""}
                >
                  <WalletIcon/>
                  <p className='BodyText2'>E-Wallet</p>
                </div>
                <div className='ModeOfPayement__Selection__Cards' 
                  onClick={()=>setPaymentValue(paymentValue => ({
                    // Retain the existing values
                    ...paymentValue,
                    // update the firstName
                    modePayment:"BankTransfer",
                    modePayment_Item:""
                  }))}
                  id={paymentValue.modePayment==="BankTransfer"?"Active":""}
                >
                  <AccountBalanceIcon/>
                  <p className='BodyText2'>Bank Transfer</p>
                </div>
                <div className='ModeOfPayement__Selection__Cards' 
                  onClick={()=>setPaymentValue(paymentValue => ({
                    // Retain the existing values
                    ...paymentValue,
                    // update the firstName
                    modePayment:"OverTheCounter",
                    modePayment_Item:""
                  }))}
                  id={paymentValue.modePayment==="OverTheCounter"?"Active":""}
                >
                  <StoreIcon/>
                  <p className='BodyText2'>Over The Counter</p>
                </div>
                <div id='ModeOfPayement__Selection__Add'>
                  <IconButton aria-label="delete" size="large" onClick={() => setOpen(true)}>  
                    <AddIcon fontSize="inherit" />
                  </IconButton>
                </div>
            </div>
            <ul id='ModeOfPayement__ItemSelect__Edit' className='Wrapper__Card'>
              {paymentValue.modePayment === "EWallet"?<>
                <li>
                  <div className='ModeOfPayement__ItemSelect__List' onClick={()=>setPaymentValue(paymentValue => ({
                    // Retain the existing values
                    ...paymentValue,
                    // update the firstName
                    modePayment_Item:"GCash"
                  }))} 
                  id={paymentValue.modePayment_Item==="GCash"?"Active":""}
                  >
                  GCash
                  </div>
                  <IconButton aria-label="delete" onClick={() => setOpen(true)} id={paymentValue.modePayment_Item==="GCash"?"Active":""}>  
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                </li>
                <li>
                  <div className='ModeOfPayement__ItemSelect__List' onClick={()=>setPaymentValue(paymentValue => ({
                    // Retain the existing values
                    ...paymentValue,
                    // update the firstName
                    modePayment_Item:"Paymaya"
                  }))} 
                  id={paymentValue.modePayment_Item==="Paymaya"?"Active":""}
                  >
                  Paymaya

                  </div>
                  <IconButton aria-label="delete" onClick={() => setOpen(true)} id={paymentValue.modePayment_Item==="Paymaya"?"Active":""}>  
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                </li>
              </>:<></>}
              {paymentValue.modePayment === "BankTransfer"?<>
                <li>
                  <div className='ModeOfPayement__ItemSelect__List' onClick={()=>setPaymentValue(paymentValue => ({
                    // Retain the existing values
                    ...paymentValue,
                    // update the firstName
                    modePayment_Item:"BPI"
                  }))} 
                  id={paymentValue.modePayment_Item==="BPI"?"Active":""}
                  >
                  BPI

                  </div>
                  <IconButton aria-label="delete" onClick={() => setOpen(true)} id={paymentValue.modePayment_Item==="BPI"?"Active":""}>  
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                </li>
              </>:<></>}
            </ul>
          </div>
        </div>
        {!(paymentValue.modePayment_Item === "" )|| paymentValue.modePayment === "OverTheCounter"? <>
        
          <div className="Category__Seperator">
            <div className="Category__Title">
                <h4>Payment Instruction</h4>
                <p className='BodyText3'>Follow the instruction to pay</p>
            </div>
            <div className="Category__Content">
                <p className='BodyText1'>
                  Instruction for {paymentValue.modePayment} :  {paymentValue.modePayment_Item}
                </p>
            </div>
          </div>
        
        </>:<>
          
        </>}
        <div  id='Holder_Button'>
          <Button variant='contained' onClick={()=>{}}>Go Back</Button>
        </div>
        
      </div>

      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddPaymentMethod close={()=>setOpen(false)}/>
      </Modal>
    </section>
  )
}

function AddPaymentMethod({close}){
  const [modeOfPaymentForm, setModeOfPaymentForm] = React.useState('');
  const handleChange = (event) => {
    setModeOfPaymentForm(event.target.value);
  };
  const [formValue, setFormValue] = React.useState({

  });
  return <>
    <div id='AddPaymentMethodModal'>
      <h4>Add Payment Method</h4>
      <hr />
      <div className='Wrapper_2_Inputs'>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Mode of Payment</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={modeOfPaymentForm}
            label="Mode of Payment"
            onChange={handleChange}
          >
            <MenuItem value={"EWallet"}>E-Wallet</MenuItem>
            <MenuItem value={30}>Bank Transfer</MenuItem>
            <MenuItem value={20}>Over the counter</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id='outlined-search'
          label='Type Mode of Payment'
          type='text'
          required
        />
      </div>
      <div id='AddPaymentMethodModal__Instruction__Container'>
        <TextField
          id='outlined-search'
          multiline
          label='Instruction'
          type='text'
          required
          minRows={3}
        />
      </div>
      <div id='AddPaymentMethodModal__Buttons'>
        <Button variant='contained' id="AddPaymentMethodModal__Cancel" onClick={close}>Cancel</Button>
        <Button variant='contained' onClick={close}>Submit</Button>
      </div>
    </div>
  
  </>
}
export default DocumentRequestForm