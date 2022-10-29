import './../../Assets/Styles/styles.scss';
import IconWordmarkImg from './../../Assets/Images/brand/icon_wordmark.png'
import IconWalletImg from './../../Assets/Images/icons/wallet.png'
import ImagePlaceHolder from './../../Assets/Images/placeholder/placeholder.png'



function LandingPage() {
  return (
    <div id="LandingPage">
        <div id="MainSection_Container">
            <div id="MainSection_Media_Base">
                <img src={ImagePlaceHolder} alt=""/>
            </div>
            <div id="MainSection_Content_Base">
                <h1>Lorem Ipsum</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed a, doloremque laudantium accusantium facilis, mollitia obcaecati perspiciatis officia, quam magni dolor asperiores possimus quis odio qui delectus ea quaerat quos at. Perspiciatis quod, delectus rerum libero tempore quas fugit quis vitae obcaecati earum iste facere, quisquam amet inventore deleniti voluptas</p>
                <div>
                    <input type="button" value="Login"/>
                </div>
            </div>
        </div>
        <div id="Container_Section1" class="Sections">
            <div class="Container_Title_Sections">
                <h3>What is iCertify</h3>
                <h5>Integrating NFT and Blockchain Technology for Academic Credential Authenticity</h5>
            </div>
            <div id="Container_Content_Section1">
                <div class="Wrapper_Text_Section1">
                    <div>
                        <h3>Lorem Ipsum</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, harum optio. Totam doloribus inventore rerum, at ab delectus quo non cum, obcaecati ratione voluptatibus nesciunt odit? Exercitationem officia odio libero nostrum autem fugit iste quisquam quaerat, minus asperiores et non culpa cupiditate aliquid in nisi repellat adipisci impedit optio! Praesentium illo error assumenda non dolor alias ex vel architecto iste.</p>
                    </div>    
                </div>
                <div class="Wrapper_Text_Section1">
                    <div>
                        <h3>Lorem Ipsum</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, harum optio. Totam doloribus inventore rerum, at ab delectus quo non cum, obcaecati ratione voluptatibus nesciunt odit? Exercitationem officia odio libero nostrum autem fugit iste quisquam quaerat, minus asperiores et non culpa cupiditate aliquid in nisi repellat adipisci impedit optio! Praesentium illo error assumenda non dolor alias ex vel architecto iste.</p>
                    </div>    
                </div>
                <div class="Wrapper_Text_Section1">
                    <div>
                        <h3>Lorem Ipsum</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, harum optio. Totam doloribus inventore rerum, at ab delectus quo non cum, obcaecati ratione voluptatibus nesciunt odit? Exercitationem officia odio libero nostrum autem fugit iste quisquam quaerat, minus asperiores et non culpa cupiditate aliquid in nisi repellat adipisci impedit optio! Praesentium illo error assumenda non dolor alias ex vel architecto iste.</p>
                    </div>    
                </div>
                <div><img src={ImagePlaceHolder} alt=""/></div>
                <div><img src={ImagePlaceHolder} alt=""/></div>
                <div><img src={ImagePlaceHolder} alt=""/></div>
            </div>
            
        </div>
        <div id="Container_Section2" class="Sections">
            <div class="Container_Title_Sections">
                <h3>OUR TEAM</h3>
                <h5>Integrating NFT and Blockchain Technology for Academic Credential Authenticity</h5>
            </div>
            <div id="Container_Content_Section2">
                <div>
                    <img src={ImagePlaceHolder} alt=""/>
                    <h4>Dianne Chrystalin Brandez</h4>
                    <h5>LEADER</h5>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas quae doloremque provident eos. Temporibus assumenda veritatis itaque? Mollitia, possimus quisquam!</p>
                </div>
                <div>div2</div>
                <div>div3</div>
            </div>
        </div>
        <div id="Container_Section3" class="Sections">
            <div class="Container_Title_Sections">
                <h3>Frequently Ask Question</h3>
            </div>
            <div id="Container_Content_Section3">
                
            </div>
        </div>
    </div>
  );
}

export default LandingPage;