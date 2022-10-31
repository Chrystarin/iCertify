import './../../Assets/Styles/style-Navigation.scss';


import React,{useState} from 'react'
import WordMark from './../../Assets/Images/brand/Whitehorizontal.png'

import Modal from '../Modal/Modal.js';
export default function Header() {
    const [isOpen , setIsOpen] = useState(false); 
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
                    <Modal open={isOpen} onClose={() => setIsOpen(false)}/>
                    <li><a href="about.asp" id="GetStarted"> Get Started</a></li>
                </ul>
            </nav>
        </div>
        
    </header>
  )
}



