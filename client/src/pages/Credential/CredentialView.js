
import React,{useState} from 'react';
import './CredentialView.scss'
import Button from '@mui/material/Button';
import UserImg from './../../images/Resources/Developers/Dianne.jpg';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import UserPanel from '../../components/UserPanel/UserPanelInfo.js'

import Fab from '@mui/material/Fab';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import Backdrop from '@mui/material/Backdrop';

import ShareCredentialModal from '../../layouts/Credential/ShareCredentialModal';

function Credential() {
  const [ModalToOpen,setModalToOpen] = useState("wew")
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggleFull = (ToOpen) => {
    setOpen(!open);
    setModalToOpen("full");
  };
  const handleToggleShare = (ToOpen) => {
    setOpen(!open);
    setModalToOpen("share");
  };

  function SetBackrop(){
    switch (ModalToOpen) {
      case "full":
        return <>
          <div id='FullViewModal' >
            <div id='FullView__Container' className='Panel__Container'>
              <h1>I love you wife </h1>
            </div>
            <div id='FullView__Buttons'>
              <Fab size='small' color="white" aria-label="full" sx={{zIndex: 97 }} onClick={handleToggleFull}>
                <FullscreenExitIcon />
              </Fab> 
              <Fab size='small' color="white" aria-label="full" sx={{zIndex: 97 }}>
                <DownloadIcon />
              </Fab> 
            </div>
            
          </div>
        </>
        break;
      case "share":
        return <ShareCredentialModal ChangeHandler={handleToggleShare}/>
        break;
      default:
        break;
    }
  }


  return (
    <section id='CredentialViewPage_Wrapper'>
      <div id='CredentialView_Container'>
        <div id='CredentialViewingPanel__Container' className='Panel__Container'>
          <div id='FullView__Container'>
            <div>
            </div>
            <Fab size='small' color="white" aria-label="full" sx={{zIndex: 97 }} onClick={handleToggleFull}>
                <FullscreenIcon />
            </Fab>
          </div>
        </div>
      </div>
      <div id='CredentialViewSideBar_Container'>
        <div className='Panel__Container' id='CredentialDetails__Container'>
          <h4>Credential Details</h4>
          <ul id='ListofDetails'>
            <li>
              <h5 className="Details__Title">Event</h5>
              <p className='BodyText1 Details__Content'>Blockchain Technology</p>
            </li>
            <li>
              <h5 className="Details__Title">Certificate Type</h5>
              <p className='BodyText1 Details__Content'>Certificate of Completion</p>
            </li>
            <li>
              <h5 className="Details__Title">Description</h5>
              <p className='BodyText1 Details__Content'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam hic voluptates placeat id iusto quae minus, nulla non. Veritatis libero eos nam dolorum voluptates incidunt.</p>
            </li>
            <li>
            </li>
          </ul>
          <div id='SenderReciever__Container' className='Panel__Container'>
            <a href="#">
              <UserPanel Image={UserImg} SubTitle="Owner" Title="Dianne Chrystalin Brandez"/>
            </a>
          </div>
          <div id='SenderReciever__Container' className='Panel__Container'>
            <a href="#">
              <UserPanel Image={UserImg} SubTitle="Admin" Title="Bicol IT Organization"/>
            </a>
          </div>
          <div id='Button__Wrapper'> 
            <Button variant="outlined" startIcon={<ShareIcon/>} onClick={handleToggleShare}> Share</Button>
            <Button variant="contained" startIcon={<DownloadIcon/>}>Download</Button>
          </div>
        </div>
      </div>


      <Backdrop
      sx={{ color: '#fff', zIndex: 98 }}
      open={open}
      onClick={handleClose}>
      </Backdrop>
      <div className='Modal'>
        {(open)? <SetBackrop/>:""}
      </div>
    </section>
  )
}

export default Credential


