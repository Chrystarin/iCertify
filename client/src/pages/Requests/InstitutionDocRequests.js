import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './InstitutionDocRequests.scss';
import './../../styles/Main.scss';
import Loading from '../../components/Loading/Loading';
import Button from '@mui/material/Button';
import SearchInput from '../../components/SearchInput/SearchInput';
import MintTransferCard from './RequestCard';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import Menu from '@mui/material/Menu';
import axiosInstance from '../../utils/axios';
import SidePanelList from '../../components/SidePanelList/SidePanelList';
import InstitutionCardDesign from '../../images/Resources/InstitutionCardDesign.png'
import SnackbarComponent from '../../components/Snackbar/SnackbarComponent';
import moment from 'moment';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
function InstitutionDocRequests() {
    
    // Constants Declaration
    const {tab} = useParams();
    const navigate = useNavigate();

    // States Declaration
	const [requests, setRequests] = useState();
	const [TabActive, setTabActive] = useState("verifyrequest");
    const [selectMultiple, setSelectMultiple] = useState(false);
    const [selectMultipleValue,setSelectMultipleValue]= useState([])

	// Excecutes on page load
    useEffect(() => {
        // Execute Functions
        fetchDocumentRequests();

        if (tab == "verifyrequest")
            setTabActive("verifyrequest")
        else if (tab == "verifypayment")
            setTabActive("verifypayment")
        else if (tab == "toprocess")
            setTabActive("toprocess")
        else 
            navigate("/error")
    }, [])

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
                filterData(response.data)
            });
    };

	const [anchorElDropDownDocument, setAnchorElDropDownDocument] = React.useState(null);
	const open = Boolean(anchorElDropDownDocument);
	
	const handleClose = () => {
		setAnchorElDropDownDocument(null);
	};

    const [requestPending, setRequestPending] = useState();
    const [requestApproved, setRequestApproved] = useState();
    const [requestPaid, setRequestPaid] = useState();
    const [requestVerified, setRequestVerified] = useState();
    const [requestProcessing, setRequestProcessing] = useState();
    const [requestCompleted, setRequestCompleted] = useState();
    const [requestFailed, setRequestFailed] = useState();

    // Values for Filter Keys
    const keys = ["pending","approved","declined","paid","verified","processing","cancelled","completed"];

	const filterData = (data)=>{
		setRequestPending(data.filter((item)=> item.status?.toString().toLowerCase().includes(keys[0])));
        setRequestApproved(data.filter((item)=> item.status?.toString().toLowerCase().includes(keys[1])));
        setRequestPaid(data.filter((item)=> item.status?.toString().toLowerCase().includes(keys[3])));
        setRequestVerified(data.filter((item)=> item.status?.toString().toLowerCase().includes(keys[4])));
        setRequestProcessing(data.filter((item)=> item.status?.toString().toLowerCase().includes(keys[5])));
        setRequestCompleted(data.filter((item)=> item.status?.toString().toLowerCase().includes(keys[7])));
		setRequestFailed(data.filter((item)=>[keys[2],keys[6]].some((key)=> item.status?.toString().toLowerCase().includes(key))));
	}

	const [openSnackBar, setOpenSnackBar] = React.useState({
		open:false,
		type:"",
		note:""
	});
    const ProcessRequest = async (request, action, note) => {
        try {
            const formData = new FormData();
            formData.append('body', JSON.stringify({
                requestId: request.requestId,
                status: action,
                note: (!note ? '' : note)
            }))

            await axiosInstance.patch(
                `requests`,
                formData
            )
            .then((response)=>{
				setOpenSnackBar(openSnackBar => ({
					...openSnackBar,
					open:true,
					type:"info",
					note:`Document ${action}!`
				}))
                console.log(response.data)
                fetchDocumentRequests();
            })
        } catch (err) {      
			const errmsg = err.message;
			setOpenSnackBar(openSnackBar => ({
				...openSnackBar,
				open:true,
				type:"error",
				note:errmsg
			}))
        }
    }

	function TabView() {
		switch (TabActive) {
			case 'verifyrequest' :
				if (requestPending.length === 0)return <div>No request</div>;
				return<>
					<ul className='Wrapper__Card'>
						{requestPending.map((request) => {
							return <>
								{request.status==keys[0] ? <>
									<li 
                                        key={request.requestId}
                                    >
										<MintTransferCard
                                            name={request.requestor.name.firstName + " " + request.requestor.name.lastName}
                                            type={keys[0]}
                                            title={request.details.offeredDoc.title}
                                            date={moment(request.createdAt).format('LL')}
                                            image={request.requestor.photo}
                                            decline={(e)=>ProcessRequest(request, 'declined', e)}
                                            action={()=>ProcessRequest(request, 'approved')}
                                            id={request.requestor.walletAddress}
                                            status={request.status}
                                            multipleSelectStatus={selectMultiple}
                                            requestId={request.requestId}
                                            setMultipleSelectValue={setSelectMultipleValue}
                                            MultipleSelectValue={selectMultipleValue}
										/>
									</li>
								</> : ""}
							</>
							;
						})}
					</ul>
				</>
				break;
			case 'verifypayment':
				if (requestPaid.length === 0)return <div>No request</div>;
				return<>
					<ul className='Wrapper__Card'>
						{requestPaid.map((request) => {
							return <>
								{request.status==keys[3] ? <>
									<li key={request.requestId}>
										<MintTransferCard
                                            name={request.requestor.name.firstName + " " + request.requestor.name.lastName}
                                            type={keys[3]}
                                            title={request.details.offeredDoc.title}
                                            date={moment(request.createdAt).format('LL')}
                                            image={request.requestor.photo}
                                            paymentProof={request.details.proof}
                                            action={()=>ProcessRequest(request, 'verified')}
                                            id={request.requestor.walletAddress}
                                            status={request.status}
										/>
									</li>
								</> : ""}
							</>
							;
						})}
					</ul>
				</>
				break;
			case 'toprocess':
				if (requestVerified.length === 0)return <div>No request</div>;
				return<>
					<ul className='Wrapper__Card'>
						{requestVerified.map((request) => {
							return <>
								{request.status==keys[4] ? <>
									<li key={request.requestId}>
										<MintTransferCard
                                            name={request.requestor.name.firstName + " " + request.requestor.name.lastName}
                                            type={keys[4]}
                                            title={request.details.offeredDoc.title}
                                            date={moment(request.createdAt).format('LL')}
                                            image={request.requestor.photo}
                                            action={()=>navigate(`/documents/request/${request.requestId}`)}
                                            id={request.requestor.walletAddress}
                                            status={request.status}
										/>
									</li>
								</> : ""}
							</>
							;
						})}
					</ul>
				</>
				break;
			default:
				break;
		}
	}

	if (!requests) return <Loading/>;

	return (
		<>
			<div className='AdminPanelContainer'>
				<section className='AdminPanelContainer__Content' id='CreateDocument'>
					<div id='Header'>
						<h2 className='SectionTitle' > 
							Manage Requests Documents
						</h2>
						<h5>Create all the requested Documents</h5>
					</div>


					<div id='Body'>
						<div id='TabsNav'>  
							<Button variant={TabActive === 'verifyrequest' ? 'contained':''}onClick={() => setTabActive('verifyrequest')}>Verify Requests [{requestPending.length}]</Button>
							<Button variant={TabActive === 'verifypayment' ? 'contained':''}onClick={() => setTabActive('verifypayment')}>Verify Payment [{requestPaid.length}]</Button>
							<Button variant={TabActive === 'toprocess'? 'contained': ''} onClick={() => setTabActive('toprocess')}>To Process [{requestVerified.length}]</Button>
						</div>
						<div id='TabsView'>
							<div id='ListTools'>
								<div id='SearchInputHolder'>
									<SearchInput />
								</div>
								<Button variant={selectMultiple?"text":""} endIcon={selectMultiple?<CheckBoxIcon/>:<CheckBoxOutlineBlankIcon/>} 
                                    onClick={()=>{
                                        selectMultiple === true ? setSelectMultipleValue({}):""; 
                                        setSelectMultiple(!selectMultiple)
                                    }}
                                >
                                    Select Multiple
								</Button>
								<Menu
									id="basic-menu"
									anchorEl={anchorElDropDownDocument}
									open={open}
									onClose={handleClose}
								>
									<div id='SelectDocumentDropdown'>
										<h5 id='SelectDocumentDropdown__Title'>Select Document</h5>
										<div className='Wrapper__Card'>
										{/* {DocumentSelection.map((document) => {
											return<>
												<Chip id="SelectDocumentDropdown__Chip" label={document.name} onClick={()=>{}} />
											</>
										})} */}
										</div>
									</div>
								</Menu>
								<Button variant='contained' href='/documents/requests/manual'>Generate Document</Button>
							</div>
                            <div>
                                {/* {selectMultipleValue.map((value)=>{
                                    return <p>{value}</p>
                                })} */}
                            </div>
							<TabView requests={requests}/>
						</div>
					</div>

				</section>

				<div className='AdminPanelContainer__SideContent'>
					<div className='Panel__Container' id='DocumentsAnalytics'>
						<div className='DocumentsAnalytics__Design'>
							<img src={InstitutionCardDesign} alt="" />
						</div>
						<h5 id='DocumentsAnalytics__Title'>Documents Analytics</h5>
						<div className="parent">
							<div className="div1">
								<h5>{requestPending.length + requestPaid.length}</h5>
								<p className='BodyText2'>To Verify</p>
							</div>
							<div className="div2">
								<h5>{requestVerified.length}</h5>
								<p className='BodyText2'>To Process</p>
							</div>
							<div className="div3">
								<h6>{requests.length}</h6>
								<p className='BodyText3'>Requests</p>
							</div>
							<div className="div4"> 
								<h6>{requestPaid.length}</h6>
								<p className='BodyText3'>Payments</p>
							</div>
							<div className="div5"> 
								<h6>{requestFailed.length}</h6>
								<p className='BodyText3'>Failed</p>
							</div>
							<div className="div6"> 
								<h6>{requestProcessing.length}</h6>
								<p className='BodyText3'>Processing</p>
							</div>
						</div>
						<div id='DocumentsAnalytics__Member' >
							<FileOpenIcon id="DocumentsAnalytics__Member__Avatar"/>
							<div>
								<h5>{requestCompleted.length}</h5>
								<p className='BodyText3'>Total Released Documents</p>
							</div>
						</div>
					<Button href={`/institutions/edit/payment`} variant='contained' fullWidth>Update Payment Method</Button>

					</div>

					{TabActive==="verifypayment"?<>
						<div className='Panel__Container' id="WaitingPayment">
							<h6 className='Panel__Title'>Waiting for Payment</h6>
							<SidePanelList data={requestApproved}
							/>
						</div>
					</>:<></>}

					{TabActive==="verifypayment"|| TabActive==="verifyrequest"?<>
						
						<div className='Panel__Container' id="WaitingPayment">
							<h6 className='Panel__Title'>Failed Transaction</h6>
							<SidePanelList data={requestFailed} failedtransaction/>
						</div>
					</>:<></>}


					{TabActive==="toprocess"?<>
						<div className='Panel__Container' id="WaitingPayment">
							<h6 className='Panel__Title'>Processing Requests</h6>
							<SidePanelList data={requestProcessing}/>
						</div>
						<div className='Panel__Container' id="WaitingPayment">
							<h6 className='Panel__Title'>Completed Transaction</h6>
							<SidePanelList data={requestCompleted}/>
						</div>
					</>:<></>}
				</div>
			</div>
			<SnackbarComponent open={openSnackBar} setter={setOpenSnackBar}/>
		</>	
	);
}

export default InstitutionDocRequests;