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

    const { id } = useParams();

    const [open, setOpen] = useState(false);
    const [paymentValue,setPaymentValue] = useState({
      modePayment:"EWallet",
      modePayment_Item:"",
    });
    
    const [institution, setInstitution] = useState();
    const [payments, setPayments] = useState();
    const [form, setForm] = useState({
        type: 'bank',
        typeName: '',
        accountName: '',
        accountNum: '',
        location: '',
        instructions: ''
    });

    // Executes on load
	useEffect(() => {
        fetchInstitution();
	}, []);

    // Retrieves Institution Data
    const fetchInstitution = async () => {
        await axiosInstance
            .get(`institutions`,{
                params: {
                    walletAddress: id
                }
            })
            .then((response) => {
                setInstitution(response.data[0])
                setPayments(response.data[0].payments)
            });
    };
	
    // Retrieves Institution Data
    const addPayment = async () => {
        console.log(form)
        await axiosInstance
            .post(`institutions/payment`,
            {
                type: form.type,
                bankName: form.type == "bank" ? form.typeName : '',
                ewalletName: form.type == "ewallet" ? form.typeName : '',
                otcName: form.type == "otc" ? form.typeName : '',
                accountName: form.accountName,
                accountNumber: form.accountNum,
                location: form.location,
                instructions: form.instructions
            }
            )
            .then((response) => {
                fetchInstitution();
                console.log(response.data)
            });
    };

    // Retrieves Institution Data
    const deletePayment = async (data) => {
        console.log(data)
        await axiosInstance
            .delete(`institutions/payment`,
            {
                data: {
                    paymentId: data
                }
            }
            )
            .then((response) => {
                console.log(response.data)
            });
            fetchInstitution();
    };


    // Updates form from input
	function updateForm(e) {
        return setForm((prev) => {
            const [key, value] = Object.entries(e)[0];
            prev[key] = value;
            console.log(form)
            return prev;
        });
    }


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
  
  if(!institution || !payments) return <div>Loading...</div>

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
                <h4>Available Mode of Payment</h4>
                <p className='BodyText3'>Edit or Add new Payment Method</p>
            </div>
            <div className="Category__Content">
                <div id='ModeOfPayement__Selection'>
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
                {paymentValue.modePayment === "BankTransfer"?<>
                        {payments.length > 0 &&
                            payments.map((payment) => {
                                if(payment.type == 'bank')
                                return (
                                    <li>
                                        <div 
                                        className='ModeOfPayement__ItemSelect__List' 
                                            onClick={()=>setPaymentValue(paymentValue => ({
                                                // Retain the existing values
                                                ...paymentValue,
                                                // update the firstName
                                                modePayment_Item: payment.details
                                            }))} 
                                            id={paymentValue.modePayment_Item.bankName===payment.details.bankName?"Active":""}
                                        >
                                            {payment.details.bankName}
                                        </div>
                                        <IconButton 
                                            aria-label="delete" 
                                            onClick={() => setOpen(true)} 
                                            id={paymentValue.modePayment_Item.bankName===payment.details.bankName?"Active":""}
                                        >  
                                            <EditIcon fontSize="inherit" />
                                        </IconButton>
                                    </li>
                                );
                        })}
                </>:<></>}
                {paymentValue.modePayment === "EWallet"?<>
                        {payments.length > 0 &&
                            payments.map((payment) => {
                                if(payment.type == 'ewallet')
                                return (
                                    <li>
                                        <div className='ModeOfPayement__ItemSelect__List' onClick={()=>setPaymentValue(paymentValue => ({
                                            // Retain the existing values
                                            ...paymentValue,
                                            // update the firstName
                                            modePayment_Item: payment.details
                                            }))} 
                                            id={paymentValue.modePayment_Item.ewalletName===payment.details.ewalletName?"Active":""}
                                        >
                                            {payment.details.ewalletName}
                                        </div>
                                        <IconButton aria-label="delete" onClick={() => setOpen(true)} id={paymentValue.modePayment_Item.ewalletName===payment.details.ewalletName?"Active":""}>  
                                            <EditIcon fontSize="inherit" />
                                        </IconButton>
                                    </li>
                                );
                        })}
                </>:<></>}
                {paymentValue.modePayment === "OverTheCounter"?<>
                        {payments.length > 0 &&
                            payments.map((payment) => {
                                if(payment.type == 'otc')
                                return (
                                    <li>
                                        <div className='ModeOfPayement__ItemSelect__List' onClick={()=>setPaymentValue(paymentValue => ({
                                            // Retain the existing values
                                            ...paymentValue,
                                            // update the firstName
                                            modePayment_Item: payment.details
                                            }))} 
                                            id={paymentValue.modePayment_Item.otcName===payment.details.otcName?"Active":""}
                                        >
                                            {payment.details.otcName}
                                        </div>
                                        <IconButton aria-label="delete" onClick={() => setOpen(true)} id={paymentValue.modePayment_Item.otcName===payment.details.otcName?"Active":""}>  
                                            <EditIcon fontSize="inherit" />
                                        </IconButton>
                                    </li>
                                );
                        })} 
                </>:<></>}
                </ul>
            </div>
            </div>
            {paymentValue.modePayment_Item === ""? <></>:<>
                <div className="Category__Seperator">
                    <div className="Category__Title">
                        <h4>Payment Information</h4>
                        <p className='BodyText3'>Members will use the provided info as reference for payment</p>
                    </div>
                    <div className="Category__Content">
                        {(paymentValue.modePayment=='OverTheCounter') ? 
                            <>
                                <p className='BodyText1'>
                                    Location: {paymentValue.modePayment_Item.location }
                                </p>
                                <p className='BodyText1'>
                                    Instructions: {paymentValue.modePayment_Item.instructions }
                                </p>
                            </>
                            
                        : 
                            <>
                                <p className='BodyText1'>
                                    Account Name: {paymentValue.modePayment_Item.accountName }
                                </p>
                                <p className='BodyText1'>
                                    Account Number: {paymentValue.modePayment_Item.accountNumber }
                                </p>
                            </>
                        }
                    </div>
                </div>
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
    
    function AddPaymentMethod({close}){

        const [modeOfPaymentForm, setModeOfPaymentForm] = useState('');

        const handleChange = (event) => {
            setModeOfPaymentForm(event.target.value);
            updateForm({type: event.target.value})  
        };

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
                        <MenuItem value={"bank"}>Bank Transfer</MenuItem>
                        <MenuItem value={"ewallet"}>E-Wallet</MenuItem>
                        <MenuItem value={"otc"}>Over the counter</MenuItem>
                    </Select>
                </FormControl>
                {(modeOfPaymentForm) ? 
                    <TextField
                        id='outlined-search'
                        label={
                            (modeOfPaymentForm==="bank" ? 'Bank Name' : '') +
                            (modeOfPaymentForm==="ewallet" ? 'E-Wallet Name' : '') +
                            (modeOfPaymentForm==="otc" ? 'Over The Counter Name' : '')
                        }
                        type='text'
                        required
                        onChange={(e) => updateForm({typeName: e.target.value})}
                    />
                :''

                }
                
                </div>
                {(modeOfPaymentForm==="otc" ? 
                
                <>
                    <div id='AddPaymentMethodModal__Instruction__Container'>
                        <TextField
                            id='outlined-search'
                            multiline
                            label='Location'
                            type='text'
                            required
                            minRows={3}
                            onChange={(e) => updateForm({location: e.target.value})}
                        />
                    </div>
                    <div id='AddPaymentMethodModal__Instruction__Container'>
                        <TextField
                            id='outlined-search'
                            multiline
                            label='Instructions'
                            type='text'
                            required
                            minRows={3}
                            onChange={(e) => updateForm({instructions: e.target.value})}
                        />
                    </div>
                </>
                
                
                : 
                
                (modeOfPaymentForm) ?
                <>
                    <div id='AddPaymentMethodModal__Instruction__Container'>
                        <TextField
                            id='outlined-search'
                            label='Account Name'
                            type='text'
                            required
                            minRows={3}
                            onChange={(e) => updateForm({accountName: e.target.value})}
                        />
                    </div>
                    <div id='AddPaymentMethodModal__Instruction__Container'>
                        <TextField
                            id='outlined-search'
                            label='Account Number'
                            type='text'
                            required
                            minRows={3}
                            onChange={(e) => updateForm({accountNum: e.target.value})}
                        />
                    </div>
                </>
                : ''
                
                )}
            
                <div id='AddPaymentMethodModal__Buttons'>
                    <Button variant='contained' id="AddPaymentMethodModal__Cancel" onClick={close}>Cancel</Button>
                    <Button variant='contained' onClick={()=>{addPayment();close()}}>Submit</Button>
                </div>
            </div>
        </>
    }

    function EditPaymentMethod({close, data}){

        const [modeOfPaymentForm, setModeOfPaymentForm] = useState('');
        

        const handleChange = (event) => {
            setModeOfPaymentForm(event.target.value);
            updateForm({type: event.target.value})
        };

        // Finds Specific Value based on Key Value Pair
        function findValue(obj, val) {
            for (let key in obj) {
                if (typeof obj[key] === 'object') {
                    const result = findValue(obj[key], val);
                    if (result !== undefined) {
                    return result;
                    }
                } else if (obj[key] === val) {
                    return obj;
                }
            }
            return undefined;
        }

        console.log(findValue(payments, data.paymentId))
        
        return 
        <>
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
                        <MenuItem value={"bank"}>Bank Transfer</MenuItem>
                        <MenuItem value={"ewallet"}>E-Wallet</MenuItem>
                        <MenuItem value={"otc"}>Over the counter</MenuItem>
                    </Select>
                </FormControl>
                {(modeOfPaymentForm) ? 
                    <TextField
                        id='outlined-search'
                        label={
                            (modeOfPaymentForm==="bank" ? 'Bank Name' : '') +
                            (modeOfPaymentForm==="ewallet" ? 'E-Wallet Name' : '') +
                            (modeOfPaymentForm==="otc" ? 'Over The Counter Name' : '')
                        }
                        type='text'
                        required
                        onChange={(e) => updateForm({typeName: e.target.value})}
                    />
                :''

                }
                
                </div>
                {(modeOfPaymentForm==="otc" ? 
                
                <>
                    <div id='AddPaymentMethodModal__Instruction__Container'>
                        <TextField
                            id='outlined-search'
                            multiline
                            label='Location'
                            type='text'
                            required
                            minRows={3}
                            onChange={(e) => updateForm({location: e.target.value})}
                        />
                    </div>
                    <div id='AddPaymentMethodModal__Instruction__Container'>
                        <TextField
                            id='outlined-search'
                            multiline
                            label='Instructions'
                            type='text'
                            required
                            minRows={3}
                            onChange={(e) => updateForm({instructions: e.target.value})}
                        />
                    </div>
                </>
                
                
                : 
                
                (modeOfPaymentForm) ?
                <>
                    <div id='AddPaymentMethodModal__Instruction__Container'>
                        <TextField
                            id='outlined-search'
                            label='Account Name'
                            type='text'
                            required
                            minRows={3}
                            onChange={(e) => updateForm({accountName: e.target.value})}
                        />
                    </div>
                    <div id='AddPaymentMethodModal__Instruction__Container'>
                        <TextField
                            id='outlined-search'
                            label='Account Number'
                            type='text'
                            required
                            minRows={3}
                            onChange={(e) => updateForm({accountNum: e.target.value})}
                        />
                    </div>
                </>
                : ''
                
                )}
            
                <div id='AddPaymentMethodModal__Buttons'>
                <Button variant='contained' id="AddPaymentMethodModal__Cancel" onClick={close}>Cancel</Button>
                <Button variant='contained' onClick={()=>{addPayment();close()}}>Submit</Button>
                </div>
            </div>
            
            </>
    }
}

export default DocumentRequestForm