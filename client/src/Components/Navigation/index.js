import './../../Assets/Styles/style-Navigation.scss';
import React from 'react'
import WordMark from './../../Assets/Images/brand/icon_wordmark.png'
import iCon from './../../Assets/Images/brand/icon.png'
class Navigation extends React.Component{
    render(){
        return(
            <header>
                <div id="Wrapper_Header">
                    <a href="index.js" id="Home_nav">
                        <img src={WordMark} alt=""/>   
                    </a>
                    <nav>
                        <ul>
                            <li><a href="#About">About</a></li>
                            <li><a href="#LearnMore">Learn More!</a></li>
                            <li><a href="#Login">Login</a></li>
                            <li><a href="about.asp"><img src={iCon} alt=""/></a></li>
                        </ul>
                    </nav>
                </div>
                
            </header>
        );
    }
}

export default Navigation;