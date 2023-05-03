import React,{useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ethers } from 'ethers'

// Import Stylesheets
import './CreateDocument.scss';

// Import Components
import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import SearchInput from '../../components/SearchInput/SearchInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Loading from '../../components/Loading/Loading';
import SnackbarComponent from '../../components/Snackbar/SnackbarComponent';
// Icons or images
import GetAppIcon from '@mui/icons-material/GetApp';
import UploadFileImage from './../../images/Resources/Design/UploadFile.png'

// Import Utils
import axiosInstance from '../../utils/axios';
import { useAuth } from '../../utils/AuthContext';

function CreateDocument({manual}) {
    
    // Constants Declaration
    const navigate = useNavigate();
    const {id} = useParams();
    const {user, fetchContract, ConnectWallet, contractAddress} = useAuth();
    
    // States Declaration
    const [selectDocument, setSelectDocument] = useState();
    const [file, setFile] = useState();
    const [request, setRequest] = useState();
    const [institution, setInstitution] = useState();
    const [form, setForm] = useState({
        memberAddress: '',
        docId: '',
        docTitle: ''
    });
    const [openSnackBar, setOpenSnackBar] = React.useState({
        open:false,
        type:"",
        note:""
    });
    

    // Excecutes on page load
    useEffect(() => {
        if (manual && user) fetchInstitution();
        fetchDocumentRequest();
    }, [user, form])

    // Retrieves Institution Data
    const fetchInstitution = async () => {
        await axiosInstance
            .get(`institutions`,{
                params: {
                    walletAddress: user.walletAddress
                }
            })
            .then((response) => {
                setInstitution(response.data)
            });
    };
    
    // Retrieves Document Request
    const fetchDocumentRequest = async () => {
        await axiosInstance
            .get(`requests`,{
                params: {
                    requestId: id,
                    requestType: 'document'
                }
            })
            .then((response) => { 
                setRequest(response.data)
            });
    };

    // Uploads Document to IPFS
    const uploadToIpfs = async (data) => {
        console.log(data)

        let path = {}

        try{
            await axiosInstance.post(
                'transactions/ipfs',
                data,
                {headers: { 'Content-Type': 'multipart/form-data' }}
            )
            .then((response) => {
                path = response.data
                console.log("Document Uploaded")
            });

            return path;

        } catch(error){
            console.log(error)
        }
    }

    // Mints Document to the Blockchain Network and Sends to Requestor
    const mintDocument = async (wallet, path) => {

        let txHash = {}

        const contract = new ethers.Contract(
            contractAddress, 
            await fetchContract(), 
            wallet.signer
        );

        try{
            await contract.sendDocument(
                manual ? form.memberAddress : request.requestor.walletAddress,             // receiver
                manual ? "Document" : request.details.offeredDoc.title,                   // type
                path,                                                                       // uri
                manual ? form.docId : request.details.offeredDoc.docId                    // docId
            )
            .then((response)=>{
                txHash = response.hash
                console.log("Document Minted")
            })
            .catch((error)=>{
                alert(error.data.message)
            })
            
            return txHash

        } catch(error) {
            console.log(error)
        }
    }

    // Saves the Transaction and Store Document to User
    const saveTransaction = async (txHash) => {
        try{
            await axiosInstance.post(
                "transactions/save",
                JSON.stringify({
                    requestId: manual ? null : request.requestId,
                    walletAddress: manual ? form.memberAddress : request.requestor.walletAddress,
                    txHash: txHash
                })
            )
            .then((response) => {
                console.log("Document Processing")
                alert("Document Processing!")
                navigate("/documents/requests/toprocess")
            });
            
        } catch (error) {
            alert(error.message)
        }
    }

    // Process the Uploaded Document
    const ProcessDocument = async (file) => {
        console.log(form)

        // Creates Form Data to store Data
        const formData = new FormData();
        formData.append('document', file);
        if(!manual)
            formData.append('requestId', id);
        if(manual)
            formData.append('body', form)

        // Calls wallet and prompt transaction confirmation
        const wallet = await ConnectWallet()

        // Calls functions to process document if user confirms transaction 
        if (wallet){
            const path = await uploadToIpfs(formData)
            const txHash = await mintDocument(wallet, path)
            const transaction = await saveTransaction(txHash)
        }
    }
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

    const handleChangeSelectDocument = (e) => {
        setSelectDocument(e.target.value);
    };

    if(!manual){
        if (!request) return <div>Loading...</div>
        if (request.status === 'processing') return <div>Request Processing. Please Wait.</div>
        if (request.status === 'completed') return <div>Request Already Processed</div>
        if (request.status != 'verified') return <div>Request Not Yet Verified</div>
    }
    if(manual){
        if(!institution) return <Loading/>
        if(!user) return <Loading/>
    }
    
    return <>
        <form id='AdminDasboard'>
            <section id='CreateDocument'>
                <div id='CreateDocument__Container'> 
                    { (!file)?
                        <div className='uploadDocument__Container'>
                            <input type="file"
                            
                                name='uploadDocument' 
                                id='uploadDocument' 
                                className='hidden'  
                                onChange={(e)=>{
                                    setFile(e.target.files[0])
                                    setOpenSnackBar(openSnackBar => ({
                                        ...openSnackBar,
                                        open:true,
                                        type:'success',
                                        note:"File Uploaded",
                                        action: ()=>{
                                        }
                                    }));
                                }}
                            /> 
                            <label htmlFor="uploadDocument" id='uploadDocument__Click'>
                                <img src={UploadFileImage} alt="" />
                                <div>
                                    <p className='BodyText3'>Upload Requested Document Here</p>
                                    <h5>Click to upload a file</h5>
                                </div>
                            </label>
                        </div>
                    :
                        <div>
                            <div id='uploadDocument__ViewUploaded__Container'>
                                {file && <img src={URL.createObjectURL(file)} alt="uploaded" id='CreateDocument__Image'/>}
                                
                            </div>
                            <div className='uploadDocument__ViewUploaded__ReUploadButton'>
                                <input id='reupload' type="file" 
                                onChange={(e)=>{
                                    setFile(e.target.files[0])
                                    setOpenSnackBar(openSnackBar => ({
                                        ...openSnackBar,
                                        open:true,
                                        type:'success',
                                        note:"File Uploaded",
                                        action: ()=>{
                                        }
                                    }));
                                }}
                                className='hidden' /> 
                                <label htmlFor="reupload">
                                    <div>
                                        <GetAppIcon/>
                                        <h6 className='BodyText3'>Upload Another</h6>
                                    </div>
                                </label>
                            </div>
                            
                        </div>
                    }
                </div>
            </section>
            <div id='SidePanel'>
                <div id='SidePanel__Info' className='Panel__Container'>
                    {manual ?
                        <>
                            <div id='SidePanel__Requestor'>
                                <Avatar id="SidePanel__Requestor__Avatar"/>
                            </div>
                            <div className='SidePanel__Date'>
                                <TextField
                                    id='outlined-search'
                                    label='Member Wallet Address'
                                    type='text'
                                    required
                                    onChange={(e) => setForm({memberAddress: e.target.value})}
                                />
                                <FormControl fullWidth variant='standard'>
                                    <InputLabel id="demo-simple-select-label">Select Document</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={form.docId}
                                        label="Document"
                                        onChange={(e)=>{
                                            setForm({...form, docId: e.target.value})
                                        }}
                                    >
                                        {institution.docOffers.length > 0 &&
                                            institution.docOffers.map((document) => {
                                            return (
                                                <MenuItem key={document.docId} value={document.docId}>
                                                    {document.title}
                                                </MenuItem> 
                                            );
                                        })}
                                    </Select>
                                </FormControl>

                                <div id='SidePanel__Buttons'>
                                    <Button variant='contained' onClick={()=>ProcessDocument(file)}>Process Document</Button>
                                </div>
                            </div>
                        </>
                    :
                        <>
                            <div id='SidePanel__Requestor'>
                                <a href="/">
                                    <Avatar id="SidePanel__Requestor__Avatar"/>
                                    <h5>{request.requestor.name.firstName + " " + request.requestor.name.lastName}</h5>
                                </a>
                                <Chip 
                                    id="SidePanel__Requestor__Chip" label={ShortingWallet(request.requestor.walletAddress)} 
                                    variant="outlined" 
                                    onClick={()=>{navigate(`/users/${request.requestor.walletAddress}`)}} 
                                />
                            </div>
                            <div className='SidePanel__Date'>
                                <div>
                                    <h6>Document Requested:</h6>
                                    <p>{request.details.offeredDoc.title}</p>
                                </div>
                                <div>
                                    <h6>Price:</h6>
                                    <p>{request.details.offeredDoc.price}</p>
                                </div>
                                <div>
                                    <h6>Description:</h6>
                                    <p>{request.details.offeredDoc.description}</p>
                                </div>
                                <div>
                                    <h6>Requirements:</h6>
                                    <p>{request.details.offeredDoc.requirements}</p>
                                </div>
                            </div>
                            {(!request.details.proof) ? '':
                                <div className='SidePanel__Date'>
                                    <h6>Proof of Payment:</h6>
                                    <Button id='ProofofPaymentButton' href={request.details.proof} target="_blank" variant='contained' >view image</Button>
                                </div>
                            }
                            <div className='SidePanel__Date'>
                                <div>
                                    <h6>Requested:</h6>
                                    <p>{request.createdAt}</p>
                                </div>
                                <div>
                                    <h6>Approved:</h6>
                                    <p>{request.details.statusTimestamps.approved}</p>
                                </div>
                                <div>
                                    <h6>Paid:</h6>
                                    <p>{request.details.statusTimestamps.paid}</p>
                                </div>
                                <div>
                                    <h6>Verified:</h6>
                                    <p>{request.details.statusTimestamps.verified}</p>
                                </div>
                            </div>
                            <div id='SidePanel__Buttons'>
                                {/* <Button variant='outlined'>Decline</Button> */}
                                <Button variant='contained' onClick={()=>ProcessDocument(file)}>Process</Button>
                            </div>
                        </>
                    }
                </div>
            </div>
        </form>
        <SnackbarComponent open={openSnackBar} setter={setOpenSnackBar}/> 
    </>
}

export default CreateDocument