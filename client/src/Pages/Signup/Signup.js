import React,{useEffect, useState} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {ethers} from 'ethers';

import useAuth from '../../hooks/useAuth';

import axios from '../../config/axios';

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

    const {setAuth} = useAuth();
    const navigate = useNavigate();
    const [walletAddress, setWalletAddress] = useState("");

    useEffect(() => {
        addWalletListener()
    });

    const connectWallet = async () => {
        // Check if metamask is installed
        if(typeof window.ethereum == undefined) {
            window.open("https://metamask.io/download/", '_blank');
            return;
        }

        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            // Get address
            const address = await signer.getAddress();

            // Check if address is already registered
            const { isExisting } = await fetch(`http://localhost:6787/members/${address}/exists`).then(res => res.json());

            if(isExisting){
              alert("User Already Registered!")
            } 
            else{
              // Register address
              await fetch(`http://localhost:6787/members/register`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ walletAddress: address })
              })
              .then(res => res.json())
              .then(console.log);

              // Get nonce of address
              const { nonce } = await fetch(`http://localhost:6787/members/${address}/nonce`).then(res => res.json());

              // Sign message
              const signature = await signer.signMessage('Nonce: ' + nonce);

              // Login with the address and signature
              const response = await axios.post('/members/login',
                  JSON.stringify({ type: 'metamask', credentials: [address, signature] }),
                  {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                          withCredentials: true
                      }
              })
              .then(response => {
                const accessToken = response.data.accessToken;
                const user = response.data.walletAddress;
                const roles = response.data.roles;
                setAuth({user, roles, accessToken});
                navigate(`/member/${response.data.walletAddress}`);
                console.log(response.data.walletAddress);
                console.log(JSON.stringify(response.data.accessToken));
              });
            }

        } catch (err) {
            console.error(err.message);
        }
    };

    const addWalletListener = async () => {
        if(window.ethereum)
            window.ethereum.on("accountsChanged", accounts => setWalletAddress(accounts[0]) );
        else
            setWalletAddress("");
    };

    const updateInformation = async () => {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Get address
      const address = await signer.getAddress();

      const response = await axios.post('/members/login',
      JSON.stringify({
        walletAddress: address,
      }),
      {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          }
      })
      .then(response => {
          const accessToken = response.data.accessToken;
      });
    }

  //   async function onSubmit(e) {
  //   e.preventDefault();

  //   // When a post request is sent to the create url, we'll add a new record to the database.
  //   const newUser = { ...userInfo };

  //   await fetch(url, {
  //       method: "POST",
  //       headers: {
  //           "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newUser),
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //       console.log(data);
  //       // navigate(`/events/${data.eventId}`);
  //       console.log("Submitted")
  //   })
  //   .catch(error => {
  //       window.alert(error);
  //       console.log("Error:" + error);
  //       return;
  //   });
    
  // }



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
                    <TextField 
                      id="outlined-search" 
                      label="Firstname" 
                      type="text" 
                      required 
                      onChange={(e)=>updateForm({ firstName: e.target.value })}
                    />
                    <TextField 
                      id="outlined-search" 
                      label="Lastname" 
                      type="text" 
                      required
                      onChange={(e)=>updateForm({ lastName: e.target.value })}
                    />
                  </div>
                  <FormControl fullWidth required>
                    <InputLabel id="demo-simple-select-label">Occupation</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Occupation"
                      onChange={(e)=>updateForm({ occupation: e.target.value })}
                    >
                      <MenuItem value={"Student"}>Student</MenuItem>
                      <MenuItem value={"Professional"}>Professional</MenuItem>
                      <MenuItem value={"None"}>None</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField 
                    id="outlined-search" 
                    label="Email" 
                    type="email" 
                    required
                    onChange={(e)=>updateForm({ email: e.target.value })}
                  />
                  <TextField 
                    id="outlined-search" 
                    label="Password" 
                    type="Password" 
                    required
                    onChange={(e)=>updateForm({ password: e.target.value })}
                  />
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