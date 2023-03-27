import React,{useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import { saveAs } from 'file-saver'

import './DocumentView.scss';
import Button from '@mui/material/Button';
import UserPanel from '../../components/UserPanel/UserPanelInfo.js'
import Fab from '@mui/material/Fab';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import Backdrop from '@mui/material/Backdrop';
import ShareCredentialModal from '../../layouts/Documents/ShareDocumentModal';

import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import UserIcon from './../../images/icons/user-round.png';

import axios from '../../config/axios';

function DocumentView() {
  const { id } = useParams()
  const [ModalToOpen,setModalToOpen] = useState("")
  const [open, setOpen] = useState(false);
  const [certificate, setCertificate] = useState(null);

  // Executes on load
  useEffect(() => {
    const fetchCertificate = async () => {
      const response = await axios.get(`/certificates/${id}`)
      .then((response)=>{
        setCertificate(response.data)
      })
    }
    
    fetchCertificate();
  }, [])
  

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
            <img className='CredentialViewingPanel__FullImage' src={`https://icertify.infura-ipfs.io/ipfs/${certificate.ipfsCID}`} alt=""/>
            </div>
            <div id='FullView__Buttons'>
              <Fab size='small' color="white" aria-label="full" sx={{zIndex: 97 }} onClick={handleToggleFull}>
                <FullscreenExitIcon />
              </Fab> 
              <Fab size='small' color="white" aria-label="full" sx={{zIndex: 97 }}>
                <DownloadIcon onClick={()=>saveAs(`https://icertify.infura-ipfs.io/ipfs/${certificate.ipfsCID}`, 'image.jpg')}/>
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

  if(!certificate) return <div>loading...</div>

  return (
    <section id='CredentialViewPage_Wrapper'>
      <div id='CredentialView_Container'>
        <div id='CredentialViewingPanel__Container' className='Panel__Container'>
        <img className='CredentialViewingPanel__Image' src={`https://icertify.infura-ipfs.io/ipfs/${certificate.ipfsCID}`} alt=""/>
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
          <h5>Document Details</h5>
          <ul id='ListofDetails'>
            <li>
              <h6 className="Details__Title">Name</h6>
              <p className='BodyText1 Details__Content'>{certificate.event.title}</p>
            </li>
            <li>
              <h6 className="Details__Title">Description</h6>
              <p className='BodyText1 Details__Content'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat perspiciatis quae doloribus, quo suscipit voluptate aperiam quas hic nam qui error vel. A assumenda corporis quod ut in nobis sequi.</p>
            </li>
            <li>
              <h6 className="Details__Title">Transaction Hash</h6>
              <p className='BodyText1 Details__Content'>{certificate.hash}</p>
            </li>
            <li>
              <h6 className="Details__Title">Date Created</h6>
              <p className='BodyText1 Details__Content'>{certificate.title}</p>
            </li>
            <li>
            </li>
          </ul>
          <a href={`/member/${certificate.owner.walletAddress}`}>
            <div id='SenderReciever__Container' className='Panel__Container'>
              
                <UserPanel Image={UserIcon} SubTitle="Owner" Title={`${certificate.owner.name.firstName}`}/>
            </div>
          </a>
          <a href="#">
            <div id='SenderReciever__Container' className='Panel__Container'>
                <UserPanel Image={UserIcon} SubTitle="Admin" Title="Bicol IT Organization"/>
            </div>
          </a>

          <div id='Button__Wrapper'> 
            <Button variant="outlined" startIcon={<ShareIcon/>} onClick={handleToggleShare}> Share</Button>
            <Button variant="contained" startIcon={<DownloadIcon/>} onClick={()=>saveAs(`https://icertify.infura-ipfs.io/ipfs/${certificate.ipfsCID}`, 'image.jpg')}>Download</Button>
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

export default DocumentView


