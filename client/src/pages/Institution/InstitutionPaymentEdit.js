import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';

import './InstitutionUpdate.scss';
import './../../styles/Form.scss';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Avatar } from '@mui/material';
import axios from '../../utils/axios';
import Loading from '../../components/Loading/Loading';

import Switch from '@mui/material/Switch';
// Import Utilities
import axiosInstance from '../../utils/axios';
import { useAuth } from "../../utils/AuthContext";

function InstitutionPaymentEdit() {

	const navigate = useNavigate();

	const { id } = useParams();
    const [institution, setInstitution] = useState();
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
                setInstitution(response.data)
                console.log(response.data)
            });
    };
	
    // Retrieves Institution Data
    const addPayment = async () => {
        console.log(form)
        await axiosInstance
            .post(`institutions/payment`,
            {
                type: form.type,
                bankName: form.type == 'bank' ? form.typeName : '',
                ewalletName: form.type == 'ewallet' ? form.typeName : '',
                otcName: form.type == 'otc' ? form.typeName : '',
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

	// Returns if institution is null
	if (!institution) return <Loading/>;

	return (
		<>
            <hr/>
            <h1>Payment Details Edit</h1>
            <hr/>
            <br/>
            <h3>Add Payment Method</h3>
            <div>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Institution Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Payment Method"
                        onChange={(e) => updateForm({type: e.target.value})}
                    >
                        <MenuItem value={"bank"}>Bank</MenuItem>
                        <MenuItem value={"ewallet"}>E-Wallet</MenuItem>
                        <MenuItem value={"otc"}>Over The Counter</MenuItem>
                    </Select>
                </FormControl>
                {form.type == 'bank' ? 
                    <>
                        <h4>Bank Details</h4>
                        <TextField
                            id='outlined-search'
                            label='Bank Name'
                            type='text'
                            onChange={(e) => updateForm({typeName: e.target.value})}
						/>
                        <TextField
                            id='outlined-search'
                            label='Account Name'
                            type='text'
                            onChange={(e) => updateForm({accountName: e.target.value})}
						/>
                        <TextField
                            id='outlined-search'
                            label='Account Number'
                            type='text'
                            onChange={(e) => updateForm({accountNum: e.target.value})}
						/>
                        <Button variant='contained' onClick={()=>addPayment()}>Submit</Button>
                    </>
                : ' '}
                {form.type == 'ewallet' ? 
                    <>
                        <h4>E-Wallet Details</h4>
                        <TextField
                            id='outlined-search'
                            label='E-Wallet Name'
                            type='text'
                            onChange={(e) => updateForm({typeName: e.target.value})}
						/>
                        <TextField
                            id='outlined-search'
                            label='Account Name'
                            type='text'
                            onChange={(e) => updateForm({accountName: e.target.value})}
						/>
                        <TextField
                            id='outlined-search'
                            label='Account Number'
                            type='text'
                            onChange={(e) => updateForm({accountNum: e.target.value})}
						/>
                        <Button variant='contained' onClick={()=>addPayment()}>Submit</Button>
                    </>
                : ' '}
                {form.type == 'otc' ? 
                    <>
                        <h4>Over The Counter Details</h4>
                        <TextField
                            id='outlined-search'
                            label='Over The Counter Name'
                            type='text'
                            onChange={(e) => updateForm({typeName: e.target.value})}
						/>
                        <TextField
                            id='outlined-search'
                            label='Location'
                            type='text'
                            onChange={(e) => updateForm({location: e.target.value})}
						/>
                        <TextField
                            id='outlined-search'
                            label='Instructions'
                            type='text'
                            multiline
                            onChange={(e) => updateForm({instructions: e.target.value})}
						/>
                        <Button variant='contained' onClick={()=>addPayment()}>Submit</Button>
                    </>
                : ' '}
            </div>
            <hr/>
            <div>
                <h3>Available Payment Methods</h3>
                <hr/>
                <h4>[ Banks ]</h4>
                {institution.payments.length > 0 &&
                institution.payments.map((payment) => {
                    if(payment.type === 'bank')
                    return (
                        <>
                            <h5>{payment.details.bankName}</h5>
                            <p>Account Name: {payment.details.accountName}</p>
                            <p>Account Number: {payment.details.accountNumber}</p>
                            <p><button>Edit</button><button onClick={()=>deletePayment(payment.paymentId)}>Delete</button></p>
                        </>
                    );
                })}
                <hr/>
                <h4>[ E-Wallets ]</h4>
                {institution.payments.length > 0 &&
                institution.payments.map((payment) => {
                    if(payment.type === 'ewallet')
                    return (
                        <>
                            <h5>{payment.details.ewalletName}</h5>
                            <p>Account Name: {payment.details.accountName}</p>
                            <p>Account Number: {payment.details.accountNumber}</p>
                            <p><button>Edit</button><button onClick={()=>deletePayment(payment.paymentId)}>Delete</button></p>
                        </>
                    );
                })}
                <hr/>
                <h4>[ Over The Counter ]</h4>
                {institution.payments.length > 0 &&
                institution.payments.map((payment) => {
                    if(payment.type === 'otc')
                    return (
                        <>
                            <h5>{payment.details.otcName}</h5>
                            <p>Location: {payment.details.location}</p>
                            <p>Instructions: {payment.details.instructions}</p>
                            <p><button>Edit</button><button onClick={()=>deletePayment(payment.paymentId)}>Delete</button></p>
                        </>
                    );
                })}
            </div>
        </>
	);
}

export default InstitutionPaymentEdit;
