import React,{useState} from 'react';


import './../../Assets/Styles/Page/style-Signup.scss';
import logo from '../../Assets/Images/brand/icertify_footer.png';
import CertifiicatImg from '../../Assets/Images/Resources/Certificate.jpg';
import MetamaskImg from '../../Assets/Images/Resources/Metamask.png';

import TextField from '@mui/material/TextField';



import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


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
  const [Occupation, setOccupation] = React.useState('');
  const handleChange = (event) => {
    setOccupation(event.target.value);
  };

  return (
    <div id='Signup'>
      <div id='Container_Signup'>
        <div id='Container_Signup_Content'>
          <a id='Holder_GoBack_Button' href='/'>
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.94 24.23"><defs><style></style></defs><g id="Path_382" data-name="Path 382"><polygon className="cls-1" points="12.11 24.23 0 12.11 12.11 0 14.94 2.83 5.66 12.11 14.94 21.4 12.11 24.23"/></g></svg>
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


              <div id='Form1' className={isNext?"Inactive":"Active"}>
                <h1>SIGN UP</h1>
                <h4><span>Create</span> or <span>Connect</span> your Metamask Wallet</h4>
                <img src={MetamaskImg} alt="" />
                <h5>You will recieve certificates to your own </h5>
                <span id="Submit" onClick={()=>{setIsNext(!isNext)}}> Next</span>                

              </div>

              <div id='Form2' className={isNext?"Active":"Inactive"}>
                <h1>SIGN UP</h1>
                <h4><span>Setup</span> your profile Details </h4>
                <form action="/Dashboard">
                  <div id='Wrapper_Name'>
                    <TextField id="outlined-search" label="Firstname" type="text" required/>
                    <TextField id="outlined-search" label="Lastname" type="text" required/>
                  </div>
                  <FormControl fullWidth required>
                    <InputLabel id="demo-simple-select-label">Occupation</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={Occupation}
                      label="Occupation"
                      onChange={handleChange}
                    >
                      <MenuItem value={"Student"}>Student</MenuItem>
                      <MenuItem value={"Professional"}>Professional</MenuItem>
                      <MenuItem value={"None"}>None</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField id="outlined-search" label="Email" type="email" required/>
                  <TextField id="outlined-search" label="Password" type="Password" />
                  <input id='Submit' type="submit" value="Connect" />
                </form>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup