import React,{useEffect,useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './Documents.scss'
import {ethers} from 'ethers';
import SearchInput from '../../components/SearchInput/SearchInput';
import Empty from '../../images/icons/empty-folder.png'
import Card from '../../components/Card/Card.js';
import axios from '../../utils/axios';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Menu from '@mui/material/Menu';
import { Avatar } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import SellIcon from '@mui/icons-material/Sell';
function Documents(){
    const [address, setAddress] = useState("");
    const [ownedCertificates, setOwnedCertificates] = useState(null);
    const {tab} = useParams();
    const navigate = useNavigate();
	const [stepper, setStepper] = useState('JoinedInstitutions');

    const [anchorElDropDownDocument, setAnchorElDropDownDocument] = React.useState(null);
	const open = Boolean(anchorElDropDownDocument);
	
    useEffect(()=> {
        // const checkWallet = async () => {
        //     try{
        //         const provider = new ethers.providers.Web3Provider(window.ethereum);
        //         const signer = provider.getSigner();
        //         setAddress(await signer.getAddress());
        //     }
        //     catch(err){
        //         console.error(err.message);
        //     }
        // }
        // const fetchOwnedCertificates = async () => {
        //     const response = await axios
        //         .get(`members/${address}/certificates`)
        //         .then((response) => {
        //             setOwnedCertificates(response.data);
        //         });
        // };
        // checkWallet();
        // fetchOwnedCertificates();
        if (tab == "mycollections")
            setStepper("mycollections")
        else if (tab == "myrequests")
            setStepper("myrequests")
        else 
            setStepper("mycollections")
        filterData(sampledata);
    },[])
    
    const sampledata = [
		{id:"304232321",name:"Transcript of Record",user:"Harold James H. Castillo",status:"pending",note:"" ,timestamp:"Novebmer 25, 2022"},
		{id:"304232322",name:"Transcript of record",user:"Dianne Chrystalin Brandez",status:"declined",note:"Ang ganda ni dianne" ,timestamp:"Novebmer 25, 2022"},
		{id:"304232323",name:"Certificates",user:"Jon Angelo Llagas",status:"completed",note:"" ,timestamp:"Novebmer 25, 2022"},
		{id:"304232324",name:"Transcript of record",user:"Gian Carlo Dela Cruz",status:"cancelled",note:"I love you wife" ,timestamp:"Novebmer 25, 2022"},
		{id:"304232325",name:"Certificates",user:"JM Hipolito",status:"approved",note:"" ,timestamp:"Novebmer 25, 2022"},
		{id:"304232326",name:"Grades",user:"David Embile",status:"approved",note:"" ,timestamp:"Novebmer 25, 2022"},
		{id:"304232327",name:"Transcript of record",user:"Shiba Castillo",status:"verified",note:"" ,timestamp:"Novebmer 25, 2022"}
	];
    const keys = ["pending","approved","declined","paid","verified","processing","cancelled","completed"];
    const filterData = (data) => {
        setOwnedDocuments(data.filter((item)=> item.status?.toString().toLowerCase().includes(keys[7])));
        setRequests(data.filter((item)=>[keys[0],keys[1],keys[2],keys[3],keys[4],keys[5],keys[6]].some((key)=> item.status?.toString().toLowerCase().includes(key))));
    }

    const [ownedDocuments, setOwnedDocuments] = useState();
    const [request, setRequests] = useState();

    // if (!ownedCertificates)
	// 	return <div>loading... No OwnedCertificates Found</div>;

    return (
        <div className='Container' id='Documents'>
            <section  className='Container__Content'>
                <div className='Container__Title__Container'>
                    <h2 className='Container__Title'>Documents</h2>
                    <h5 className='SectionSubTitle'>My Collections of Documents</h5>
                </div>
                <div className='Stepper'>
                    <Button 
                        variant={
                            stepper === 'mycollections'
                                ? 'contained'
                                : ''
                        }
                        onClick={() => setStepper('mycollections')}
                    >
                        My Collections
                    </Button>
                    <Button 
                        variant={
                            stepper === 'myrequests'
                                ? 'contained'
                                : ''
                    }
                    onClick={() => setStepper('myrequests')}
                    >
                        My Requests	
                    </Button>
                </div>
                <div className='Container__Section'>
                    <div  className='Container__Navigation'>
                        <div className='Container__Navigation__left'>
                            <SearchInput />
                        </div>
                        <div className='Container__Navigation__Right'>
                            <IconButton aria-expanded={open ? 'true' : undefined} 
                                onClick={(event) => {
                                setAnchorElDropDownDocument(event.currentTarget);
                                }
                            }>
                                <FilterAltIcon />
                            </IconButton>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorElDropDownDocument}
                                open={open}
                                onClose={() => {
                                    setAnchorElDropDownDocument(null);
                                }}
                            >
                                <div id='SelectDocumentDropdown'>
                                    <h5 id='SelectDocumentDropdown__Title'>Select Document</h5>
                                    <div className='Wrapper__Card'>
                                    
                                    </div>
                                </div>
                            </Menu>
                        </div>
                    </div>
                    
                </div>
                {stepper==="mycollections"?
                    <div className='Container_Section'>
                        <div className='Wrapper__Card'>
                            {/* {(ownedCertificates.length === 0 )?
                                <>
                                    <div className='EmtpyCard'>
                                        <div>
                                            <img src={Empty} alt="" />
                                            <p>No certificates available!</p>
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    {ownedCertificates.length > 0 &&
                                        ownedCertificates.map((ownedCertificate) => {
                                            return (
                                                <Card
                                                    key={ownedCertificate.certificateId}
                                                    id={ownedCertificate.certificateId}
                                                    title={ownedCertificate.title}
                                                    type={'certificate'}
                                                    image={`https://icertify.infura-ipfs.io/ipfs/${ownedCertificate.ipfsCID}`}
                                                />
                                                // <Card
                                                //     key={ownedCertificate.certificateId}
                                                //     id={ownedCertificate.certificateId}
                                                //     type={'certificate'}
                                                //     image={`https://icertify.infura-ipfs.io/ipfs/${ownedCertificate.ipfsCID}`}
                                                // />
                                            );
                                    })}
                                </>
                            } */}
                        </div>
                    </div>
                :""}
                {stepper==="myrequests"?
                    <div className='Container_Section'>
                        <div className='Wrapper__Card'>
                            {request.map((request) => {
                                return <>
                                    <RequesctCard data={request} keys={keys}/>
                                </>
                            })}
                        </div>
                    </div>
                :""}
                
            </section>
        </div>
    )
}

function RequesctCard({data}){
    const [status,setStatus] = useState("Failed");
    const [anchorElNote, setAnchorElNote] = React.useState(null);
	const openNote = Boolean(anchorElNote);
    useEffect(()=> {
        switch (data.status) {
            case "pending"  :
                setStatus("Pending")
                break;
            case "approved"  :
                setStatus("Payment")
                break;
            case "paid" || "processing"  :
                setStatus("Processing")
                break;
            case "declined" || "cancelled" :
                setStatus("Failed")
                break;
            default:
                break;
        }
    },[])


    return <>
        <div className='RequestCardUser'>
            <div className='RequestCardUser__Header'>
                <Avatar className='RequestCardUser__Header__Avatar'/>
                <h6 className='RequestCardUser__Header__InstitutionName'>STI College Marikina</h6>
            </div>
            <div className='RequestCardUser__Body'>

                <h5>Transcript of Record</h5>
                <p className='BodyText3 RequestCardUser__Body__Status' id={status}>{status}</p>
                <ul className='RequestCardUser__Body__MoreInfo'>
                    <li>
                        <EventIcon/>
                        <p><span>October 25, 2022</span> <span>Requested</span></p>
                    </li>
                    <li>
                        <SellIcon/>
                        <p>500 pesos</p>
                    </li>
                </ul>
            </div>
            {(status === "Failed")?<>
                <div className='RequestCardUser__Footer'>
                    <Button 
                        className='RequestCardUser__Footer__Note' 
                        variant='contained' 
                        onClick={(event) => {
                            setAnchorElNote(event.currentTarget);
                        }}
                    >View Note
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorElNote}
                        open={openNote}
                        onClose={() => {
                            setAnchorElNote(null);
                        }}
                    >
                        <div id='SelectDocumentDropdown'>
                            <h5 id='SelectDocumentDropdown__Title'>Note:</h5>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis doloremque ullam magni nam sunt optio voluptas autem excepturi explicabo nesciunt?</p>
                        </div>
                    </Menu>
                </div>
            </>
            :
            <>
                <div className='RequestCardUser__Footer'>
                    <div className='RequestCardUser__Footer__Buttons'>
                        <Button className='RequestCardUser__Footer__Cancel' variant='contained'>Cancel</Button>
                        {(status === "Payment")?<Button variant='contained' >Pay</Button>:<></>}
                        {(status === "Pending")?<Button variant='contained' disabled>Pay</Button>:<></>}
                    </div>
                </div>
            </>
            }


            
        </div>
    </>
}
export default Documents


