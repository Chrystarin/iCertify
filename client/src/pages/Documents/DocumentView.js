import React,{useRef, useEffect, useState} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { saveAs } from 'file-saver'
import {ethers} from 'ethers';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';

import './DocumentView.scss';
import Button from '@mui/material/Button';
import UserPanel from '../../components/UserPanel/UserPanelInfo.js'
import Fab from '@mui/material/Fab';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import Backdrop from '@mui/material/Backdrop';
import ShareCredentialModal from '../../layouts/Documents/ShareDocumentModal';
import moment from 'moment';

import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import UserIcon from './../../images/icons/user-round.png';
import Switch from '@mui/material/Switch';
import DocumentFooterImage from '../../images/iCertifyBranding/icertify_footerBlack.png';
import Placeholder from '../../images/placeholder/QR.PNG';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Loading from '../../components/Loading/Loading';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SnackbarComponent from '../../components/Snackbar/SnackbarComponent';

// Import Utilities
import axiosInstance from '../../utils/axios';
import { useAuth } from "../../utils/AuthContext";

function DocumentView() {

    // Constant Declarations
    const docRef = useRef();
    const { id } = useParams()
    const navigate = useNavigate();
    const { isAuth, fetchContract, getContract, ConnectWallet, contractAddress, baseUrl } = useAuth();

    // State Declarations
    const [ModalToOpen,setModalToOpen] = useState("")
    const [open, setOpen] = useState(false);
    const [document, setDocument] = useState(null);
    const [documentData, setDocumentData] = useState(null);
    const [institution, setInstitution] = useState(null);
    const [owner, setOwner] = useState(null)
    const [tokenURI, setTokenURI] = useState(null)
    const [switchChecked, setSwitchChecked] = useState(true);
    const [accessCodes, setAccessCodes] = useState(false);
    const [qrCode, setQRCode] = useState();

    // Executes on load
    useEffect(() => {
        if(!document || !owner || !institution){
            fetchDocument();
        }
    }, [])

    // Retrieves Document's Data
    const fetchDocument = async () => {
        try{
            await axiosInstance
                .get(`documents`,{
                    params: {
                        code: id
                    }
                })
                .then((response) => {
                    setDocumentData(response.data);
                    getDocumentData(response.data);
                    setAccessCodes(response.data.codes);
                });
        } catch(error) {
            setOpenSnackBar(openSnackBar => ({
                ...openSnackBar,
                open:true,
                type:'error',
                note:error.response.data.message,
            }));
            navigate("/error404")
        }
    };

    const ShortingWallet = (data) =>{
        let startString = "";
        let EndString = "";
        for (let i= 0; i < 6; i++) {
            startString = startString + data.charAt(i)
        }
        for (let i = data.length-4; i < data.length; i++) {
            EndString = EndString + data.charAt(i);
        }
        return startString + "..." + EndString
    }
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
            setOpenSnackBar(openSnackBar => ({
                ...openSnackBar,
                open:true,
                type:'error',
                note:error.response.data.message,
            }));
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
            });
    };

    // Retrieves Institution's Data
    const fetchInstitution = async (data) => {
        await axiosInstance
            .get(`institutions`,{
                params: {
                    walletAddress: data.issuer
                }
            })
            .then((response) => {
                setInstitution(response.data)
                setDocument(findValue(response.data.docOffers, data.docId))
            });
    };

    // Updates Document Privacy Mode
    const updateDocumentPrivacy = async (data) =>{
        console.log(data)
        console.log((data ? "public" : "private"))
        console.log(documentData.nftId)
        await axiosInstance
        .patch(
            'documents',
            JSON.stringify({
                mode: (data ? "public" : "private"),
                nftId: documentData.nftId
            })
            
        )
        .then((response)=>{
            console.log(response.data)
        })
        
    }

    const createAccessCode = async () => {
        await axiosInstance
        .post(
            'documents',
            JSON.stringify({
                nftId: documentData.nftId
            })
            
        )
        .then((response)=>{
            console.log(response)
        })
        fetchDocument();
    }

    const deleteAccessCode = async (code) => {
        
        console.log(documentData.nftId)
        await axiosInstance
        .delete(
            'documents',
            {
                data: {
                    nftId: documentData.nftId,
                    code: code
                }
            }
        )
        .then((response)=>{
            console.log(response)
        })
        fetchDocument();
    }

    const generateQrCode = (accessCode) => {
        setQRCode(process.env.REACT_APP_APP_URL + "/documents/" + accessCode);
        navigator.clipboard.writeText(`${process.env.REACT_APP_APP_URL}/documents/${accessCode}`)
        setOpenSnackBar(openSnackBar => ({
            ...openSnackBar,
            open:true,
            type:"success",
            note:"Link Copied and QR Code Updated!"
        }))
        handleToggleShare();
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


    const handleTogglePrivacy = (data) => {
        updateDocumentPrivacy(data);
    }

    // Download Document as Image
    const DownloadDocument = (filename) => {
        const element = docRef.current;

        // Get all images inside the element
        const images = Array.from(element.getElementsByTagName("img"));

        // Create an array of promises that resolve when each image has loaded or failed to load
        const imageLoadPromises = images.map((img) => {
        return new Promise((resolve) => {
            if (img.complete && img.naturalWidth !== 0) {
                resolve();
            } else {
                img.addEventListener("load", () => {
                    resolve();
                });
                img.addEventListener("error", () => {
                    resolve();
                });
            }
        });
        });
        // Wait for all image loading promises to resolve
        Promise.all(imageLoadPromises).then(() => {
            // Create the canvas when all images are loaded
            html2canvas(element, { logging: true, letterRendering: 1, allowTaint: false,  useCORS: true })
            
            .then(function(canvas) {
                const createImage = canvas.toDataURL("image/png");
                console.log(createImage)
                var anchor = window.document.createElement('a');
                anchor.setAttribute("href", createImage);
                anchor.setAttribute("download", filename);
                anchor.click();
                anchor.remove();
                setOpenSnackBar(openSnackBar => ({
                    ...openSnackBar,
                    open:true,
                    type:'info',
                    note:"File Downloading",
                }));
            });
        });
    };


    const [openSnackBar, setOpenSnackBar] = React.useState({
        open:false,
        type:"",
        note:""
    });


    const handleClose = () => {
        setOpen(false);
    };
    
    const handleToggleFull = (ToOpen) => {
        setOpen(!open);
        setModalToOpen("full");
    };

    const handleToggleShare = () => {
        setOpen(!open);
        setModalToOpen("share");
    };

    if(!document || !owner || !institution || !documentData || !tokenURI || !accessCodes) return <Loading/>

    return (
        <section id='CredentialViewPage_Wrapper'>
            <div id='CredentialView_Container' onContextMenu={(e) => e.preventDefault()}>
                <div id='CredentialViewingPanel__Container' className='Panel__Container'>
                    <div id="DocumentFile" ref={docRef}>
                        <img className='CredentialViewingPanel__Image' src={`https://icertify.infura-ipfs.io/ipfs/${tokenURI}`} alt="" />
                        <div>
                    
                            <div id='uploadDocument__ViewUploaded__Container__Footer'>
                                <div id='uploadDocument__ViewUploaded__Container__Footer__Image'>
                                    <img src={DocumentFooterImage} alt="" />
                                </div>
                                <div id='uploadDocument__ViewUploaded__Container__Footer__QR'>
                                    <QRCode
                                        title="iCertify QR Code"
                                        value={qrCode ? qrCode : documentData.codes[0]}
                                        bgColor={'#FFFFFF'}
                                        fgColor={'#000000'}
                                        size={100}
                                        className="qrcode"
                                        id="qrcode"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
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
                    {/* Public View <Switch 
                        inputProps={{ 'aria-label': 'Set Document as Private' }} 
                        defaultChecked={documentData.mode=="private" ? true : false}
                        onChange={() => {handleTogglePrivacy();}}
                    /> Private View */}
                    <ul id='ListofDetails'>
                        <li>
                            <h6 className="Details__Title">Name</h6>
                            <p className='BodyText3 Details__Content'>{document.title}</p>
                        </li>
                        <li>
                            <h6 className="Details__Title">Description</h6>
                            <p className='BodyText3 Details__Content'>{document.description}</p>
                        </li>
                        <li>
                            <h6 className="Details__Title">Transaction Hash</h6>
                            <a href={`${process.env.REACT_APP_BLOCK_EXPLORER}/tx/${documentData.hash}`} target="_blank">
                                <p className='BodyText3 Details__Content'>{documentData.hash}</p>
                            </a>
                        </li>
                        <li>
                            <h6 className="Details__Title">Date Created</h6>
                            <p className='BodyText3 Details__Content'>{moment(documentData.createdAt).format('LL')}</p>
                        </li>
                    </ul>
                    <br/>
                    <a href={`/users/${owner.walletAddress}`}>
                        <div id='SenderReciever__Container' className='Panel__Container'>
                            <UserPanel Image={(!owner.photo) ? UserIcon : owner.photo} SubTitle={ShortingWallet(owner.walletAddress)} Title={owner.name.firstName + " " + owner.name.lastName + " (Owner)"}/>
                        </div>
                    </a>
                    <a href={`/institutions/${institution.walletAddress}`}>
                        <div id='SenderReciever__Container' className='Panel__Container'>
                            <UserPanel Image={(!institution.photos?.profile) ? UserIcon : institution.photos?.profile} SubTitle={ShortingWallet(institution.walletAddress)} Title={institution.name + " (Institution)"}/>
                        </div>
                    </a>
                    {(isAuth(owner.walletAddress) ? 
                    
                        <div id='Button__Wrapper'> 
                            <Button variant="outlined" startIcon={<ShareIcon/>} onClick={handleToggleShare}> Share</Button>
                            <Button variant="contained" startIcon={<DownloadIcon/>} onClick={()=>DownloadDocument(`iCertify-${owner.walletAddress}-${document.title}-${documentData.nftId}.png`)}>Download</Button>
                        </div>

                    : ' ' )}
                    
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
            <SnackbarComponent open={openSnackBar} setter={setOpenSnackBar}/>
        </section>
    )

    function SetBackrop(){
        switch (ModalToOpen) {
            case "full":
                return <>
                
                    <div id='FullViewModal' onContextMenu={(e) => e.preventDefault()}>
                        <div id='FullView__Container' className='Panel__Container'>
                        <img id='FullView__Img' className='CredentialViewingPanel__FullImage' src={`https://icertify.infura-ipfs.io/ipfs/${tokenURI}`} alt=""/>
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
        
        const label = { inputProps: { 'aria-label': 'Size switch demo' } };
        const [checked, setChecked] = useState(documentData.mode === "public" ? true : false);


        const link = window.location.href;


        const handleClickCopyLink = (event) => {
            navigator.clipboard.writeText(`${baseUrl}/documents/${documentData.codes[0]}`)
            setOpenSnackBar(openSnackBar => ({
                ...openSnackBar,
                open:true,
                type:"success",
                note:"link Copied"
            }))
        };


        return (
            <div id='ShareModal'>
                <div id='ShareModal__Container' className='Panel__Container'>
                    <h4 className='ShareModal__Title'>Share Credential </h4>
                    <div>
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
                        <div id='GenerateAccessCode'>
                            <div id='GenerateAccessCode__Add'>
                                <h6>Generate Access Code</h6>
                                <IconButton
                                onClick={()=>createAccessCode()}
                                >
                                    <AddIcon/>
                                </IconButton>
                            </div>
                            <ul id='LinkShare__Type'>
                                {(accessCodes.length === 1 )?
                                    ""
                                    // <p>No Access Codes found!</p>
                                    :
                                    <>
                                        {accessCodes.length > 0 &&
                                        accessCodes.map((code) => {
                                            if(code!=accessCodes[0])
                                            return (
                                                <>
                                                    <li>
                                                        <p>{code}</p>
                                                        <IconButton
                                                            onClick={()=>{
                                                                setOpenSnackBar(openSnackBar => ({
                                                                    ...openSnackBar,
                                                                    open:true,
                                                                    type:"warning",
                                                                    note:"Access code deleted"
                                                                }))
                                                                deleteAccessCode(code)

                                                            }}
                                                        >
                                                            <CloseIcon/>
                                                        </IconButton>
                                                        <Button variant='contained' onClick={()=>generateQrCode(code)}>Share</Button>
                                                    </li>
                                                </>
                                                
                                            );
                                        })}
                                    </>
                                }
                            </ul>
                        </div>
                    </div>

                    
                    <div id='MakePublic__Container'>
                        <div id='MakePublic__Title'>
                            <h6>Set to Public</h6>
                            <p className='BodyText3'>This document will be publicly available on your profile.</p>
                        </div>
                        <Switch
                            checked={checked}
                            onChange={(event)=>{
                                setChecked(event.target.checked);
                                handleTogglePrivacy(event.target.checked);
                            }}
                            inputProps={{ 'aria-label': 'controlled' }}
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


