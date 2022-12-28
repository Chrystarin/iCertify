import React from 'react';
import './Footer.scss';
import icertify_footer from '../../images/iCertifyBranding/icertify_footer.png';



import facebookicon from './../../images/icons/SocialMedia/facebook.png';
import emailicon from './../../images/icons/SocialMedia/email.png';
import instagramicon from './../../images/icons/SocialMedia/instagram.png';


function Footer() {
 return(
    <footer>
        <div id="wrapper_Footer">
            <div id="Container_Left_Footer">
                <img src={icertify_footer} alt=""/>
                <h6>Follow us through news letter : </h6>
                <form action="get">
                    <input type="text" name="Email" id="" placeholder="YourEmail@email.com"/>
                    <button>></button>
                </form>
                <h6>©2022 iCertify - Bicol IT</h6>
            </div>
            <div id="Container_Right_Footer">
                <div id="Wrapper_Right_Footer">
                    <div>
                        <h5>Menu</h5>
                        <ul>
                            <li><a href="#About">About</a></li>
                            <li><a href="#FAQ's">FAQ's</a></li>
                            <li><a href="#Login">Login</a></li>
                            <li><a href="#Getstarted">Get Started</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5>Learn More!</h5>
                        <ul>
                            <li><a href="#Blockchain">Blockchain </a></li>
                            <li><a href="#FAQ's">Bicol IT</a></li>
                            <li><a href="#Metamask">Metamask</a></li>
                            <li><a href="#Developer">Developers</a></li>
                            <li><a href="#news">News</a></li>
                            <li><a href="#Terms & Condition">Terms & Condition</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5>Contact us!</h5>
                        <a href="#link"><img src={facebookicon} alt=""/></a>
                        <a href="#link"><img src={emailicon} alt=""/></a>
                        <a href="#link"><img src={instagramicon} alt=""/></a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
 );
}

export default Footer;  