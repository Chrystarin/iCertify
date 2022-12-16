import React, {useState}from 'react'
import './../../Assets/Styles/Page/style-Signup.scss'
import logo from '../../Assets/Images/brand/icertify_footer.png'
import CertifiicatImg from '../../Assets/Images/Resources/Certificate.jpg';
import MetamaskImg from '../../Assets/Images/Resources/Metamask.png';


import Input from '../../Components/TextInput.js';


function Signup() {

    const url = "http://localhost:6787/member/register"

    const [isNext , setIsNext] = useState(false); 
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        occupation: '',
        email: '',
        password: ''
    });

    function updateForm(e) {
        return setUserInfo((prev) => {
            const [key, value] = Object.entries(e)[0];
            prev[key] = value;

            console.log(prev);
            console.log(userInfo);
            return prev;
        
    });}

    async function onSubmit(e) {
        e.preventDefault();
    
        // When a post request is sent to the create url, we'll add a new record to the database.
        const newUser = { ...userInfo };
    
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // navigate(`/events/${data.eventId}`);
            console.log("Submitted")
        })
        .catch(error => {
            window.alert(error);
            console.log("Error:" + error);
            return;
        });
        
    }

  return (
    <div id='Signup'>
      <div id='Container_Signup'>
        <div id='Container_Signup_Content'>
          <a id='Holder_GoBack_Button' href='/'>
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.94 24.23"><defs><style></style></defs><g id="Path_382" data-name="Path 382"><polygon class="cls-1" points="12.11 24.23 0 12.11 12.11 0 14.94 2.83 5.66 12.11 14.94 21.4 12.11 24.23"/></g></svg>
            <h5>Go back to Home</h5>
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
            <form action="/Dashboard">
              <div id='Form1' className={isNext?"Inactive":"Active"}>
                <h1>SIGN UP</h1>
                <h4><span>Setup</span> your profile Details </h4>
                <div id='Wrapper_Name'>
                    <Input 
                        Title="First Name" 
                        Holder="Dianne" 
                        Action={(e)=>updateForm({ firstName: e.target.value })}
                    />
                    <Input 
                        Title="Last Name" 
                        Holder="Dianne" 
                        Action={(e)=>updateForm({ lastName: e.target.value })}
                    />
                </div>
                <Input 
                    Title="Occupation" 
                    Holder="Student" 
                    Action={(e)=>updateForm({ occupation: e.target.value })}
                />
                <Input 
                    Title="Email" 
                    Holder="YourEmail@gmail.com" 
                    type="email"
                    Action={(e)=>updateForm({ email: e.target.value })}
                />
                <Input 
                    Title="Password" 
                    Holder="PaSSwoRD" 
                    type="password"
                    Action={(e)=>updateForm({ password: e.target.value })}
                />
                <span id="Submit" onClick={()=>{setIsNext(!isNext)}}> Next</span>
              </div>
              <div id='Form2' className={isNext?"Active":"Inactive"}>
                <h1>SIGN UP</h1>
                <h4><span>Create</span>or <span>Connect</span> your Metamask Wallet</h4>
                <img src={MetamaskImg} alt="" />
                <h5>Create or Connect your metamask where we will put your certificates </h5>
                <input id='Submit' type="submit" value="Connect" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup