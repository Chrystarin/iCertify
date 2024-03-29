import React,{useEffect, useState} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {ethers} from 'ethers';

import useAuth from '../../hooks/useAuth';

import axios from '../../config/axios';

import './GetStarted.scss'

import logo from '../../images/iCertifyBranding/icertify_footer.png';
import Certificate from '../../images/Resources/Certificate.png';
import MetamaskImg from '../../images/Resources/Metamask.png';

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Signup() {
    // Constant Declarations
    const navigate = useNavigate();
    const [walletAddress, setWalletAddress] = useState('');
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        middleName: '',
        lastName: ''
    });

    // Retrieves data from text input then assigns to form
    function updateForm(e) {
        return setUserInfo((prev) => {
            const [key, value] = Object.entries(e)[0];
            prev[key] = value;
            return prev;
        
    });}

    // On Load Function
    useEffect(() => {
        addWalletListener();
    });

    // Connects Wallet Function
    const connectWallet = async (e) => {
        e.preventDefault();

      // Check if metamask is installed
        if (typeof window.ethereum == undefined) {
            window.open('https://metamask.io/download/', '_blank');
            return;
        }

        try {
            // Requests Metamask
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            // Get address
            const address = await signer.getAddress();
            
            // Check if address is already registered
            const { isExisting } = (
                await axios.get(`members/${address}/exists`)
            ).data;

            // Executes if address does not exist in database	
            if (isExisting) {
                alert("You already have an account!");
                navigate('/');
            } else{
                // Register address
                await axios.post(
                    `members/register`,
                    JSON.stringify({ 
                        walletAddress: address, 
                        name: {
                            firstName: userInfo.firstName,
                            middleName: userInfo.middleName,
                            lastName: userInfo.lastName
                        }
                    }),
                    {
                        headers: { 'Content-Type': 'application/json' }
                    }
                )

                // Get nonce of address
                const { nonce } = (await axios.get(`members/${address}/nonce`))
                .data;

                // Sign message
                const signature = await signer.signMessage('Nonce: ' + nonce);

                // Login with the address and signature
                const response = await axios
                .post(
                    '/members/login',
                    JSON.stringify({
                        walletAddress: address,
                        signature
                    }),
                    {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        withCredentials: true
                    }
                    }
                )
                .then((response) => {
                    navigate(`/m/${address}`);
                });
                }
            
        } catch (err) {
                console.error(err.message);
        }
    }
    

    const addWalletListener = async () => {
        if (window.ethereum)
            window.ethereum.on('accountsChanged', (accounts) =>
                setWalletAddress(accounts[0])
            );
        else setWalletAddress('');
    };

    return (
        <div id='Signup'>
            <div id='Container_Signup'>
                <div id='Container_Signup_Content'>
                    <a id='Holder_GoBack_Button' href='/'>
                        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.94 24.23"><defs><style></style></defs><g id="Path_382" data-name="Path 382"><polygon className="cls-1" points="12.11 24.23 0 12.11 12.11 0 14.94 2.83 5.66 12.11 14.94 21.4 12.11 24.23"/></g></svg>
                        <h5>Go back to Home</h5>
                    </a>
                    <div id='Container_Welcome'>
                        <h2>WELCOME TO</h2>
                        <img src={logo} alt="" id='LogoImg'/>
                    </div>
                    <h6>We provide online digital certificates through implementing NFT and Blockchain technology to ensure both employees and employers that their certificates are authentic and free from falsification.</h6>
                    <img id='Certificate' src={Certificate} alt="" />
                </div>
                <div id='Container_Signup_Panel'>
                    <div id='Container_Signup_Form'>
                        <div id='Form1' className={"Active"}>
                            <h1>Get Started</h1>
                            <h4><span>Setup</span> your profile and <span>Connect</span> your wallet </h4>
                            <form onSubmit={connectWallet}>
                                {/* <div id='Wrapper_Name'>
                                    <TextField 
                                        id="outlined-search" 
                                        label="Firstname" 
                                        type="text" 
                                        onChange={(e)=>updateForm({ firstName: e.target.value })}
                                    />
                                    <TextField 
                                        id="outlined-search" 
                                        label="Lastname" 
                                        type="text" 
                                        onChange={(e)=>updateForm({ lastName: e.target.value })}
                                    />
                                </div> */}
                                <TextField 
                                        id="outlined-search" 
                                        label="First Name" 
                                        type="text" 
                                        onChange={(e)=>updateForm({ firstName: e.target.value })}
                                />
                                <TextField 
                                        id="outlined-search" 
                                        label="Middle Name" 
                                        type="text" 
                                        onChange={(e)=>updateForm({ middleName: e.target.value })}
                                />
                                <TextField 
                                        id="outlined-search" 
                                        label="Last Name" 
                                        type="text" 
                                        onChange={(e)=>updateForm({ lastName: e.target.value })}
                                />
                                <input id='Submit' type="submit" value="Connect" />
                            </form>            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup