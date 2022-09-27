import './../../Assets/Styles/styles.scss';
import IconWordmarkImg from './../../Assets/Images/brand/icon_wordmark.png'
import IconWalletImg from './../../Assets/Images/icons/wallet.png'
import ImagePlaceHolder from './../../Assets/Images/placeholder/placeholder.png'
import BrandFooter from './../../Assets/Images/brand/icertify_footer.png'


function LandingPage() {
  return (
    <div className="LandingPage">
        <body>
            <div class="header">
                <a href="#default" ><img src={IconWordmarkImg} class="logo"/></a>
                <div class="header-right">
                    <a href="#about">About</a>
                    <a href="#blog">Blog</a>  
                    <a href="#faq">FAQ's</a>
                    <a href="" id="myBtn" class="btn_login">Login</a>
                    <a href="#wallet"><img src={IconWalletImg} class="btn_wallet"/></a>
                </div>
            </div>

            <div id="myModal" class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <p>Some text in the Modal..</p>
                </div>
            </div>

            <div class="home-content">
                <div class="home-block">
                    <div class="left-block">
                        <img src = {ImagePlaceHolder} class="image"/>
                    </div>
                    
                    <div class="right-block">
                        <h1>Claim your NFT Certificate!</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida feugiat purus, 
                            eget molestie ex condimentum sit amet. Ut suscipit lacus eu mauris posuere, vitae aliquam 
                            ligula viverra. Maecenas facilisis convallis urna. Aliquam erat volutpat. Pellentesque 
                            fringilla velit odio, vitae pulvinar massa porta ac. Sed luctus tortor sed magna placerat, 
                            at elementum nibh vestibulum. Pellentesque pulvinar orci at est ornare suscipit. Aliquam 
                            sodales turpis arcu, in imperdiet mi imperdiet et. Nam eleifend urna vitae eros ornare, 
                            fermentum efficitur nulla fermentum. Interdum et malesuada fames ac ante ipsum primis in 
                            faucibus.</p>
                        <button class="btn_block_login">Log In</button>
                        <button class="btn_block_signup">Sign Up</button>
                    </div>
                </div>

                <h1 class="title">What is iCertify?</h1>
                

                <div class="home-block">
                    <div class="left-block">
                        <h2>Lorem Ipsum</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida feugiat purus, 
                            eget molestie ex condimentum sit amet. Ut suscipit lacus eu mauris posuere, vitae aliquam 
                            ligula viverra. Maecenas facilisis convallis urna. Aliquam erat volutpat. Pellentesque 
                            fringilla velit odio, vitae pulvinar massa porta ac. Sed luctus tortor sed magna placerat, 
                            at elementum nibh vestibulum. Pellentesque pulvinar orci at est ornare suscipit. Aliquam 
                            sodales turpis arcu, in imperdiet mi imperdiet et. Nam eleifend urna vitae eros ornare, 
                            fermentum efficitur nulla fermentum. Interdum et malesuada fames ac ante ipsum primis in 
                            faucibus.
                        </p>
                    </div>
                    <div class="right-block">
                        <img src = {ImagePlaceHolder} class="image"/>
                    </div>
                </div>  

                <div class="home-block">
                    <div class="left-block">
                        <img src = {ImagePlaceHolder} class="image"/>
                        
                    </div>
                    <div class="right-block">
                        <h2>Lorem Ipsum</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida feugiat purus, 
                            eget molestie ex condimentum sit amet. Ut suscipit lacus eu mauris posuere, vitae aliquam 
                            ligula viverra. Maecenas facilisis convallis urna. Aliquam erat volutpat. Pellentesque 
                            fringilla velit odio, vitae pulvinar massa porta ac. Sed luctus tortor sed magna placerat, 
                            at elementum nibh vestibulum. Pellentesque pulvinar orci at est ornare suscipit. Aliquam 
                            sodales turpis arcu, in imperdiet mi imperdiet et. Nam eleifend urna vitae eros ornare, 
                            fermentum efficitur nulla fermentum. Interdum et malesuada fames ac ante ipsum primis in 
                            faucibus.
                        </p>    
                    </div>
                </div>  

                <div class="home-block">
                    <div class="left-block">
                        <h2>Lorem Ipsum</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida feugiat purus, 
                            eget molestie ex condimentum sit amet. Ut suscipit lacus eu mauris posuere, vitae aliquam 
                            ligula viverra. Maecenas facilisis convallis urna. Aliquam erat volutpat. Pellentesque 
                            fringilla velit odio, vitae pulvinar massa porta ac. Sed luctus tortor sed magna placerat, 
                            at elementum nibh vestibulum. Pellentesque pulvinar orci at est ornare suscipit. Aliquam 
                            sodales turpis arcu, in imperdiet mi imperdiet et. Nam eleifend urna vitae eros ornare, 
                            fermentum efficitur nulla fermentum. Interdum et malesuada fames ac ante ipsum primis in 
                            faucibus.
                        </p>
                    </div>
                    <div class="right-block">
                        <img src = {ImagePlaceHolder} class="image"/>
                    </div>
                </div>  

                <h1 class="title">Frequently Asked Questions</h1>

                <div>
                    <button type="button" class="faq_collapsible"><h2>What is the purpose of iCertify?</h2></button>
                    <div class="faq_content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida feugiat purus, 
                            eget molestie ex condimentum sit amet. Ut suscipit lacus eu mauris posuere, vitae aliquam 
                            ligula viverra. Maecenas facilisis convallis urna. Aliquam erat volutpat. Pellentesque 
                            fringilla velit odio, vitae pulvinar massa porta ac. Sed luctus tortor sed magna placerat, 
                            at elementum nibh vestibulum. Pellentesque pulvinar orci at est ornare suscipit. Aliquam 
                            sodales turpis arcu, in imperdiet mi imperdiet et. Nam eleifend urna vitae eros ornare, 
                            fermentum efficitur nulla fermentum. Interdum et malesuada fames ac ante ipsum primis in 
                            faucibus.
                        </p>
                    </div>

                    <button type="button" class="faq_collapsible"><h2>Who develop iCertify?</h2></button>
                    <div class="faq_content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida feugiat purus, 
                            eget molestie ex condimentum sit amet. Ut suscipit lacus eu mauris posuere, vitae aliquam 
                            ligula viverra. Maecenas facilisis convallis urna. Aliquam erat volutpat. Pellentesque 
                            fringilla velit odio, vitae pulvinar massa porta ac. Sed luctus tortor sed magna placerat, 
                            at elementum nibh vestibulum. Pellentesque pulvinar orci at est ornare suscipit. Aliquam 
                            sodales turpis arcu, in imperdiet mi imperdiet et. Nam eleifend urna vitae eros ornare, 
                            fermentum efficitur nulla fermentum. Interdum et malesuada fames ac ante ipsum primis in 
                            faucibus.
                        </p>
                    </div>

                    <button type="button" class="faq_collapsible"><h2>What are the things you can do with iCertify?</h2></button>
                    <div class="faq_content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida feugiat purus, 
                            eget molestie ex condimentum sit amet. Ut suscipit lacus eu mauris posuere, vitae aliquam 
                            ligula viverra. Maecenas facilisis convallis urna. Aliquam erat volutpat. Pellentesque 
                            fringilla velit odio, vitae pulvinar massa porta ac. Sed luctus tortor sed magna placerat, 
                            at elementum nibh vestibulum. Pellentesque pulvinar orci at est ornare suscipit. Aliquam 
                            sodales turpis arcu, in imperdiet mi imperdiet et. Nam eleifend urna vitae eros ornare, 
                            fermentum efficitur nulla fermentum. Interdum et malesuada fames ac ante ipsum primis in 
                            faucibus.
                        </p>
                    </div>
                </div>


            </div>


        </body>


        <footer>

            <div class="footer_parent">
                <div class="brand">
                    <img src={BrandFooter}/>
                    <br/>Follow us through newsletter!
                    <br/>@2022 iCertify - Bicol IT
                </div>
                <div class="menu">
                    <h2>Menu</h2>
                    <ul>
                        <h3>
                        <li>About</li>
                        <li>Blog</li>
                        <li>FAQ's</li>
                        <li>Login</li>
                        <li>Signup</li>
                    </h3>
                    </ul>
                </div>
                <div class="learnMore">
                    <h2>Learn More</h2>
                    <ul>
                        <h3>
                            <li>Blockchain</li>
                            <li>Bicol IT</li>
                            <li>Blog</li>
                            <li>Certificate</li>
                            <li>Developers</li>
                        </h3>
                    </ul>
                </div>
                <div class="contact">
                    <h2>Contact Us!</h2>
                    <ul>
                        <h3>
                        <li>About</li>
                        <li>Blog</li>
                        <li>FAQ's</li>
                        <li>Login</li>
                        <li>Signup</li>
                    </h3>
                    </ul>
                </div>
            </div>

        </footer>
    </div>
  );
}

export default LandingPage;
