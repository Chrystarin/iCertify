import React, {useEffect, useState,useRef}from 'react';
import './Header.scss';
import PicLogo from './../../images/iCertifyBranding/icon.png';
import {ethers} from 'ethers';
import SearchInput from '../../components/SearchInput/SearchInput.js';
import LogoutIcon from '@mui/icons-material/Logout';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
function Header() {

  const [openDropdown, setopenDropdown] = useState("");
  const [address, setAddress] = useState("");

  // For closing the dropdown when clicking outside of
  let menuRef = useRef();
  useEffect(() => {
    

    const checkWallet = async () => {
      try{
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          setAddress(await signer.getAddress());
      }
      catch(err){
          console.error(err.message);
      }
    }

    checkWallet();
  })
  function Notificaton(){
    let img = ["PicLogo","PicLogo"];
    let sender = ["Dianne","Llagas"];
    let reciver = ["1","None"];
    let content = ["Paragraph 1","Paragrap 2"];
    return(
      <ul>              
          {img.map((image) =>  
              <li>
                <img src={image} alt=""/>
                <p className="BodyText3">Lorem ipsum dolor sit amet, consectet adipisicing elit. Aliquamque similique alias ullam a accusantium voprehenderit leniti eos. Eos?</p>
              </li>
          )};
      </ul>
    );
}
function UserMembership(){
    let Membership = true;
    if(Membership) return <h6 className='BodyText3 PremiumMember'>Premium Membership</h6>
    return <h6 className='BodyText3 PremiumMember'>Get Membership</h6>
}
function DropdownItem(props){
    return(
    <li className = 'dropdownItem'>
        <a href={"/" + props.link}>
        <LogoutIcon/>
        <h6>{[props.text]}</h6>
        </a>
    </li>
    );
}
  
  return (
    <div id="header_Content">
          <div id='Navigation_Left'>
            <SearchInput/>
          </div>
          
          <div id='Navigation_Content'> 
              <div id="NotificatonHolder"ref={menuRef}>
                <IconButton color="primary" aria-label="add to shopping cart">
                  <Badge badgeContent={26} color="primary" onClick={()=>(openDropdown==="Notification")?setopenDropdown(""): setopenDropdown("Notification")}>
                    <NotificationsIcon color="action" sx={{ fontSize: 30 ,cursor:"pointer"}}/>
                  </Badge>
                </IconButton>
                
                <div id="DropDown_Notification" className={(openDropdown === "Notification")? "active":"inactive"} >
                    <div id="Header_Notification">
                        <h6>Notificaton</h6> 
                        <p className="BodyText3">Mark as Read</p>
                    </div>
                    <div id="Content_Notification" >
                        <ul>
                            <li >
                                <a href='/' className='unread'>
                                <img src={PicLogo} alt=""/>
                                <p className="BodyText3">Lorem ipsum dolor sit amet, consectet adipisicing elit. Aliquamque similique alias ullam a accusantium voprehenderit leniti eos. Eos?</p>
                                </a>
                            </li>
                            <li>
                                <a href='/'>
                                <img src={PicLogo} alt=""/>
                                <p className="BodyText3">Lorem ipsum dolor sit amet, consectet adipisicing elit. Aliquamque similique alias ullam a accusantium voprehenderit leniti eos. Eos?</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
              </div>           
              <div id='profile_Navigation'ref={menuRef}>
                <img id='profilePicture_Navigation' src={PicLogo} alt="" onClick={()=>{(openDropdown==="Profile")?setopenDropdown(""): setopenDropdown("Profile")}}/>
                <div className={(openDropdown==="Profile")?'dropdown-menu active':'dropdown-menu inactive'} >
                  <a href={`/member/${address}`}>
                    <h4 className='BodyText2'>{address}</h4>
                  </a>
                  <a href='/membership'>
                    <div id='Wrapper_MembershipType'>
                      <UserMembership/>
                    </div>
                  </a>
                  <ul>
                    <DropdownItem img = {PicLogo} text={"Logout"} link = {""}/>
                  </ul>
                </div>
              </div>
              
          </div>
        </div>
    );
}

export default Header;
