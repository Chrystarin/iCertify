import React,{useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import { useParams } from "react-router-dom";
import './../../styles/Form.scss';

import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { TextField,Avatar } from '@mui/material';
import Switch from '@mui/material/Switch';
import SnackbarComponent from '../../components/Snackbar/SnackbarComponent';
import axiosInstance from '../../utils/axios';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
function EditDocumentOffered() {

    const navigate = useNavigate();
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));
    const [docOffer, setDocOffer] = useState();

    const [openSnackBar, setOpenSnackBar] = React.useState({
        open:false,
        type:"",
        note:""
    });
    
    // Excecutes on page load
    useEffect(() => {
        fetchDocumentOffer();
    }, [])

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

    const [form, setForm] = useState({
        name: '',
        description: '',
        requirements: '',
        price: '',
        status: ''
    });



    // Retrieves data from text input then assigns to form
    function updateForm(e) {
        return setForm((prev) => {
            const [key, value] = Object.entries(e)[0];
            prev[key] = value;
            console.log(form)
            return prev;
        });
    }

    // Fetch Offered Document
    const fetchDocumentOffer = async () => {
        try{
            await axiosInstance
                .get(`institutions/offers`,{
                    params: {
                        docId: id
                    }
                })
                .then((response) => {
                    console.log(response.data)
                    setForm({
                        name: response.data.title,
                        description: response.data.description,
                        requirements: response.data.requirements,
                        price: response.data.price,
                        status: response.data.status
                    })
                });
        
        } catch (error) {  
            setOpenSnackBar(openSnackBar => ({
                ...openSnackBar,
                open:true,
                type:'error',
                note: error.response.data.message,
            }));    
           
        }
    }

    // Fetch Offered Document
    const editDocumentOffered = async () => {
        try{
            await axiosInstance
                .patch(`institutions/offers`,JSON.stringify({
                    docId: id,
                    title: form.name,
                    description: form.description,
                    price: parseInt(form.price),
                    requirements: form.requirements,
                    status: form.status
                }))
                .then((response) => {
                    console.log(response.data)
                    setOpenSnackBar(openSnackBar => ({
                        ...openSnackBar,
                        open:true,
                        type:'success',
                        note:"Document Updated!",
                    }));
                    navigate(`/institutions/${user.walletAddress}`)
                });
        
        } catch (error) { 
            setOpenSnackBar(openSnackBar => ({
                ...openSnackBar,
                open:true,
                type:'error',
                note:error.response.data.message,
            }));     
            
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
                    <TextField 
                        id="outlined-basic" 
                        label="Name" 
                        variant="outlined" 
                        defaultValue={form.name}
                        onChange={(e)=>updateForm({ name: e.target.value })}
                    />
                    <TextField 
                        id="outlined-basic" 
                        label="Description" 
                        variant="outlined" 
                        multiline
                        defaultValue={form.description}
                        onChange={(e)=>updateForm({ description: e.target.value })}
                    />
                    <div className='Wrapper_2_Inputs'>
                        <TextField 
                            id="outlined-basic" 
                            label="Requirements" 
                            variant="outlined" 
                            multiline
                            defaultValue={form.requirements}
                            onChange={(e)=>updateForm({ requirements: e.target.value })}
                        />
                         <FormControl fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start">₱</InputAdornment>}
                                label="Amount"
                                defaultValue={form.price}
                                onChange={(e)=>updateForm({ price: e.target.value })}
                            />
                        </FormControl>
                        {/* <TextField 
                            id="outlined-basic" 
                            label="Price" 
                            variant="outlined" 
                            defaultValue={form.price}
                            onChange={(e)=>updateForm({ price: e.target.value })}
                        /> */}
                    </div>
                    <div className='Wrapper_2_Inputs'>
                            Active Status
                            <Switch 
                                defaultChecked={form.status==="active"?true:false}
                                onChange={() => {
                                    updateForm({ status: form.status === "active" ? "inactive" : "active" });
                                }}
                            />
                    </div>
                </div>
                </div>
                
                <div id="Holder_Button">
                    <Button variant="contained" size="large" onClick={()=>editDocumentOffered()}>Submit</Button>
                </div>
            </form>
            </>
            break;
        default:
            break;
        }
    }

    if(!form) return <div>Loading...</div>

    console.log(form)

    return (
        <section>
        <div id="Stepper">
            <div id="Holder_Stepper">
                <Stepper activeStep={activeStep}>
                    <Step>
                        <StepLabel>Edit Document Offered</StepLabel>
                    </Step>
                </Stepper>
            </div>
        </div>
        <VIEWFORM />
        <SnackbarComponent open={openSnackBar} setter={setOpenSnackBar}/>
    </section>
    )
}

export default EditDocumentOffered