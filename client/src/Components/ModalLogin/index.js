

import  './../../Assets/Styles/style-Modal.scss';

import React, { Component } from 'react';
import './../../Assets/Styles/style-login-signup.scss';
import Pattern from './../../Assets/Images/Resources/pattern.png';
import UserIcon from './../../Assets/Images/icons/user.png';
import MetamaskIcon from './../../Assets/Images/icons/fox.png';
import LockIcon from './../../Assets/Images/icons/lock.png';
import CloseIcon from './../../Assets/Images/icons/close.png';



export default function ModalLogin({open,onClose}) {
  if (!open) return null
  return (
    <div id='Modal' >
        <div id="Container_Modal">
            <div class="btnClose">
                <a onClick={onClose}><img class="imgClose" src={CloseIcon} alt="" /></a>
            </div>
            
            <div class="left">
                <img class="pattern" src={Pattern} alt=""/>
            </div>
            <div class="right">
                <h1>Welcome</h1>
                <form action="" method="get">
                    <img src={UserIcon} class="icon_img" alt=""/>
                    <input type="email" name="" id="" placeholder="Email"/><br/>
                    <img src={LockIcon} class="icon_img" alt=""/>
                    <input type="password" name="" id="" placeholder="Password"/><br/>
                    <button class="btn_login" type="submit">Login</button>
                    <br/>or<br/>
                    <button class="btn_metamask"><img src={MetamaskIcon} alt="" /><br/>Meta Mask</button>
                    <hr/>
                    <p>Have any trouble?</p>
                    <br/>
                    <button class="btn_learn_wallet">Learn about wallet</button>
                </form>
                
            </div>
                
        </div>
      </div>
    
  )
}
