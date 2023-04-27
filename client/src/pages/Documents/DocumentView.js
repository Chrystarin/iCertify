import React,{useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import { saveAs } from 'file-saver'
import {ethers} from 'ethers';

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
import Switch from '@mui/material/Switch';


// Import Utilities
import axiosInstance from '../../utils/axios';
import { useAuth } from "../../utils/AuthContext";

function DocumentView() {
    const { id } = useParams()
    const { isAuth, fetchContract, ConnectWallet, contractAddress } = useAuth();
    const label = { inputProps: { 'aria-label': 'Size switch demo' } };

    const [ModalToOpen,setModalToOpen] = useState("")
    const [open, setOpen] = useState(false);
    const [document, setDocument] = useState(null);
    const [documentData, setDocumentData] = useState(null);
    const [institution, setInstitution] = useState(null);
    const [owner, setOwner] = useState(null)
    const [tokenURI, setTokenURI] = useState(null)

    const [switchChecked, setSwitchChecked] = useState(false);

    // Executes on load
    useEffect(() => {
        if(!document || !owner || !institution){
            fetchDocument();
        }
    }, [])

    const fetchDocument = async () => {
        await axiosInstance
            .get(`documents`,{
                params: {
                    code: id
                }
            })
            .then((response) => {
                setDocumentData(response.data);
                console.log(response.data);
                const getDocumentData = async () => {
                    const wallet = await ConnectWallet();
                    const contract = new ethers.Contract(contractAddress, await fetchContract(), wallet.signer);
                    try{
                        await contract.tokenURI(response.data.nftId)
                        .then((response)=>{
                            setTokenURI(response)
                        })

                        await contract.getDocumentData(response.data.nftId)
                        .then((response)=>{
                            
                            let {owner, issuer, docId} = response
                            console.log(response)

                            // Retrieves User's Data
                            const fetchUser = async () => {
                                await axiosInstance
                                    .get(`users`,{
                                        params: {
                                            walletAddress: owner
                                        }
                                    })
                                    .then((response) => {
                                        setOwner(response.data);
                                        console.log(response.data)
                                    });
                            };

                            // Retrieves Institution Data
                            const fetchInstitution = async () => {
                                await axiosInstance
                                    .get(`institutions`,{
                                        params: {
                                            walletAddress: issuer
                                        }
                                    })
                                    .then((response) => {
                                        setInstitution(response.data)
                                        console.log(response.data)

                                        // Retrieves Document Information
                                        function findValue(obj, val) {
                                            for (let key in obj) {
                                                if (typeof obj[key] === 'object') {
                                                    const result = findValue(obj[key], val);
                                                    if (result !== undefined) {
                                                    return result;
                                                    }
                                                } else if (obj[key] === val) {
                                                    return obj;
                                                }
                                            }
                                            return undefined;
                                        }
                                        setDocument(findValue(response.data.docOffers, docId))
                                        console.log(findValue(response.data.docOffers, docId))
                                    });
                            };
                            fetchUser();
                            fetchInstitution();
                        })
                    } catch(error) {
                        console.log(error)
                    }
                }
                getDocumentData();
            });
    };

    
  

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
        
          {/* <div id='FullViewModal' >
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
          </div> */}
        </>
        break;
      case "share":
        return <ShareCredentialModal ChangeHandler={handleToggleShare}/>
        break;
      default:
        break;
    }
  }

    const changeDocumentPrivacy = () => {
        setSwitchChecked(!switchChecked)
        const changePrivacy = async () =>{
            await axiosInstance.patch(
                'documents',
                JSON.stringify({
                    mode: (switchChecked ? "private" : "public"),
                    nftId: documentData.nftId
                })
            )
            .then((response)=>{
                console.log(response)
            })
        }
        changePrivacy();
    }

  if(!document || !owner || !institution || !documentData || !tokenURI) return <div>loading...</div>

  return (
    <section id='CredentialViewPage_Wrapper'>
        {/* <button onClick={()=>fetchDocument()}>Test Function</button> */}
        <div id='CredentialView_Container'>
            <div id='CredentialViewingPanel__Container' className='Panel__Container'>
            <img className='CredentialViewingPanel__Image' src={`https://icertify.infura-ipfs.io/ipfs/${tokenURI}`} alt=""/>
            <div id='FullView__Container'>
                <Fab size='small' color="white" aria-label="full" sx={{zIndex: 97 }} onClick={handleToggleFull}>
                    <FullscreenIcon />
                </Fab>
            </div>
            </div>
        </div>
        <div id='CredentialViewSideBar_Container'>
            <div className='Panel__Container' id='CredentialDetails__Container'>
                <h5>Document Details</h5>
                Public View <Switch 
                    inputProps={{ 'aria-label': 'Set Document as Private' }} 
                    defaultChecked={documentData.mode=="private" ? true : false}
                    onChange={() => {changeDocumentPrivacy();}}
                /> Private View
                <ul id='ListofDetails'>
                    <li>
                        <h6 className="Details__Title">Name</h6>
                        <p className='BodyText1 Details__Content'>{document.title}</p>
                    </li>
                    <li>
                        <h6 className="Details__Title">Description</h6>
                        <p className='BodyText1 Details__Content'>{document.description}</p>
                    </li>
                    <li>
                        <h6 className="Details__Title">Transaction Hash</h6>
                        {/* <p className='BodyText1 Details__Content'>{certificate.hash}</p> */}
                    </li>
                    <li>
                        <h6 className="Details__Title">Date Created</h6>
                        <p className='BodyText1 Details__Content'>{documentData.createdAt}</p>
                    </li>
                </ul>
                <a href={`/users/${owner.walletAddress}`}>
                    <div id='SenderReciever__Container' className='Panel__Container'>
                        <UserPanel Image={UserIcon} SubTitle={owner.walletAddress} Title={owner.name.firstName}/>
                    </div>
                </a>
                <a href={`/institutions/${institution.walletAddress}`}>
                    <div id='SenderReciever__Container' className='Panel__Container'>
                        <UserPanel Image={UserIcon} SubTitle={institution.walletAddress} Title={institution.name}/>
                    </div>
                </a>

                {/* <div id='Button__Wrapper'> 
                    <Button variant="outlined" startIcon={<ShareIcon/>} onClick={handleToggleShare}> Share</Button>
                    <Button variant="contained" startIcon={<DownloadIcon/>} onClick={()=>saveAs(`https://icertify.infura-ipfs.io/ipfs/${certificate.ipfsCID}`, 'image.jpg')}>Download</Button>
                </div> */}
            </div>
        </div>
        
        {/* <Backdrop
            sx={{ color: '#fff', zIndex: 98 }}
            open={open}
            onClick={handleClose}>
        </Backdrop>
        <div className='Modal'>
            {(open)? <SetBackrop/>:""}
        </div> */}
    </section>
  )
}

export default DocumentView


