import React,{useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom";

// Import Stylesheets
import './../../styles/Form.scss';
import './DocumentRequestPayment.scss';


// Import Components
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import WalletIcon from '@mui/icons-material/Wallet';
import DownloadIcon from '@mui/icons-material/Download';
import Loading from '../../components/Loading/Loading';
import SnackbarComponent from '../../components/Snackbar/SnackbarComponent';
// Import Utilities
import axiosInstance from '../../utils/axios';
import { useAuth } from "../../utils/AuthContext";
import UploadFileImage from './../../images/Resources/Design/UploadFile.png'

function DocumentRequestForm() {

    const { reqId } = useParams();
    const navigate = useNavigate();

    // Constants Declarations
    const [institution, setInstitution] = useState();
    const [document, setDocument] = useState();
    const [request, setRequest] = useState();
    const [proofOfPayment, setProofOfPayment] = useState();
    const [openSnackBar, setOpenSnackBar] = React.useState({
        open:false,
        type:"",
        note:""
    });
    // Excecutes on page load
    useEffect(() => {
        fetchDocumentRequests();
    }, [])

    // Retrieves Document Requests
    const fetchDocumentRequests = async () => {
        await axiosInstance
            .get(`requests`,{
                params: {
                    requestType: 'document',
                    requestId: reqId
                }
            })
            .then((response) => { 
                setRequest(response.data)
            });
    };

    const PayDocument = async () => {
        try {
            const formData = new FormData();
            formData.append('proof', proofOfPayment);
            // formData.append('body', JSON.stringify({
            //     requestId: reqId,
            //     status: 'paid',
            // }))

            formData.append(requestId, reqId)
            formData.append(status, 'paid')
                
            await axiosInstance.patch(
                `requests`,
                formData,
                {headers: {
                    'Content-Type': 'multipart/form-data'
                }}
            )
            .then((response)=>{
                // setOpenSnackBar(openSnackBar => ({
                //     ...openSnackBar,
                //     open:true,
                //     type:'success',
                //     note:`Document Paid!`,
                //     action: ()=>{
                //         navigate("/requests")

                //     }
                // }));
                navigate("/requests");
                console.log(response.data)
            })
        } catch (err) {      
            console.error(err.message);
        }
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
    function VIEWFORM({payments}){

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
                        <h4>Mode of Payment</h4>
                        <p className='BodyText3'>Select mode of payment you want to use</p>
                    </div>
                    <div className="Category__Content">
                        <div id='ModeOfPayement__Selection'>

                            <div 
                                className='ModeOfPayement__Selection__Cards' 
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

                            <div 
                                className='ModeOfPayement__Selection__Cards' 
                                onClick={()=>setPaymentValue(paymentValue => ({
                                    // Retain the existing values
                                    ...paymentValue,
                                    // update the firstName
                                    modePayment:"OverTheCounter",
                                    modePayment_Item:""
                                }))}
                                id={paymentValue.modePayment==="OverTheCounter"?"Active":""}
                            >
                                <AccountBalanceIcon/>
                                <p className='BodyText2'>Over The Counter</p>
                            </div>

                        </div>
                        <ul id='ModeOfPayement__ItemSelect' className='Wrapper_'>
                            
                            {paymentValue.modePayment === "BankTransfer"?<>
                                {payments.length > 0 &&
                                    payments.map((payment) => {
                                        if(payment.type == 'bank')
                                        return (
                                            <li 
                                                onClick={()=>setPaymentValue(paymentValue => ({
                                                    // Retain the existing values
                                                    ...paymentValue,
                                                    // update the firstName
                                                    modePayment_Item: payment.details
                                                }))} 
                                                id={paymentValue.modePayment_Item===payment.details.bankName?"Active":""}
                                            >
                                                {payment.details.bankName}
                                            </li>
                                        );
                                })}
                            </>:<></>}
                            {paymentValue.modePayment === "EWallet"?<>
                                {payments.length > 0 &&
                                    payments.map((payment) => {
                                        if(payment.type == 'ewallet')
                                        return (
                                            <li 
                                                onClick={()=>setPaymentValue(paymentValue => ({
                                                    // Retain the existing values
                                                    ...paymentValue,
                                                    // update the firstName
                                                    modePayment_Item: payment.details
                                                }))} 
                                                id={paymentValue.modePayment_Item===payment.details.ewalletName?"Active":""}
                                            >
                                                {payment.details.ewalletName}
                                            </li>
                                        );
                                })}
                            </>:<></>}
                            {paymentValue.modePayment === "OverTheCounter"?<>
                                {payments.length > 0 &&
                                    payments.map((payment) => {
                                        if(payment.type == 'otc')
                                        return (
                                            <li 
                                                onClick={()=>setPaymentValue(paymentValue => ({
                                                    // Retain the existing values
                                                    ...paymentValue,
                                                    // update the firstName
                                                    modePayment_Item: payment.details
                                                }))} 
                                                id={paymentValue.modePayment_Item===payment.details.otcName?"Active":""}
                                            >
                                                {payment.details.otcName}
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
                                <p className='BodyText3'>Use the provided info as reference for payment</p>
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
                { (!proofOfPayment)?
                    <div className="Category__Content">
                        <div id='Category__Content__File'>
                            <input type="file" id="files"  accept="image/png, image/jpeg"  className="hidden" onChange={(e)=>setProofOfPayment(e.target.files[0])}/>
                            <label htmlFor="files" id='Category__Content__Button'>
                                <img src={UploadFileImage} alt="" />
                                <div>
                                    <p className='BodyText3'>Upload any proof of payment</p>
                                    <h5>Click to upload a file</h5>
                                </div>
                            </label>
                        </div>
                    </div>
                :
                    <div className="Category__Content">
                        <div id='UploadAgain' >
                            <input type="file" id="files"  accept="image/png, image/jpeg"  className="hidden" onChange={(e)=>setProofOfPayment(e.target.files[0])}/>
                            <label htmlFor="files" id='file' >
                                <DownloadIcon/>
                                <h6>Upload Another</h6>
                            </label>
                        </div>
                        <div id='proofOfPayement'>
                            {proofOfPayment && <img src={URL.createObjectURL(proofOfPayment)} alt="uploaded" id='CreateDocument__Image'/>}
                            {/* <img src={proofOfPayment} alt="uploaded" id='CreateDocument__Image'/> */}
                        </div>
                        
                    </div>
                }
                </div>
                <div  id='Holder_Button'>
                <Button variant='' onClick={backStep}>Back</Button>
                <Button variant='contained' onClick={()=>{
                    setOpenSnackBar(openSnackBar => ({
                        ...openSnackBar,
                        open:true,
                        type:'info',
                        note:`Payment is sending...!`,
                        action: ()=>{
                            // navigate("/requests")
                        }
                    }));
                    PayDocument();
                    
                    }}>Send Request</Button>
                </div>
            </form>
            </>
        default:
            break;
        }
    }
  
    if(!request) return <Loading/>

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
        <VIEWFORM institution={institution} document={document} payments={request.institution.payments}/>
        <SnackbarComponent open={openSnackBar} setter={setOpenSnackBar}/>
    </section>
    )

    
}

export default DocumentRequestForm