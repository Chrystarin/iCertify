import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './GenerateDocuments.scss';
import './../../styles/Main.scss';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchInput from '../../components/SearchInput/SearchInput';
import MintTransferCard from './MintTransferCard';
import Menu from '@mui/material/Menu';
import { ethers } from 'ethers';
import axiosInstance from '../../utils/axios';
import SidePanelList from '../../components/SidePanelList/SidePanelList';
import InstitutionCardDesign from '../../images/Resources/InstitutionCardDesign.png'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

function GenerateDocuments() {
    
    // Constants Declaration
    const {tab} = useParams();
    const navigate = useNavigate();

    // States Declaration
	const [requests, setRequests] = useState();
	const [TabActive, setTabActive] = useState("verifyrequest");

    // States for Filtered data per tabs and SidePanel
	// const [requestVerify, setRequestVerify] = useState();
	// const [waitingForPayment, setwaitingForPayment] = useState();
	// const [requestPayment, setRequestPayment] = useState();
	// const [paymentToVerify, setPaymentToVerify] = useState();
	// const [processing, setprocessing] = useState();
	// const [completed, setCompleted] = useState();
	// const [failedRequest, setFailedRequest] = useState();

    

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
                console.log(response.data)
                filterData(response.data)
            });
    };

	const [anchorElDropDownDocument, setAnchorElDropDownDocument] = React.useState(null);
	const open = Boolean(anchorElDropDownDocument);
	
	const handleClose = () => {
		setAnchorElDropDownDocument(null);
	};

	
	const sampledata = [
		{id:"304232321",name:"Transcript of Record",user:"Harold James H. Castillo",status:"pending",note:"" ,timestamp:"Novebmer 25, 2022"},
		{id:"304232322",name:"Transcript of record",user:"Dianne Chrystalin Brandez",status:"declined",note:"Ang ganda ni dianne" ,timestamp:"Novebmer 25, 2022"},
		{id:"304232323",name:"Certificates",user:"Jon Angelo Llagas",status:"completed",note:"" ,timestamp:"Novebmer 25, 2022"},
		{id:"304232324",name:"Transcript of record",user:"Gian Carlo Dela Cruz",status:"cancelled",note:"I love you wife" ,timestamp:"Novebmer 25, 2022"},
		{id:"304232325",name:"Certificates",user:"JM Hipolito",status:"approved",note:"" ,timestamp:"Novebmer 25, 2022"},
		{id:"304232326",name:"Grades",user:"David Embile",status:"approved",note:"" ,timestamp:"Novebmer 25, 2022"},
		{id:"304232327",name:"Transcript of record",user:"Shiba Castillo",status:"verified",note:"" ,timestamp:"Novebmer 25, 2022"}
	];

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

    const ProcessRequest = async (request, action) => {
        try {
            const formData = new FormData();
            formData.append('body', JSON.stringify({
                requestId: request.requestId,
                status: action,
            }))

            await axiosInstance.patch(
                `requests`,
                formData
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

	function TabView({requests}) {
		switch (TabActive) {
			case 'verifyrequest' :
				if (requestPending.length === 0)return <div>No request</div>;
				return<>
					<ul className='Wrapper__Card'>
						{requestPending.map((request) => {
							return <>
								{request.status==keys[0] ? <>
									<li key={request.requestId}>
										<MintTransferCard
                                            name={request.requestor.name.firstName + " " + request.requestor.name.lastName}
                                            type={keys[0]}
                                            title={request.details.offeredDoc.title}
                                            date={request.createdAt}
                                            action={()=>ProcessRequest(request, 'approved')}
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
                                            date={request.createdAt}
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
                                            date={request.createdAt}
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

	if (!requests) return <div>loading...</div>;

	return (
		<>
			<div className='AdminPanelContainer'>
				<section className='AdminPanelContainer__Content' id='CreateDocument'>
					<div id='Header'>
						<h2 className='SectionTitle' > 
							Make Documents
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
								<Button variant='contained' href='/documents/create'>Generate Document</Button>
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
								<h5>1</h5>
								<p className='BodyText2'>Document Offered</p>
							</div>
							<div className="div2">
								<h5>7</h5>
								<p className='BodyText2'>Verify</p>
							</div>
							<div className="div3">
								<h6>40</h6>
								<p className='BodyText3'>Destributed</p>
							</div>
							<div className="div4"> 
								<h6>5</h6>
								<p className='BodyText3'>Denied</p>
							</div>
							<div className="div5"> 
								<h6>1</h6>
								<p className='BodyText3'>Requests</p>
							</div>
							<div className="div6"> 
								<h6>5</h6>
								<p className='BodyText3'>Payment</p>
							</div>
						</div>
						<div id='DocumentsAnalytics__Member' >
							<PeopleAltIcon id="DocumentsAnalytics__Member__Avatar"/>
							<div>
								<h5>300</h5>
								<p className='BodyText3'>Members</p>
							</div>
						</div>
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
		</>	
	);
}

export default GenerateDocuments;