import './../../Assets/Styles/style-LandingPage.scss';
// import IconWordmarkImg from './../../Assets/Images/brand/icon_wordmark.png'
// import IconWalletImg from './../../Assets/Images/icons/wallet.png'
import ImagePlaceHolder from './../../Assets/Images/placeholder/image_placeholder.jpg';



function LandingPage() {
 return(
    <div id='LandingPage'>
        <div id='Container_LandingPage'>
          <div id="Main">
            <div id="Container_Img_Main">
              <div>
                {/* Put the main image */}
              </div>
            </div>
            <div id="Container_Content_Main">
              <div>
                <h2 class="Title">Why you should use   iCertify?</h2>
                <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, quisquam nulla ea aut corporis non iusto! Distinctio minima qui totam?</h5>
                <a href="#home">Learn More!</a>
              </div>
            </div>
          </div>

          {/* Sections  */}

          <div id="Container_Sections">

            {/* Section #1 - What is iCertify*/}
            <section id="Container_Section1">
              <div class="Container_Title_Section">
                <h3 >What is iCertify?</h3>
                <p>Integrating NFT and Blockchain Technology for Academic Credentials Authenticity</p>
              </div>

              <div class="Container_Content_Section">
                <div class="Img_Content_Section1">
                  <img src={ImagePlaceHolder} alt="" />
                </div>
                <div class="Img_Content_Section1">
                  <img src={ImagePlaceHolder} alt="" />
                </div>
                <div class="Img_Content_Section1">
                  <img src={ImagePlaceHolder} alt="" />
                </div>
                <div class="Title_Content_Section1">
                  <div>
                    <h3>Lorem Ipsum</h3>
                    <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex impedit ad voluptatibus fugit ipsam mollitia tempora, vel iusto doloremque, explicabo doloribus illum laborum quo obcaecati.</h5>
                  </div>
                </div>
                <div class="Title_Content_Section1">
                  <div>
                    <h3>Lorem Ipsum</h3>
                    <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex impedit ad voluptatibus fugit ipsam mollitia tempora, vel iusto doloremque, explicabo doloribus illum laborum quo obcaecati.</h5>
                  </div>
                </div>
                <div class="Title_Content_Section1">
                  <div>
                    <h3>Lorem Ipsum</h3>
                    <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex impedit ad voluptatibus fugit ipsam mollitia tempora, vel iusto doloremque, explicabo doloribus illum laborum quo obcaecati.</h5>
                  </div>
                </div>
              </div>
            </section>
           {/* Section #2 - Meet our team */}
            <section id="Container_Section2">
              <div class="Container_Title_Section">
                <h3 >Meet our team</h3>
                <p>Integrating NFT and Blockchain Technology for Academic Credentials Authenticity</p>
              </div>

              <div class="Container_Content_Section">
                
              </div>
            </section>
            {/* Section #3 - Frequently Ask question*/}
            <section id="Container_Section3">
              <div class="Container_Title_Section">
                <h3>Frequently Ask Questions</h3>
                <p></p>
              </div>

              <div class="Container_Content_Section">
                
              </div>
            </section>
          </div>
        </div>
    </div>
 );
}

export default LandingPage;