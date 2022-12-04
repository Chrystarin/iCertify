import React from 'react'
import './../../Assets/Styles/Page/style-Signup.scss'
import logo from '../../Assets/Images/brand/icertify_footer.png'
import CertifiicatImg from '../../Assets/Images/Resources/Certificate.jpg'
import Label from '../../Components/Small Compontents/TextInput'
function Signup() {
  return (
  <div id='Signup'>
    <div id='Container_Signup'>
      <div id='Container_Signup_Content'>
        <a id='Holder_GoBack_Button' href='/'>
          <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.94 24.23"><defs><style></style></defs><g id="Path_382" data-name="Path 382"><polygon class="cls-1" points="12.11 24.23 0 12.11 12.11 0 14.94 2.83 5.66 12.11 14.94 21.4 12.11 24.23"/></g></svg>
          <h5>Go Back</h5>
        </a>
        <div id='Container_Welcome'>
          <h2>WELCOME TO</h2>
          <img src={logo} alt="" id='LogoImg'/>
        </div>
        <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam illum unde temporibus obcaecati, molestiae consequatur? Deleniti doloribus itaque quam numquam, nesciunt illo esse obcaecati distinctio sequi recusandae doloremque necessitatib</h6>
        <img id='Certificate' src={CertifiicatImg} alt="" />
      </div>
      <div id='Container_Signup_Panel'>
        <div id='Container_Signup_Form'>
          <h1>SIGN UP</h1>
          <h4><span>Setup</span> your profile Details </h4>
          <form action="get">
            <div id='Wrapper_Name'>
              <Label Title="First Name" Holder="Dianne"/>
              <Label Title="Last Name" Holder="Dianne"/>
            </div>
            <Label Title="Occupation" Holder="Student"/>
            <Label Title="Email" Holder="YourEmail@gmail.com"/>
            <Label Title="Password" Holder="PaSSwoRD"/>
            <input id='Submit' type="submit" />
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Signup