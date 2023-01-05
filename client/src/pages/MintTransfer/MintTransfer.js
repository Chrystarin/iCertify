import React, {useRef, useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import html2canvas from 'html2canvas';

import './MintTransfer.scss';
import './../../styles/Main.scss'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchInput from '../../components/SearchInput/SearchInput';

import MintTransferCard from '../../components/MintTransferCard/MintTransferCard';

import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import SelectEvent from '../../layouts/MintTransfer/SelectEventPanel';

import Fab from '@mui/material/Fab';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import Backdrop from '@mui/material/Backdrop';
import ViewRequestorModal from '../../layouts/MintTransfer/ViewRequestorModal';
import Certificate from '../../components/Certificate/Certificate.js';

import contractBuild from '../../CertificateNFT.json'
import { ethers } from 'ethers'

function MintTransfer() {
  const { id } = useParams()
  const [TabActive, setTabActive] = useState("Pending");
  const [open, setOpen] = React.useState(false);
  const [event, setEvent] = useState(null)
  const [participants, setParticipants] = useState(null)
  const exportRef = useRef();

  const childRef = useRef(null);

  // Values for metamask credentials
  let provider, signer, contract;

  useEffect(() => {

    async function requestAccount() {
      return await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
    requestAccount();
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract('0x2834B7434983cBab156Bfea31024184B9e3CA1B4', contractBuild.abi, signer);

    const fetchEvent = async () => {
      const response  = await fetch(`http://localhost:6787/events/${id}`)
      const json = await response.json()
      if(response.ok){
          setEvent(json)
      }
    }

    const fetchParticipants = async () =>{
        const response = await fetch(`http://localhost:6787/events/${id}/participants`)
        const json = await response.json()
        if(response.ok){
            setParticipants(json)
        }
        
    }

    fetchParticipants()
    fetchEvent()
    
  }, [])
  
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggleModal = (participant, event) => {
    setOpen(!open);
  };

  
  function TabView(){
    switch (TabActive) {
      case "Pending":
        return <>
          {/* <MintTransferCard status="Pending" handler={handleToggleModal}/> */}
          {participants.length > 0 && participants.map((participant) => {
              return(<>
                <MintTransferCard 
                  key={participant.member.walletAddress}
                  address={participant.member.walletAddress}
                  name={participant.member.name.firstName + " " + participant.member.name.lastName + " " + participant.member.walletAddress}
                  status="Pending" 
                  role={participant.role}
                  eventId={event.eventId}
                  eventTitle={event.title}
                  handler={()=>handleToggleModal(participant, event)}
                  // handler={()=>console.log(participant)}
                  // process={()=>childRef.current.CreateCertificate()}
                  // process={()=>console.log(participant.member.walletAddress)}
                  // certificate={<Certificate
                  //   name={participant.member.name.firstName + " " + participant.member.name.lastName}
                  // />}
                />
                <Backdrop
                sx={{ color: '#fff', zIndex: 98 }}
                open={open}
                onClick={handleClose}>
                </Backdrop>

                <div className='Modal'>
                  {(open) ? 
                  <ViewRequestorModal 
                    setter={setOpen}
                    key={participant.member.walletAddress}
                    address={participant.member.walletAddress}
                    name={participant.member.name.firstName + " " + participant.member.name.lastName + " " + participant.member.walletAddress}
                    role={participant.role}
                    eventId={event.eventId}
                    eventTitle={event.title}
                  />:""}
                </div>
              </>
              )
          })}
          
        </>
        break;
      case "OnProgress":
        return <>
          <MintTransferCard/>
          <MintTransferCard/>
          <MintTransferCard/>
          <MintTransferCard/>
          <MintTransferCard/>
          <MintTransferCard/>
          <MintTransferCard/>
        </>
        break;
      case "Complete":
        return <>
          <MintTransferCard/>
          <MintTransferCard/>
          <MintTransferCard/>
          <MintTransferCard/>
          <MintTransferCard/>
        </>
        break;
      default:
        break;
    }
  }

  if(!event || !participants) return <div>loading...</div>

  return ( <>
    <div className='AdminPanelContainer'>
      <section id='MintNTransfer'>
        <div id='Header'>
          <SelectEvent title={event.title}/>
          <div className='MintNTransfer__Wrapper'>
            <div className='Title__Div'>
              <h2 className='SectionTitle'>Generate Certificate</h2>
              {/* <h5 className='SectionSubTitle'>Organize Certificate Requests</h5> */}

              <div className='InfoLeft__Div'>
                <div className="Pending__VerifiedRequest__Container">
                  <h4>25</h4> 
                  <h6>Pending Request</h6>
                </div>
                <div className="Pending__VerifiedRequest__Container">
                  <h4>25</h4> 
                  <h6>Complete</h6>
                </div>
              </div>
            </div>
            <div className='InfoRight__Div'>
              <div id='InfoRight__Wrapper'>
                <div id='EventStatus__Div'>
                  <h6 className='HeaderTitle'>Event Status</h6>
                  <h6>Ended in 3 days</h6>
                </div>
                <div id='Organizers__Div'>
                  <div>
                    <h6 className='HeaderTitle'>Organizers</h6>
                    <div className='AvatarGroupWithLabel'>
                      <AvatarGroup max={3} sx={{'& .MuiAvatar-root': { width: 24, height: 24, fontSize: 15 },}}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                      </AvatarGroup>
                    </div>
                  </div>
                </div>
                <div id='Participants__Div'>
                  <div>
                    <h6 className='HeaderTitle'>Participants</h6>
                    <div className='AvatarGroupWithLabel'>
                      <AvatarGroup max={3} sx={{'& .MuiAvatar-root': { width: 24, height: 24, fontSize: 15 },}}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                      </AvatarGroup>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            
          </div>
        </div>
        <div id='Body'>
          <div id="TabsNav">
            <Button variant={(TabActive==="Pending")?"contained":"text"} onClick={()=>setTabActive("Pending")}>Pending</Button>
            <Button variant={(TabActive==="OnProgress")?"contained":"text"} onClick={()=> setTabActive("OnProgress") }>On Progress</Button>
            <Button variant={(TabActive==="Complete")?"contained":"text"} onClick={()=> setTabActive("Complete") }>Complete</Button>
          </div>
          <div id='TabsView'>
            <div id='ListTools'>
              <div id='SearchInputHolder'>
                <SearchInput/>
              </div>
              <IconButton>
                <FilterAltIcon />
              </IconButton>
            </div>
            <div className='Wrapper__Card'>
              <TabView/>
            </div>
          </div>
        </div>
      </section>
      <div id='SideContent'>
        <div className='Panel__Container'>
          <h5>Attendance Sheet</h5>
        </div>
        <div className='Panel__Container'>
          <h5>Analytics</h5>
        </div>
      </div>
    </div>


    {/* <Backdrop
    sx={{ color: '#fff', zIndex: 98 }}
    open={open}
    onClick={handleClose}>
    </Backdrop>

    <div className='Modal'>
      {(open) ? 
      <ViewRequestorModal setter={setOpen}/>:""}
    </div> */}
  </>

  )
}

export default MintTransfer;