import  './../../Assets/Styles/style-Modal.scss';
import {useState} from 'react';

import React, { Component } from 'react';
import './../../Assets/Styles/style-login-signup.scss';
import Pattern from './../../Assets/Images/Resources/pattern.png';
import MetamaskIcon from './../../Assets/Images/icons/fox.png';
import CloseIcon from './../../Assets/Images/icons/close.png';
import iCertifyWordmark from './../../Assets/Images/brand/wordmark.png';
import ImgPlaceholder from './../../Assets/Images/placeholder/placeholder.png';
import TextField from '@mui/material/TextField';

import {Routes, Route, useNavigate} from 'react-router-dom';

export default function ModalSignup({open,onClose}) {

    const [step1, setStep1] = useState(true);
    const [step2, setStep2] = useState(false);
    const [step3, setStep3] = useState(false);
    const [step4, setStep4] = useState(false);

    const [step, setStep] = useState([true,false,false,false]);

    const navigate = useNavigate();

    const nextStep = (state) =>{
        const newStep = step.slice();
        
        if (state<4){
            newStep[state-1] = false;
            newStep[state] = true;
        }
        else {
            navigate('/dashboard');
        }
        setStep(newStep);  
    }

    const prevStep = (state) =>{
        const newStep = step.slice();

        newStep[state-1] = true;
        newStep[state] = false;
        
        setStep(newStep);  
    }

    const reset = () => {
        setStep([true, false, false, false]);
    };

    const metamaskFunction = () =>{
        if(window.ethereum){
            alert("Metamask Detected")
            window.ethereum.request({method:'eth_requestAccounts'})
            .then(res=>{
                    // Return the address of the wallet
                    console.log(res) 
            })
        }
        else{
            window.open("https://metamask.io/download/", '_blank');
        }
    }

    if (!open) return null

    return (
        <div id='Modal' >
            <div id="Container_Modal">
                <div class="btnClose">
                    <a onClick={onClose}><img class="imgClose" src={CloseIcon} alt="" onClick={reset}/></a>
                </div>
                
                <div class="left">
                    <img class="pattern" src={Pattern} alt=""/>
                </div>
                <div class="right">
                    <div class="container">
                        
                        <ul class="progressbar">
                            <li className={step[0] ? 'active' : ''}></li>
                            <li className={step[1] ? 'active' : ''}></li>
                            <li className={step[2] ? 'active' : ''}></li>
                            <li className={step[3] ? 'active' : ''}></li>
                        </ul>

                    </div>
                    <div class="Step1"
                        style={{
                            display: step[0] ? 'block' : 'none',
                        }}
                    >
                        <h4>Welcome to</h4>
                        <img class="wordmark" src={iCertifyWordmark} alt="" width="70%"/>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ex mi, varius quis sapien ut, fermentum commodo massa. Etiam tempor dolor turpis, quis commodo velit malesuada quis.</p>
                        
                    </div>
                    <button class="btnNext" type="submit" onClick={() => nextStep(1)}>Next</button>
                    

                    <div class="Step2"
                        style={{
                            display: step[1] ? 'block' : 'none',
                        }}
                    >
                        <h4><span class="blueHighlight">Create</span> & <span class="blueHighlight">Connect</span> your Metamask</h4>
                        <p>It will be your wallet to store your credentials</p>

                        <div class="createAndSetup">
                            <h5>Create & Setup</h5>
                            <hr />
                        <button class="btn_metamask" onClick={metamaskFunction}>
                            <img src={MetamaskIcon} alt="" /><br/>Meta Mask
                        </button>
                        </div>
                        
                        <button class="btnNext" type="submit" onClick={() => nextStep(2)}>Next</button>
                        <button class="btnBack" type="submit" onClick={() => prevStep(1)}>Back</button>
                    </div>
                    <div class="Step3"
                        style={{
                            display: step[2] ? 'block' : 'none',
                        }}
                    >
                        <h4><span class="blueHighlight">Setup</span> your profile details</h4>
                        <p>This will contain your basic personal information</p>
                        <form action="" method="get">
                            <TextField label="First Name" variant="standard" />
                            <TextField label="Last Name" variant="standard"/>
                            <TextField label="Email" variant="standard"/>
                            <TextField label="Code" variant="standard"/>
                            <button href="#" class="btnSendCode" onclick="location.href='#';">Send Code</button><br/>
                            <TextField label="Password" variant="standard" type="password" helperText=""/>
                            <TextField label="Confirm Password" variant="standard" type="password"/>
                            
                        </form>
                        <button class="btnNext" type="submit" onClick={() => nextStep(3)}>Next</button>
                        <button class="btnBack" type="submit" onClick={() => prevStep(2)}>Back</button>
                    </div>
                    <div class="Step4"
                        style={{
                            display: step[3] ? 'block' : 'none',
                        }}
                    >
                        <h4><span class="blueHighlight">Join</span> events & get certified</h4>
                        <p>Browse into our collection of events!</p>
                        <img src={ImgPlaceholder} alt="" width="70%"/>
                        <button class="btnNext" type="submit" onClick={() => nextStep(4)}>Begin</button>
                        <button class="btnBack" type="submit" onClick={() => prevStep(3)}>Back</button>
                    </div>
                    
                </div>
                    
            </div>
        </div>
    
  )
}
