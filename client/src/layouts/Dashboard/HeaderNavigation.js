import React, {useEffect, useState,useRef}from 'react';
import PicLogo from './../../images/iCertifyBranding/icon.png';
import './HeaderNavigation.scss';

import SearchInput from '../../components/SearchInput';
import LogoutIcon from '@mui/icons-material/Logout';

function HeaderNavigation() {

  const [openDropdown, setopenDropdown] = useState("");

  // For closing the dropdown when clicking outside of
  let menuRef = useRef();
  useEffect(() => {
    document.addEventListener("mousedown",(event)=>{
      if(!menuRef.current.contains(event.target)){
        setopenDropdown("");
      }
    });
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
                <svg id="Icon_Notification" src={PicLogo} alt="" onClick={()=>{(openDropdown==="Notification")?setopenDropdown(""): setopenDropdown("Notification")}} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 32.92"><path d="M29.05,22.7c-.83-1.06-2.42-3.64-2.42-3.64s-1.78-3.55-1.85-5.52a29.71,29.71,0,0,0-.42-3.78C23.08,4.69,18.08,3,18.08,3A3.31,3.31,0,0,0,15-.16,3.31,3.31,0,0,0,11.92,3s-5,1.67-6.28,6.74a29.71,29.71,0,0,0-.42,3.78c-.07,2-1.85,5.52-1.85,5.52S1.78,21.64,1,22.7s-2.09,3,1.17,4.8a34.39,34.39,0,0,0,9.12,1.18s2.45.11,3.76,0c1.31.11,3.76,0,3.76,0a34.39,34.39,0,0,0,9.12-1.18C31.14,25.72,29.89,23.76,29.05,22.7Z" transform="translate(0 0.16)"/><path d="M15,32.76A4.09,4.09,0,0,0,19,30h-7.9A4.09,4.09,0,0,0,15,32.76Z" transform="translate(0 0.16)"/></svg>
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
                  <a href="/member/profile">
                    <h4 className='BodyText2'>Dianne Chrystalin Brandez</h4>
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

export default HeaderNavigation;
