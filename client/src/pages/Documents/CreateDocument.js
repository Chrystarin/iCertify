import React,{useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import { Avatar } from '@mui/material';
import './CreateDocument.scss';
import DocumentImg from '../../images/Resources/Certificate.png'
import UploadFileImage from './../../images/Resources/Design/UploadFile.png'
import Chip from '@mui/material/Chip';
import SearchInput from '../../components/SearchInput/SearchInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { ethers } from 'ethers'
import axiosInstance from '../../utils/axios';
import axios from '../../utils/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';

function CreateDocument({manual}) {
    
    const navigate = useNavigate();
    const {id} = useParams();
    const {fetchContract} = useAuth();
    
    const [selectDocument, setSelectDocument] = useState();
    const [file, setFile] = useState();
    const [request, setRequest] = useState();
    const [form, setForm] = useState({
        memberAddress: '',
        type: '',
        docId: '',
    });

    // Excecutes on page load
    useEffect(() => {
        fetchDocumentRequest();
    }, [])
    
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

    const handleChangeSelectDocument = (e) => {
        setSelectDocument(e.target.value);
      };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setFile(file)
    }

    const ProcessDocument = async (file) => {

        const formData = new FormData();
        formData.append('document', file);

        const contract = await fetchContract();

        try {
            // Upload to IPFS then get URI
            const { path } = await axios(
                {
                    method: 'post',
                    url: 'http://localhost:4000/transactions/ipfs',
                    data: formData,
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            ).then(res => res.json());

            console.log(path)

            // // Mint and transfer to owner
            // const transaction = await contract.sendDocument(
            //     form.memberAddress,                                 // receiver
            //     form.type,                                          // type
            //     `https://icertify.infura-ipfs.io/ipfs/${path}`,     // uri
            //     form.docId                                          // docId
            // )
            // .then((response)=>{
            //     console.log(response)
            // })
        } catch (err) {      
            console.error(err.message);
        }
    }

    function TestFunction() {
        // sendDocument(certificate);
        // console.log(signer);
    }

    if (!request) return <div>Loading...</div>

    if (request.status == 'verified')
    return <>
        <form id='AdminDasboard'>
            <section id='CreateDocument'>
                <div id='CreateDocument__Container'> 
                    { (!file)?
                        <div id='uploadDocument__Container'>
                            <input type="file" name='uploadDocument' id='uploadDocument' className='hidden'  onChange={(e)=>setFile(e.target.files[0])} /> 
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
                            <div id='uploadDocument__Container'>
                                {file && <img src={URL.createObjectURL(file)} alt="uploaded" id='CreateDocument__Image'/>}
                            </div>
                            <input type="file" onChange={(e)=>setFile(e.target.files[0])} /> 
                        </div>
                    }
                </div>
            </section>
            <div id='SidePanel'>
                <div id='SidePanel__Info' className='Panel__Container'>
                    {manual ?
                        <>
                            <div id='SidePanel__SearchMember'>
                                <h6>Select Member</h6>
                                <SearchInput />
                            </div>
                            <div id='SidePanel__SelectDocument'>
                                <FormControl fullWidth variant='standard'>
                                    <InputLabel id="demo-simple-select-label">Select Document</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectDocument}
                                    label="Age"
                                    onChange={handleChangeSelectDocument}
                                    >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div id='SidePanel__Buttons'>
                                <Button variant='outlined'>Back</Button>
                                <Button variant='contained' onClick={()=>ProcessDocument(file)}>Submit</Button>
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
                                    id="SidePanel__Requestor__Chip" label={request.requestor.walletAddress} 
                                    variant="outlined" 
                                    onClick={()=>{navigate(`/users/${request.requestor.walletAddress}`)}} 
                                />
                            </div>
                            <div id='SidePanel__Date'>
                                <div>
                                    <h6>Document Requested:</h6>
                                    <p>{request.details.offeredDoc.title}</p>
                                    <h6>Price:</h6>
                                    <p>{request.details.offeredDoc.price}</p>
                                    <h6>Description:</h6>
                                    <p>{request.details.offeredDoc.description}</p>
                                    <h6>Requirements:</h6>
                                    <p>{request.details.offeredDoc.requirements}</p>
                                </div>
                            </div>
                            {(!request.details.proof) ? '':
                                <div id='SidePanel__Date'>
                                    <h6>Proof of Payment:</h6>
                                    <p><button><a href={request.details.proof} target="_blank">View</a></button></p>
                                </div>
                            }
                            <div id='SidePanel__Date'>
                                <h6>Requested:</h6>
                                <p>{request.createdAt}</p>
                                <h6>Approved:</h6>
                                <p>{request.details.statusTimestamps.approved}</p>
                                <h6>Paid:</h6>
                                <p>{request.details.statusTimestamps.paid}</p>
                                <h6>Verified:</h6>
                                <p>{request.details.statusTimestamps.verified}</p>
                            </div>
                            <div id='SidePanel__Buttons'>
                                <Button variant='outlined'>Decline</Button>
                                <Button variant='contained' onClick={()=>ProcessDocument(file)}>Process</Button>
                            </div>
                        </>
                    }
                </div>
            </div>
        </form>
    </>
    else{
        return <div>Request not Verified</div>
    }
}

export default CreateDocument