import './../../Assets/Styles/style-Navigation.scss';


import React,{useState} from 'react'
import WordMark from './../../Assets/Images/brand/Whitehorizontal.png'
import ModalLogin from '../ModalLogin';
import ModalSignup from '../ModalSignup';

export default function Header() {
    const [isOpen , setIsOpen] = useState(false); 
    const [isOpenSignup , setIsOpenSignup] = useState(false); 
  return (
    <header>
        <div id="Wrapper_Header">
            <a href="index.js" id="Home_nav">
                <img src={WordMark} alt=""/>   
            </a>
            <nav>
                <ul>
                    <li><a href="#About">About</a></li>
                    <li><a href="#LearnMore">Learn More!</a></li>
                    <li><a href="#Login" onClick={() => setIsOpen(true)}>Login</a></li>
                    <ModalLogin open={isOpen} onClose={() => setIsOpen(false)}/>
                    <li><a href="#GetStarted" id="GetStarted" onClick={() => setIsOpenSignup(true)}> Get Started</a></li>
                    <ModalSignup open={isOpenSignup} onClose={() => setIsOpenSignup(false)}/>
                </ul>
            </nav>
        </div>
    </header>
  )
}



