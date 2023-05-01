import React,{useEffect,useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './Documents.scss'

import SearchInput from '../../components/SearchInput/SearchInput';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Menu from '@mui/material/Menu';
import { Avatar } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import SellIcon from '@mui/icons-material/Sell';
import TextField from '@mui/material/TextField';

import axiosInstance from '../../utils/axios';

function Documents(){

    const {tab} = useParams();
    const navigate = useNavigate();

    const [requests, setRequests] = useState();
    const [myRequest, setMyRequests] = useState();
    const [toPay, setToPay] = useState();
    const [toRecieve, setToRecieve] = useState();
    const [failedtransactions, setFailedtransactions] = useState();

	
    const [anchorElDropDownDocument, setAnchorElDropDownDocument] = useState(null);
    const open = Boolean(anchorElDropDownDocument);
    const [stepper, setStepper] = useState('JoinedInstitutions');
    
    
    
	
    useEffect(()=> {
        if (tab == "myrequests")
            setStepper("myrequests")
        else if (tab == "topay")
            setStepper("topay")
        else if (tab == "torecieve")
            setStepper("torecieve")
        else if (tab == "failedtransactions")
            setStepper("failedtransactions")
        else 
            setStepper("myrequests")
        
        fetchDocumentRequests();
        
    },[])
    
    const keys = ["pending","approved","declined","paid","verified","processing","cancelled","completed"];

    const filterData = (data) => {
        setMyRequests(data.filter((item)=> [keys[0],keys[3]].some((key)=> item.status?.toString().toLowerCase().includes(key))))
        setToPay(data.filter((item)=> item.status?.toString().toLowerCase().includes(keys[1])));
        setToRecieve(data.filter((item)=> [keys[4],keys[5]].some((key)=> item.status?.toString().toLowerCase().includes(key))));
        setFailedtransactions(data.filter((item)=> [keys[2],keys[6]].some((key)=> item.status?.toString().toLowerCase().includes(key))))
    }

    // Retrieves Document Requests
    const fetchDocumentRequests = async () => {
        await axiosInstance
            .get(`requests`,{
                params: {
                    requestType: 'document'
                }
            })
            .then((response) => { 
                setRequests(response.data)
                filterData(response.data);
                console.log(response.data)
            });
    };

    const ProcessRequest = async (request, action) => {
        try {
            console.log(request)
            const formData = new FormData();
            formData.append('body', JSON.stringify({
                requestId: request.requestId,
                status: action,
            }))

            await axiosInstance.patch(
                `requests`,
                formData,
                {headers: {
                      'Content-Type': 'multipart/form-data'
                }}
            )
            .then((response)=>{
                alert(`Document ${action}!`)
                console.log(response.data)
                fetchDocumentRequests();
            })
        } catch (err) {      
            console.error(err.message);
        }
    }

    if (!requests) return <div>loading...</div>;

    return (
        <div className='Container' id='Documents'>
            <section  className='Container__Content'>
                <div className='Container__Title__Container'>
                    <h2 className='Container__Title'>Document Requests</h2>
                    <h5 className='SectionSubTitle'>My Collections of Document Requests</h5>
                </div>
                <div className='Stepper'>
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
                    <Button 
                        variant={
                            stepper === 'topay'
                                ? 'contained'
                                : ''
                    }
                    onClick={() => setStepper('topay')}
                    >
                        To Pay 
                    </Button>
                    <Button 
                        variant={
                            stepper === 'torecieve'
                                ? 'contained'
                                : ''
                    }
                    onClick={() => setStepper('torecieve')}
                    >
                        To Recieve 
                    </Button>
                    <div className='Stepper__Cut'></div>
                    <Button 
                        variant={
                            stepper === 'failedtransactions'
                                ? 'contained'
                                : ''
                    }
                    onClick={() => setStepper('failedtransactions')}
                    >
                        Failed Transactions
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
            
                
                <div className='Container_Section'>
                    <div className='Wrapper__Card'>
                        {stepper==="myrequests"?<>
                            {myRequest.map((request) => {
                                return <>
                                    <RequestCard data={request} type={stepper}/>
                                </>
                            })}
                        </>:""}
                        {stepper==="topay"?<>
                            {toPay.map((request) => {
                                return <>
                                    <RequestCard data={request} type={stepper}/>
                                </>
                            })}
                        </>:""}
                        {stepper==="torecieve"?<>
                            {toRecieve.map((request) => {
                                return <>
                                    <RequestCard data={request}  type={stepper}/>
                                </>
                            })}
                        </>:""}
                        {stepper==="failedtransactions"?<>
                            {failedtransactions.map((request) => {
                                return <>
                                    <RequestCard data={request}  type={stepper}/>
                                </>
                            })}
                        </>:""}
                        
                    </div>
                </div>
                
            </section>
        </div>
    )

    function RequestCard({data,type}){
        const [status,setStatus] = useState("Failed");
        const [anchorElNote, setAnchorElNote] = React.useState(null);
        const openNote = Boolean(anchorElNote);
        useEffect(()=> {
            switch (type) {
                case "myrequests"  :
                    setStatus("Pending")
                    break;
                case "topay"  :
                    setStatus("Payment")
                    break;
                case "torecieve"  :
                    setStatus("Processing")
                    break;
                case "failedtransactions" :
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
                    <h6 className='RequestCardUser__Header__InstitutionName'>{data.institution.name}</h6>
                </div>
                <div className='RequestCardUser__Body'>
                    <h5>Transcript of Record</h5>
                    <p className='BodyText3 RequestCardUser__Body__Status' id={status}>{(data.status).toUpperCase()}</p>
                    <ul className='RequestCardUser__Body__MoreInfo'>
                        <li>
                            <EventIcon/>
                            <p><span>{data.createdAt}</span> <span>Requested</span></p>
                        </li>
                        <li>
                            <SellIcon/>
                            <p>{data.details.offeredDoc.price} PHP</p>
                        </li>
                    </ul>
                </div>
                {status==="Processing"?<>
                
                </>:<>
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
                                    <p>{(!data.details?.note) ? 'None' : data.details.note}</p>
                                </div>
                            </Menu>
                        </div>
                    </>
                    :
                    <>
                        <div className='RequestCardUser__Footer'>
                            <div className='RequestCardUser__Footer__Buttons'>
                                <Button 
                                    className='RequestCardUser__Footer__Cancel' 
                                    variant='contained' 
                                    onClick={()=>ProcessRequest(data, 'cancelled')}
                                >
                                    Cancel
                                </Button>
                                {(status === "Payment")?<Button variant='contained' onClick={()=>navigate(`/requests/pay/${data.requestId}`)}>Pay</Button>:<></>}
                                {(status === "Pending")?<Button variant='contained' disabled>Pay</Button>:<></>}
                            </div>
                        </div>
                    </>
                    }
                </>}
            </div>
        </>
    }
}


export default Documents


