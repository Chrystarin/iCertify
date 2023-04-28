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

import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// Import Utilities
import axiosInstance from '../../utils/axios';
import { useAuth } from "../../utils/AuthContext";

function DocumentView() {

    // Constant Declarations
    const { id } = useParams()
    const { isAuth, fetchContract, getContract, ConnectWallet, contractAddress, baseUrl } = useAuth();

    // State Declarations
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

    // Retrieves Document's Data
    const fetchDocument = async () => {
        await axiosInstance
            .get(`documents`,{
                params: {
                    code: id
                }
            })
            .then((response) => {
                setDocumentData(response.data);
                getDocumentData(response.data);
            });
    };

    // Retrieves Document's Metadata
    const getDocumentData = async (data) => {
        const contract = await getContract();

        try{
            await contract
                .tokenURI(data.nftId)
                .then((response)=>{
                    setTokenURI(response)
                })

            await contract
                .getDocumentData(data.nftId)
                .then((response)=>{  
                    fetchUser(response.owner);
                    fetchInstitution(response);
                })

        } catch(error) {
            console.log(error)
        }
    }
 
    // Retrieves User's Data
    const fetchUser = async (data) => {
        await axiosInstance
            .get(`users`,{
                params: {
                    walletAddress: data
                }
            })
            .then((response) => {
                setOwner(response.data);
                console.log(response.data)
            });
    };

    // Retrieves Institution's Data
    const fetchInstitution = async (data) => {
        console.log(data)
        await axiosInstance
            .get(`institutions`,{
                params: {
                    walletAddress: data.issuer
                }
            })
            .then((response) => {
                setInstitution(response.data)
                setDocument(findValue(response.data.docOffers, data.docId))
                console.log(response.data)
                console.log(findValue(response.data.docOffers, data.docId))
            });
    };

    // Updates Document Privacy Mode
    const updateDocumentPrivacy = async () =>{
        await axiosInstance.patch(
            'documents',
            JSON.stringify({
                mode: (switchChecked ? "private" : "public"),
                nftId: documentData.nftId
            })
        )
    }

    // Finds Specific Value based on Key Value Pair
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

    const handleTogglePrivacy = () => {
        setSwitchChecked(!switchChecked)
        updateDocumentPrivacy();
    }

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

    if(!document || !owner || !institution || !documentData || !tokenURI) return <div>loading...</div>

    return (
        <section id='CredentialViewPage_Wrapper'>
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
                        onChange={() => {handleTogglePrivacy();}}
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
                            <p className='BodyText1 Details__Content'>{documentData.hash}</p>
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

                    <div id='Button__Wrapper'> 
                        <Button variant="outlined" startIcon={<ShareIcon/>} onClick={handleToggleShare}> Share</Button>
                        <Button variant="contained" startIcon={<DownloadIcon/>} onClick={()=>saveAs(`https://icertify.infura-ipfs.io/ipfs/${tokenURI}`, 'image.jpg')}>Download</Button>
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

    function SetBackrop(){
        switch (ModalToOpen) {
            case "full":
                return <>
                
                    <div id='FullViewModal' >
                    <div id='FullView__Container' className='Panel__Container'>
                    <img className='CredentialViewingPanel__FullImage' src={`https://icertify.infura-ipfs.io/ipfs/${tokenURI}`} alt=""/>
                    </div>
                    <div id='FullView__Buttons'>
                        <Fab size='small' color="white" aria-label="full" sx={{zIndex: 97 }} onClick={handleToggleFull}>
                        <FullscreenExitIcon />
                        </Fab> 
                        <Fab size='small' color="white" aria-label="full" sx={{zIndex: 97 }}>
                        <DownloadIcon onClick={()=>saveAs(`https://icertify.infura-ipfs.io/ipfs/${tokenURI}`, 'image.jpg')}/>
                        </Fab> 
                    </div>
                    </div>
                </>
                break;
            case "share":
                return <ShareModal ChangeHandler={handleToggleShare} />
                break;
            default:
                break;
        }
    }

    function ShareModal(props){
        
        const link = window.location.href;
        
        const handleClickCopyLink = (event) => {
            navigator.clipboard.writeText(`${baseUrl}/documents/${documentData.codes[0]}`)
            alert("Link copied : "+ link)
        };

        const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
        ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
            duration: 500,
            }),
        },
        }));

        return (
            <div id='ShareModal'>
            <div id='ShareModal__Container' className='Panel__Container'>
                <h4 className='Panel__Title'>Share Credential </h4>
                <FormControl sx={{width: '100%'}} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-Link" >Link</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-Link"
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleClickCopyLink()}
                        edge="end"
                        >
                            <ContentCopyIcon/>
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Link"
                    value={link}
                />
                </FormControl>
                <div id='LinkShare__Type'>
                    
                </div>
                <div id='MakePublic__Container'>
                    <div id='MakePublic__Title'>
                        <h6>Make it Public</h6>
                        <p className='BodyText3'>This certificate can be seen to your User Profile</p>
                    </div>
                    <FormControlLabel 
                        control={<IOSSwitch/>}
                        defaultChecked={documentData.mode=="public" ? true : false}
                        onChange={() => {handleTogglePrivacy();}}
                    />
                </div>
            </div>
            <div id='ShareModal__Buttons'>
                <Fab size='small' color="white" aria-label="full" sx={{zIndex: 97 }} onClick={props.ChangeHandler}>
                    <FullscreenExitIcon />
                </Fab> 
            </div>
            </div>
        )
    }
}

export default DocumentView


