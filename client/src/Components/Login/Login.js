import  './../../Assets/Styles/style-Modal.scss';
import {useEffect, useState} from 'react';
import React, { Component } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import './../../Assets/Styles/style-login-signup.scss';
import Pattern from './../../Assets/Images/Resources/pattern.png';
import UserIcon from './../../Assets/Images/icons/user.png';
import MetamaskIcon from './../../Assets/Images/icons/fox.png';
import LockIcon from './../../Assets/Images/icons/lock.png';
import CloseIcon from './../../Assets/Images/icons/close.png';

export default function ModalLogin({open,onClose}) {
    const navigate = useNavigate();
    const [walletAddress, setWalletAddress] = useState("");

    useEffect(() => {
      getCurrentWalletConnected();
      addWalletListener();
    }, [walletAddress]);

    const connectWallet = async () => {
      if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
        try {
          /* MetaMask is installed */
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
          return navigate('/dashboard')
        } catch (err) {
          console.error(err.message);
        }
      } else {
        /* MetaMask is not installed */
        window.open("https://metamask.io/download/", '_blank');
      }
    };

    const getCurrentWalletConnected = async () => {
      if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            console.log(accounts[0]);
            return navigate('/dashboard')
          } else {
            console.log("Connect to MetaMask using the Connect button");
          }
        } catch (err) {
          console.error(err.message);
        }
      } else {
        /* MetaMask is not installed */
      }
    };
  
    const addWalletListener = async () => {
      if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
        window.ethereum.on("accountsChanged", (accounts) => {
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
          return navigate('/dashboard')
        });
      } else {
        /* MetaMask is not installed */
        setWalletAddress("");
      }
    };


  if (!open) return null
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
                    <br/>or<br/>
                    <button className="btn_metamask" onClick={() => connectWallet()}><img src={MetamaskIcon} alt="" /><br/>Meta Mask</button>
                    <hr/>
                    <p>Have any trouble?</p>
                    <br/>
                    <button className="btn_learn_wallet">Learn about wallet</button>
                </form>
                
            </div>
                
        </div>
      </div>
    
  )
}
