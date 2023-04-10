import React,{useState} from 'react'

import './../../styles/Form.scss';

import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { TextField,Avatar } from '@mui/material';

import axios from '../../utils/axios';

function AddDocumentOffered() {

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
        price: ''
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

    // Add Offered Document
    const AddOfferedDocument = async (e) => {
        e.preventDefault();
        try{

            await axios
                .post(`institutions/offers`, JSON.stringify({
                    title: form.name,
                    description: form.description,
                    price: parseInt(form.price),
                    requirements: form.requirements
                }))
                .then((response) => {
                    console.log(response.data)
                    alert("Document Offer Added!")
                });
        
        } catch (err) {      
            console.error(err.message);
        }
        // console.log("test")
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
                        onChange={(e)=>updateForm({ name: e.target.value })}
                    />
                    <TextField 
                        id="outlined-basic" 
                        label="Description" 
                        variant="outlined" 
                        multiline
                        onChange={(e)=>updateForm({ description: e.target.value })}
                    />
                    <div className='Wrapper_2_Inputs'>
                        <TextField 
                            id="outlined-basic" 
                            label="Requirements" 
                            variant="outlined" 
                            multiline
                            onChange={(e)=>updateForm({ requirements: e.target.value })}
                        />
                        <TextField 
                            id="outlined-basic" 
                            label="Price" 
                            variant="outlined" 
                            onChange={(e)=>updateForm({ price: e.target.value })}
                        />
                    </div>
                </div>
                </div>
                
                <div id="Holder_Button">
                    <Button variant="contained" size="large" onClick={AddOfferedDocument}>Submit</Button>
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

export default AddDocumentOffered