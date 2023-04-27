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

	const [requests, setRequests] = useState();
	const navigate = useNavigate();
	const {tab} = useParams();
	const [TabActive, setTabActive] = useState();
	// Excecutes on page load
    useEffect(() => {
        // Retrieves Document Requests
		const fetchDocumentRequests = async () => {
			await axiosInstance
				.get(`requests`,{
                    params: {
                        type: 'document'
                    }
                })
				.then((response) => { 
					setRequests(response.data)
				});
		};

        // Execute Functions
        fetchDocumentRequests();
		filterData(sampledata);
		!tab?  setTabActive("verifyrequest"): setTabActive(tab?.toLowerCase())
		
    }, [tab])

	const [anchorElDropDownDocument, setAnchorElDropDownDocument] = React.useState(null);
	const open = Boolean(anchorElDropDownDocument);
	
	const handleClose = () => {
		setAnchorElDropDownDocument(null);
	};

	const keys = ["pending","approved","declined","paid","verified","processing","cancelled","completed"];
	const sampledata = [
		{id:"304232321",name:"Transcript of Record",user:"Harold James H. Castillo",status:"pending"},
		{id:"304232322",name:"Transcript of record",user:"Dianne Chrystalin Brandez",status:"approved"},
		{id:"304232323",name:"Certificates",user:"Harold James H. Castillo",status:"approved"},
		{id:"304232324",name:"Transcript of record",user:"Harold James H. Castillo",status:"approved"},
		{id:"304232325",name:"Certificates",user:"Harold James H. Castillo",status:"approved"},
		{id:"304232326",name:"Grades",user:"Harold James H. Castillo",status:"approved"},
		{id:"304232327",name:"Transcript of record",user:"Harold James H. Castillo",status:"approved"}
	];
	const filterData = (data)=>{
		setRequestVerify(data.filter((item)=> item.status?.toString().toLowerCase().includes(keys[0])));
		setRequestPayment(data.filter((item)=> item.status?.toString().toLowerCase().includes(keys[1])));
		setRequestToProcess(data.filter((item)=> item.status?.toString().toLowerCase().includes(keys[3])));
	}

	//Filtered data per tabs 
	const [requestVerify,setRequestVerify] = useState()
	const [requestPayment,setRequestPayment] = useState()
	const [requestToProcess,setRequestToProcess] = useState()

    const ProcessRequest = async (request) => {
        try {
            await axiosInstance.patch(
                `requests`,
                JSON.stringify({ 
                    requestId: request.requestId,
                    status: 'approved'
                })
            )
            .then((res)=>{
                alert("Document Added!")
                console.log(res.data)
                window.location.reload(true); 
            })
        } catch (err) {      
            console.error(err.message);
        }
    }

	function TabView({requests}) {
		switch (TabActive) {
			case 'verifyrequest' :
				if (requestVerify.length === 0)return <div>No request</div>;
				return<>
					<ul className='Wrapper__Card'>
						{requestVerify.map((request) => {
							return <>
								{request.status==keys[0] ? <>
									<li key={request.id}>
										<MintTransferCard
										name={request.user}
										type={keys[0]}
										title={request.name}
										date={request.createdAt}
										action={()=>ProcessRequest(request)}
										id={request.id}
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
				if (requestPayment.length === 0)return <div>No request</div>;
				return<>
					<ul className='Wrapper__Card'>
						{requestPayment.map((request) => {
							return <>
								{request.status==keys[1] ? <>
									<li key={request.id}>
										<MintTransferCard
										name={request.user}
										type={keys[1]}
										title={request.name}
										date={request.createdAt}
										action={()=>ProcessRequest(request)}
										id={request.id}
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
				if (requestToProcess.length === 0)return <div>No request</div>;
				return<>
					<ul className='Wrapper__Card'>
						{requestToProcess.map((request) => {
							return <>
								{request.status==keys[1] ? <>
									<li key={request.id}>
										<MintTransferCard
										name={request.user}
										type={keys[1]}
										title={request.name}
										date={request.createdAt}
										action={()=>ProcessRequest(request)}
										id={request.id}
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
							<Button variant={TabActive === 'verifyrequest' ? 'contained':''}onClick={() => setTabActive('verifyrequest')}>Verify Requests [{requestVerify.length}]</Button>
							<Button variant={TabActive === 'verifypayment' ? 'contained':''}onClick={() => setTabActive('verifypayment')}>Verify Payment [{requestPayment.length}]</Button>
							<Button variant={TabActive === 'toprocess'? 'contained': ''} onClick={() => setTabActive('toprocess')}>To Process [{requestToProcess.length}]</Button>
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
								<Button variant='contained' href='/document/create'>Generate Document</Button>
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

					{TabActive==="verifyrequest"?<>
						
					</>:<></>}
					{TabActive==="verifypayment"?<>
						<div className='Panel__Container' id="WaitingPayment">
							<h6 className='Panel__Title'>Waiting for Payment</h6>
							<SidePanelList />
						</div>
					</>:<></>}
					{TabActive==="toprocess"?<>
					<div className='Panel__Container' id="WaitingPayment">
							<h6 className='Panel__Title'>Complete Transaction</h6>
							<SidePanelList />
						</div>
					</>:<></>}
					
				</div>
			</div>
		</>	
	);
}
export default GenerateDocuments;

// {request.status=='pending' ? (
// 	<MintTransferCard
// 		key={
// 			request.requestId
// 		}
// 		address={
// 			request.requestor
// 				.walletAddress
// 		}
// 		name={
// 			request.requestor.name
// 				.firstName +
// 			' ' +
// 			request.requestor.name
// 				.lastName
// 		}
// 		type='pending'
// 		title={request.details.docId}
// 		date={request.createdAt}
// 		action={()=>ProcessRequest(request)}
// 	/>