
import React,{useState} from 'react';
import './style-CredentialView.scss'

import Button from '../../components/Button';


import UserImg from './../../Assets/Images/Resources/Developers/Dianne.jpg';
function Credential() {
  const [openDetails, setopenDetails] = useState(false);
  const [openFullView, setopenFullView] = useState(false);
  return (
    <section id='CredentialView' className={openDetails?"DetailsActive":"DetailsInactive"}>
      <div className='Container_CredentialView' id='Container_Document_Credential'>                  
        <div>
          {/* You can put the credential */}
        </div>
        {/*Button */}
        <div id='Full' className='ContainerButton' onClick={() => setopenFullView(!openFullView)}>
          <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 306.8 306.05"><defs><style></style></defs><polygon class="cls-1" points="0 123.05 40 123.05 40 40 123.05 40 123.05 0 0 0 0 123.05"/><polygon class="cls-1" points="183.75 0 183.75 40 266.8 40 266.8 123.05 306.8 123.05 306.8 0 183.75 0"/><polygon class="cls-1" points="266.8 266.05 183.75 266.05 183.75 306.05 306.8 306.05 306.8 183 266.8 183 266.8 266.05"/><polygon class="cls-1" points="40 183 0 183 0 306.05 123.05 306.05 123.05 266.05 40 266.05 40 183"/></svg>
        </div>
        {/* Full View Pannel fixed */}
        <div id='Container_FullView_Credential'  className={openFullView?"Active_Container_FullView_Credential":"Inactive_Container_FullView_Credential"}>
          <div id='Container_Background'  onClick={() => setopenFullView(!openFullView)}></div>  
          <div id='holder_FullView_Credential'>
            <div id='Container_FullView_Credential'>
              {/* You can put the credential for ful screen*/}
            </div>
            <div id='Full' className='ContainerButton' >
              <svg id="Download" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 306.8 306.05"><defs><style></style></defs><polygon class="cls-1" points="0 123.05 40 123.05 40 40 123.05 40 123.05 0 0 0 0 123.05"/><polygon class="cls-1" points="183.75 0 183.75 40 266.8 40 266.8 123.05 306.8 123.05 306.8 0 183.75 0"/><polygon class="cls-1" points="266.8 266.05 183.75 266.05 183.75 306.05 306.8 306.05 306.8 183 266.8 183 266.8 266.05"/><polygon class="cls-1" points="40 183 0 183 0 306.05 123.05 306.05 123.05 266.05 40 266.05 40 183"/></svg>
              <svg id="Layer_1" onClick={() => setopenFullView(!openFullView)} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 327.1 327.1"><defs><style></style></defs><polygon class="cls-1" points="213.05 163.55 327.1 277.6 277.6 327.1 114.05 163.55 277.6 0 327.1 49.5 213.05 163.55"/><rect class="cls-1" x="1005.48" y="311.87" width="161.29" height="70" transform="translate(-931.51 768.05) rotate(-45)"/><rect class="cls-1" x="1051.12" y="102.68" width="70" height="161.29" transform="translate(-815.86 720.15) rotate(-45)"/></svg>
            </div>
          </div>
        </div>
      </div>
      <div  id='Container_Information_Credential'>
        {/* Details of the credential */}
        <div className='Container_CredentialView'id='Holder_Information_Credential'>
          <div id='Hide' className='ContainerButton' onClick={() => setopenDetails(!openDetails)}>
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 327.1 327.1"><defs><style></style></defs><polygon class="cls-1" points="213.05 163.55 327.1 277.6 277.6 327.1 114.05 163.55 277.6 0 327.1 49.5 213.05 163.55"/><rect class="cls-1" x="1005.48" y="311.87" width="161.29" height="70" transform="translate(-931.51 768.05) rotate(-45)"/><rect class="cls-1" x="1051.12" y="102.68" width="70" height="161.29" transform="translate(-815.86 720.15) rotate(-45)"/></svg>
          </div>
          <div id='Holder_Details_CredentialView'>
            <h3>Details</h3>
            <h6 className='Title_Information_Credential'>Title: </h6>
            <p className="Content_Information_Credential">Accelerated Program in Euthereum</p>
            <h6 className='Title_Information_Credential'>Document Type: </h6>
            <p className="Content_Information_Credential">Accelerated Program in Euthereum</p>
            <h6 className='Title_Information_Credential'>Description: </h6>
            <p className="Content_Information_Credential">Accelerated Program in Euthereum</p>
            <h6 className='Title_Information_Credential'>Txn Hash: </h6>
            <p className="Content_Information_Credential">#0x6e512d26...D24A</p>
            <div className='Container_userInvolve'>
              <a href="http://">
                <img src={UserImg} alt="" />
                <div>
                  <h6>Dianne Chrystalin M. Brandez</h6>
                  <p>Owner</p>
                </div>
              </a>
            </div>
            <div className='Container_userInvolve'>
              <a href="http://">
                <img src={UserImg} alt="" />
                <div>
                  <h6>Bicol IT</h6>
                  <p>Organization</p>
                </div>
              </a>
            </div>
            <div id='Container_Button_Details'>
              <Button Action="Link" Link="/" BtnType="Primary2" Value="Share"/>
              <Button Action="Link" Link="/" BtnType="Primary" Value="Download"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Credential


