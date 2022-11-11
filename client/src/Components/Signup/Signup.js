import React, { Component } from 'react';
import {useState} from 'react';

import  './../../Assets/Styles/style-Modal.scss';
import './../../Assets/Styles/style-login-signup.scss';
import Pattern from './../../Assets/Images/Resources/pattern.png';
import MetamaskIcon from './../../Assets/Images/icons/fox.png';
import CloseIcon from './../../Assets/Images/icons/close.png';
import iCertifyWordmark from './../../Assets/Images/brand/wordmark.png';
import ImgPlaceholder from './../../Assets/Images/placeholder/placeholder.png';
import TextField from '@mui/material/TextField';

import {Routes, Route, useNavigate} from 'react-router-dom';

export default function ModalSignup({open,onClose}) {
    
    const navigate = useNavigate();
    const [step, setStep] = useState([true,false,false,false]);
    
    const [walletAddress, setWalletAddress] = useState("");

    const[firstName, setFirstName] = useState('')
    const[lastName, setLastName] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    

    const handleSubmit = async (e) =>{
        
        e.preventDefault()
        console.log(firstName, lastName, email, password)
        nextStep(3);

    }

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

    const loginWallet = () =>{
        if(window.ethereum){
            alert("Metamask Detected")
            window.ethereum.request({method:'eth_requestAccounts'})
            .then(res=>{
                    // Return the address of the wallet
                    // setUserAccount(acc[0])
                    setWalletAddress(res);
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
                <div className="btnClose">
                    <a onClick={onClose}><img className="imgClose" src={CloseIcon} alt="" onClick={reset}/></a>
                </div>
                
                <div className="left">
                    <img className="pattern" src={Pattern} alt=""/>
                </div>
                <div className="right">
                    <div className="container">
                        
                        <ul className="progressbar">
                            <li className={step[0] ? 'active' : ''}></li>
                            <li className={step[1] ? 'active' : ''}></li>
                            <li className={step[2] ? 'active' : ''}></li>
                            <li className={step[3] ? 'active' : ''}></li>
                        </ul>

                    </div>
                    <div className="Step1"
                        style={{
                            display: step[0] ? 'block' : 'none',
                        }}
                    >
                        <h4>Welcome to</h4>
                        <img className="wordmark" src={iCertifyWordmark} alt="" width="70%"/>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ex mi, varius quis sapien ut, fermentum commodo massa. Etiam tempor dolor turpis, quis commodo velit malesuada quis.</p>
                        
                    </div>
                    <button className="btnNext" type="submit" onClick={() => nextStep(1)}>Next</button>
                    

                    <div className="Step2"
                        style={{
                            display: step[1] ? 'block' : 'none',
                        }}
                    >
                        <h4><span className="blueHighlight">Create</span> & <span className="blueHighlight">Connect</span> your Metamask</h4>
                        <p>It will be your wallet to store your credentials</p>

                        <div className="createAndSetup">
                            <h5>Create & Setup</h5>
                            <hr />
                            {
                                walletAddress.length>0
                                    ? 'Connected: ${walletAddress}'
                                    :  "Connect Wallet"
                            }
                            <br/>
                        <button className="btn_metamask" onClick={loginWallet}>
                            <img src={MetamaskIcon} alt="" /><br/>Meta Mask
                        </button>
                        </div>
                        
                        <button className="btnNext" type="submit" onClick={() => nextStep(2)}>Next</button>
                        <button className="btnBack" type="submit" onClick={() => prevStep(1)}>Back</button>
                    </div>
                    <div className="Step3"
                        style={{
                            display: step[2] ? 'block' : 'none',
                        }}
                    >
                        <h4><span className="blueHighlight">Setup</span> your profile details</h4>
                        <p>This will contain your basic personal information</p>
                        <form action="" method="get">
                            <TextField label="First Name" variant="standard"
                                onChange={(e)=>setFirstName(e.target.value)} value={firstName}
                            />
                            <TextField label="Last Name" variant="standard"
                                onChange={(e)=>setLastName(e.target.value)} value={lastName}
                            />
                            <TextField label="Email" variant="standard"
                                onChange={(e)=>setEmail(e.target.value)} value={email}
                            />
                            <TextField label="Code" variant="standard"
                                
                            />
                            <button href="#" className="btnSendCode">Send Code</button><br/>
                            <TextField label="Password" variant="standard" type="password" helperText=""
                                onChange={(e)=>setPassword(e.target.value)} value={password}
                            />
                            <TextField label="Confirm Password" variant="standard" type="password"/>
                            
                        </form>
                        {/* <button className="btnNext" type="submit" onClick={() => nextStep(3)}>Next</button> */}
                        <button className="btnNext" type="submit" onClick={handleSubmit}>Next</button>
                        <button className="btnBack" type="submit" onClick={() => prevStep(2)}>Back</button>
                    </div>
                    <div className="Step4"
                        style={{
                            display: step[3] ? 'block' : 'none',
                        }}
                    >
                        <h4><span className="blueHighlight">Join</span> events & get certified</h4>
                        <p>Browse into our collection of events!</p>
                        <img src={ImgPlaceholder} alt="" width="70%"/>
                        <button className="btnNext" type="submit" onClick={() => nextStep(4)}>Begin</button>
                        <button className="btnBack" type="submit" onClick={() => prevStep(3)}>Back</button>
                    </div>
                    
                </div>
                    
            </div>
        </div>
    
  )
}
