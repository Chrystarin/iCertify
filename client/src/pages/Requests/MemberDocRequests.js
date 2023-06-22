import React,{useEffect,useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './MemberDocRequests.scss'

import SearchInput from '../../components/SearchInput/SearchInput';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Menu from '@mui/material/Menu';
import { Avatar } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import SellIcon from '@mui/icons-material/Sell';
import TextField from '@mui/material/TextField';
import Loading from '../../components/Loading/Loading';
import axiosInstance from '../../utils/axios';
import SnackbarComponent from '../../components/Snackbar/SnackbarComponent';
import moment from 'moment';

function MemberDocRequests(){

    const {tab} = useParams();
    const navigate = useNavigate();

    const [requests, setRequests] = useState();
    const [myRequest, setMyRequests] = useState();
    const [toPay, setToPay] = useState();
    const [toRecieve, setToRecieve] = useState();
    const [failedtransactions, setFailedtransactions] = useState();
    const [openSnackBar, setOpenSnackBar] = React.useState({
        open:false,
        type:"",
        note:""
    });
	
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
        setMyRequests(data.filter((item)=> [keys[0]].some((key)=> item.status?.toString().toLowerCase().includes(key))))
        setToPay(data.filter((item)=> [keys[1],keys[3]].some((key)=> item.status?.toString().toLowerCase().includes(key))));
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
            },
            {
                withCredentials: true
            }
            
            )
            .then((response) => { 
                setRequests(response.data)
                filterData(response.data);
                console.log(response.data)
            });
    };

    const ProcessRequest = async (request, action) => {
        try {

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
                setOpenSnackBar(openSnackBar => ({
                    ...openSnackBar,
                    open:true,
                    type:'info',
                    note:`Document ${action}!`,
                    action: ()=>{}
                }));
                console.log(response.data)
                fetchDocumentRequests();
            })
        } catch (err) {      
            setOpenSnackBar(openSnackBar => ({
                ...openSnackBar,
                open:true,
                type:'info',
                note:`Document ${action}!`,
                action: ()=>{}
            }));
            console.error(err.message);
        }
    }

    if (!requests) return <Loading/>;

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
                        My Requests ({myRequest.length})
                    </Button>
                    <Button 
                        variant={
                            stepper === 'topay'
                                ? 'contained'
                                : ''
                    }
                    onClick={() => setStepper('topay')}
                    >
                        To Pay  ({toPay.length})
                    </Button>
                    <Button 
                        variant={
                            stepper === 'torecieve'
                                ? 'contained'
                                : ''
                    }
                    onClick={() => setStepper('torecieve')}
                    >
                        To Recieve ({toRecieve.length})
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
                        Failed Transactions ({failedtransactions.length})
                    </Button>
                </div>
                <div className='Container__Section'>
                    {/* <div  className='Container__Navigation'>
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
                    </div> */}
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
                                    <RequestCard data={request} type={stepper}/>
                                </>
                            })}
                        </>:""}
                        {stepper==="failedtransactions"?<>
                            {failedtransactions.map((request) => {
                                return <>
                                    <RequestCard data={request} type={stepper}/>
                                </>
                            })}
                        </>:""}
                        
                    </div>
                </div>
                <SnackbarComponent open={openSnackBar} setter={setOpenSnackBar}/>
                
            </section>
        </div>
    )

    function RequestCard({data,type}){
        const [anchorElNote, setAnchorElNote] = useState(null);
        const openNote = Boolean(anchorElNote);

        const [anchorElCancel, setAnchorElCancel] = useState(null);
        const openCancel = Boolean(anchorElCancel);


        const [cancelNote, setCancelNote] = useState();
    
        return <>
            <div className='RequestCardUser'>
                <div className='RequestCardUser__Header'>
                    <Avatar className='RequestCardUser__Header__Avatar'/>
                    <h6 className='RequestCardUser__Header__InstitutionName'>{data.institution.name}</h6>
                </div>
                <div className='RequestCardUser__Body'>
                    <h5>{data.details.offeredDoc.title}</h5>

                    {data.status === "pending"? <>
                        <p className='BodyText3 RequestCardUser__Body__Status' id="Pending">Verifying your request</p>
                    </>
                    :""}
                    {data.status === "approved"? <>
                        <p className='BodyText3 RequestCardUser__Body__Status' id="Payment">Ready for payment</p>
                    </>
                    :""}
                    {data.status === "paid"? <>
                        <p className='BodyText3 RequestCardUser__Body__Status' id="Verifying">Verifying your payment</p>
                    </>
                    :""}
                    {data.status === "verified"? <>
                        <p className='BodyText3 RequestCardUser__Body__Status' id="Processing">Your document is processing</p>
                    </>
                    :""}
                    {data.status === "declined"? <>
                        <p className='BodyText3 RequestCardUser__Body__Status' id="Failed">Your request is declined</p>
                    </>
                    :""}
                    {data.status === "cancelled"? <>
                        <p className='BodyText3 RequestCardUser__Body__Status' id="Failed">Your Request is cancelled</p>
                    </>
                    :""}
                    {data.status === "processing"? <>
                        <p className='BodyText3 RequestCardUser__Body__Status' id="Processing">Your document is processing</p>
                    </>
                    :""}
                    
                    {/* {type === "topay"? <>
                        
                    </>
                    :""} */}
                    

                    {/* <p className='BodyText3 RequestCardUser__Body__Status' id={status}>
                        {(data.status==='paid') ? "FOR VERIFICATION": (data.status).toUpperCase()}
                    </p> */}


                    <ul className='RequestCardUser__Body__MoreInfo'>
                        <li>
                            <EventIcon/>
                            <p><span>{moment(data.createdAt).format('lll')}</span></p>
                        </li>
                        <li>
                            <SellIcon/>
                            <p>{data.details.offeredDoc.price.$numberDecimal} PHP</p>
                        </li>
                    </ul>
                </div>
                {type === "torecieve"?<></>:<></>}
                {type === "failedtransactions"?<>
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
                </>:<>
                    {data.status === "pending" || data.status === "approved" || data.status === "paid"?<>
                        <div className='RequestCardUser__Footer'>
                            <div className='RequestCardUser__Footer__Buttons'>
                                {(data.status === "paid")?
                                    <Button 
                                        variant='contained' 
                                        disabled
                                    >
                                        Cancel
                                    </Button>
                                :<>
                                    <Button 
                                        className='RequestCardUser__Footer__Cancel' 
                                        variant='contained' 
                                        onClick={(event) => {
                                            setAnchorElCancel(event.currentTarget);
                                        }} 
                                    >
                                        Cancel
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorElCancel}
                                        open={openCancel}
                                        onClose={() => {
                                            setAnchorElCancel(null);
                                        }}
                                        MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <div className='CancelRequestDropdown'>
                                            <h6>Are you sure you want to cancel your request?</h6>
                                            <TextField 
                                                maxRows={6} 
                                                multiline 
                                                placeholder='Provide a reason of cancelation '
                                                id="outlined-basic"  
                                                variant="standard"
                                                value={cancelNote} 
                                                required 
                                                onChange={(e)=>setCancelNote(e.target.value)}
                                            />
                                            <div className='CancelRequestDropdown__Button'>
                                                <Button variant='contained' onClick={() => {
                                                    setAnchorElCancel(null);
                                                }}>Cancel</Button>
                                                <Button variant='contained' 
                                                onClick={()=>{
                                                    cancelNote?
                                                        ProcessRequest(data, 'cancelled')
                                                    : setOpenSnackBar(openSnackBar => ({
                                                        ...openSnackBar,
                                                        open:true,
                                                        type:'warning',
                                                        note: "Provide a reason!",
                                                        action: ()=>{}
                                                    }));
                                                }}>
                                                    Submit
                                            </Button>
                                            </div>
                                        </div>
                                    </Menu>
                                </>
                                    
                                    
                                }
                                
                                {(data.status === "approved")?<Button variant='contained' onClick={()=>navigate(`/requests/pay/${data.requestId}`)}>Pay</Button>:<>
                                    <Button variant='contained' disabled>Pay</Button>
                                </>}
                            </div>
                        </div>
                    </>:<></>}
                
                
                
                </>
                }
            </div>
        </>
    }
}


export default MemberDocRequests


