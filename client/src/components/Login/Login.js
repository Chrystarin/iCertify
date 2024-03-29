import React, { useEffect, useState, useRef } from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {ethers} from 'ethers';

import useAuth from '../../hooks/useAuth';

import axios from '../../config/axios';

import './Login.scss';

import Pattern from './../../images/Resources/Pattern1.png';
import UserIcon from './../../images/icons/user.png';
import MetamaskIcon from './../../images/icons/fox.png';
import LockIcon from './../../images/icons/lock.png';
import CloseIcon from './../../images/icons/close.png';

const LOGIN_URL = '/auth';

export default function ModalLogin({open, onClose}) {
    const {setAuth} = useAuth();
    const navigate = useNavigate();
    const [walletAddress, setWalletAddress] = useState("");

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

            // Login with the address and signature
            const response = await axios.post('/members/login',
                JSON.stringify({ type: 'metamask', credentials: [address, signature] }),
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        withCredentials: true
                    }
            })
            .then(response => {
                // const accessToken = response.data.accessToken;
                const user = response.data.walletAddress;
                const roles = response.data.roles;
                // setAuth({user, roles, accessToken});
                console.log(response.data);
                // navigate(`/member/${response.data.walletAddress}`);
                navigate(`/member/${address}`);
                // console.log(response.data);
                // console.log(JSON.stringify(response.data.accessToken));
                // console.log(JSON.stringify(roles));
            });

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
