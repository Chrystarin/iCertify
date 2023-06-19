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
                <h6>© 2023 iCertify</h6>
            </div>
            <div id="Container_Right_Footer">
                <div id="Wrapper_Right_Footer">
                    <div>
                        
                    </div>
                    <div>
                        <h5>Menu</h5>
                        <ul>
                            
                            <li><a href="#Login">Login to metamask</a></li>
                            <li><a href="#Getstarted">Get Started</a></li>
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