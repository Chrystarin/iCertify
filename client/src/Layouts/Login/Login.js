import React, { useEffect, useState, useRef, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import {ethers} from 'ethers';

import AuthContext from '../../Context/AuthProvider';
import axios from '../../Api/axios';

import './../../Assets/Styles/Components/style-Modal.scss';
import './../../Assets/Styles/Components/style-login-signup.scss';

import Pattern from './../../Assets/Images/Resources/Pattern1.png';
import UserIcon from './../../Assets/Images/icons/user.png';
import MetamaskIcon from './../../Assets/Images/icons/fox.png';
import LockIcon from './../../Assets/Images/icons/lock.png';
import CloseIcon from './../../Assets/Images/icons/close.png';

const LOGIN_URL = '/auth';

export default function ModalLogin({open, onClose}) {
    const {setAuth} = useContext(AuthContext);

    const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();

    const [walletAddress, setWalletAddress] = useState("");
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        addWalletListener()
    });

    const connectWallet = async () => {
        // Check if metamask is installed
        if(typeof window.ethereum == undefined) {
            window.open("https://metamask.io/download/", '_blank');
            return;
        }

        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            // Get address
            const address = await signer.getAddress();

            // Check if address is already registered
            const { isExisting } = await fetch(`http://localhost:6787/members/${address}/exists`).then(res => res.json());
            if(!isExisting) {
                // Register address
                await fetch(`http://localhost:6787/members/register`, {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ walletAddress: address })
                })
                .then(res => res.json())
                .then(console.log);
            }

            // Get nonce of address
            const { nonce } = await fetch(`http://localhost:6787/members/${address}/nonce`).then(res => res.json());

            // Sign message
            const signature = await signer.signMessage('Nonce: ' + nonce);

            // // Login with the address and signature
            // fetch('http://localhost:6787/members/login', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         withCredentials: true
            //     },
            //     body: JSON.stringify({ type: 'metamask', credentials: [address, signature] })
            // })
            // .then(res => res.json())
            // .then(data => {
            //     // const accessToken = response?.data?.accessToken;
            //     // setAuth({walletAddress, accessToken})

            //     // redirect
            //     navigate(`/member/${data.walletAddress}`);
            //     console.log(data.walletAddress);
            // });

            // Login with the address and signature
            const response = await axios.post('/members/login',
                JSON.stringify({ type: 'metamask', credentials: [address, signature] }),
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        withCredentials: true
                    }
                // body: JSON.stringify({ type: 'metamask', credentials: [address, signature] })
            })
            .then(response => {
                console.log(response.data.walletAddress)
            });
            // .then(data => {
            //     // const accessToken = response?.data?.accessToken;
            //     // setAuth({walletAddress, accessToken})

            //     // redirect
            //     navigate(`/member/${data.walletAddress}`);
            //     console.log(data.walletAddress);
            // });
            
        } catch (err) {
            console.error(err.message);
        }
    };

    const addWalletListener = async () => {
        if(window.ethereum)
            window.ethereum.on("accountsChanged", accounts => setWalletAddress(accounts[0]) );
        else
            setWalletAddress("");
    };


    if (!open) return null;

    return (
        <div id='Modal' >
            <div id="Container_Modal">
                <div className="btnClose">
                    <a onClick={onClose}><img className="imgClose" src={CloseIcon} alt="" /></a>
                </div>
                
                <div className="left">
                    <img className="pattern" src={Pattern} alt=""/>
                </div>
                <div className="right">
                    <h1>Welcome</h1>
                    <form action="" method="get">
                        <img src={UserIcon} className="icon_img" alt=""/>
                        <input type="email" name="" id="" placeholder="Email"/><br/>
                        <img src={LockIcon} className="icon_img" alt=""/>
                        <input type="password" name="" id="" placeholder="Password"/><br/>
                        <button className="btn_login" type="submit">Login</button>
                    </form>
                        <br/>or<br/>
                        <button className="btn_metamask" onClick={() => connectWallet()}><img src={MetamaskIcon} alt="" /><br/>Meta Mask</button>
                        <hr/>
                        <p>Have any trouble?</p>
                        <br/>
                        <button className="btn_learn_wallet">Learn about wallet</button>
                </div>
            </div>
                
        </div>
    )
}
