import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './MintTransfer.scss';
import './../../styles/Main.scss';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchInput from '../../components/SearchInput/SearchInput';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MintTransferCard from './MintTransferCard';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Chip from '@mui/material/Chip';
import { ethers } from 'ethers';
import axios from '../../utils/axios';

function MintTransfer() {
	const { id } = useParams();
	const [TabActive, setTabActive] = useState('Pending');
	// const [open, setOpen] = React.useState(false);
	// const [event, setEvent] = useState(null);
	// const [participants, setParticipants] = useState(null);
	const navigate = useNavigate();

	
	const [anchorElDropDownDocument, setAnchorElDropDownDocument] = React.useState(null);
	const open = Boolean(anchorElDropDownDocument);
	const handleClick = (event) => {
		setAnchorElDropDownDocument(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorElDropDownDocument(null);
	};
	

	let event = {
		"_id":{
		   "$oid":"63eb5f728bded2c850c93231"
		},
		"eventId":"eHMmcj5M",
		"type":"onsite",
		"title":"Thesis Defense",
		"description":"Defend your thesis",
		"location":"STI",
		"date":{
		   "start":{
			  "$numberDouble":"1676327280000.0"
		   },
		   "end":{
			  "$numberDouble":"1676406180000.0"
		   }
		},
		"canClaimCertificate":true,
		"status":"active",
		"isAcceptingVolunteer":true,
		"tags":[
		   
		],
		"regularPrice":{
		   "$numberInt":"3"
		},
		"premiumPrice":{
		   "$numberInt":"1"
		},
		"volunteerRequests":[
		   
		]
	}

	let participants = [
		// {
		//    "member":{
		// 		"address": "0xfhb54089hge4rtig",
		// 		"name" : "Jane Doe",
		// 	  	"$oid":"63eb5f308bded2c850c93210"
		//    },
		//    "role":"Participant",
		//    "certificateProcessed":false,
		//    "_id":{
		// 	  "$oid":"63eb5f818bded2c850c93249"
		//    }
		// },
		// {
		//    "member":{
		// 		"address": "0xfhb54089hge4rtig",
		// 		"name" : "John Doe",
		// 	  	"$oid":"63eb5f468bded2c850c9321c"
		//    },
		//    "role":"Participant",
		//    "certificateProcessed":false,
		//    "_id":{
		// 	  "$oid":"63eb5f948bded2c850c93268"
		//    }
		// },
		// {
		//    "member":{
		// 		"address": "0xfhb54089hge4rtig",
		// 		"name" : "JR Doe",
		// 	  	"$oid":"63f496e780ce7fae3542be12"
		//    },
		//    "role":"Participant",
		//    "certificateProcessed":true,
		//    "_id":{
		// 	  "$oid":"63fb0307153eb3004953dd74"
		//    }
		// }
	]
	// Values for metamask credentials
	let provider, signer, contract;

	// useEffect(() => {
	// 	async function requestAccount() {
	// 		return await window.ethereum.request({
	// 			method: 'eth_requestAccounts'
	// 		});
	// 	}
	// 	requestAccount();
	// 	provider = new ethers.providers.Web3Provider(window.ethereum);
	// 	signer = provider.getSigner();
	// 	contract = new ethers.Contract(
	// 		'0x121c4600A84F5624e86AfC869dbaC39E535Dd26C',
	// 		contractBuild.abi,
	// 		signer
	// 	);

	// 	axios
	// 		.get(`events/${id}/participants`)
	// 		.then(({ data }) => setParticipants(data));
	// 	axios.get(`events/${id}`).then(({ data }) => setEvent(data));
	// }, []);






	function TabView() {
		switch (TabActive) {
			case 'Pending':
				if (participants.length === 0)
					return <div></div>;
				return (
					<>

						<h5 className='TabView__Title'>Transcript of Record</h5>
						<div className='Wrapper__Card'>
							{participants.length > 0 &&
							participants.map((participant) => {
								return (
									<>
										{!participant.certificateProcessed ? (
											<MintTransferCard
												key={
													participant.member
														.walletAddress
												}
												address={
													participant.member
														.walletAddress
												}
												name={
													participant.member.name
														.firstName +
													' ' +
													participant.member.name
														.lastName
												}
												type='pending'
												role={participant.role}
												eventId={event.eventId}
												eventTitle={event.title}
												date={event.date.start}
											/>
										) : (
											''
										)}
									</>
								);
							})}
						</div>
						
					</>
				);
				break;
			case 'Complete':
				return (
					<>
						{participants.length > 0 &&
							participants.map((participant) => {
								return (
									<>
										{participant.certificateProcessed ? (
											<MintTransferCard
												key={
													participant.member
														.walletAddress
												}
												address={
													participant.member
														.walletAddress
												}
												name={
													participant.member.name
														.firstName +
													' ' +
													participant.member.name
														.lastName
												}
												role={participant.role}
												eventId={event.eventId}
												eventTitle={event.title}
												date={event.date.start}
												handler={() =>
													navigate(
														`/m/${participant.member.walletAddress}`
													)
												}
											/>
										) : (
											''
										)}
									</>
								);
							})}
					</>
				);
				break;
			default:
				break;
		}
	}


	const DocumentSelection = [
		{id:"3042332",name:"Transcript of Record",totalRequests:45},
		{id:"3042332",name:"Grades",totalRequests:45},
        // {id:"3042332",name:"Transcript of Record",totalRequests:45},
		// {id:"3042332",name:"Grades",totalRequests:45},
        // {id:"3042332",name:"Transcript of Record",totalRequests:45},
		// {id:"3042332",name:"Grades",totalRequests:45},
        // {id:"3042332",name:"Transcript of Record",totalRequests:45},
		// {id:"3042332",name:"Grades",totalRequests:45},
        // {id:"3042332",name:"Transcript of Record",totalRequests:45},
		// {id:"3042332",name:"Grades",totalRequests:45},
	]

	const [toManage,setToManage] = useState([]);

	function Automatic(){
		DocumentSelection.map((document) => {
			document.status=false;
			// console.log(document);
			setToManage([...toManage,  document])
			
		})
		console.log(toManage);
		// const newEntry = {};
		// setToManage([...toManage,newEntry]);
	}
	
	// if (!event || !participants) return <div>loading...</div>;
	return (
		<>
			<div className='AdminPanelContainer'>
				<section id='CreateDocument'>
					<div id='Header'>
						<h2 className='SectionTitle' onClick={()=>Automatic()}> 
							Generate Documents
						</h2>
						<h5>Create all the requested Documents</h5>
					</div>
					<div id='Body'>
						<div id='TabsNav'>
							<Button
								variant={
									TabActive === 'Pending'
										? 'contained'
										: ''
								}
								onClick={() => setTabActive('Pending')}
							>
								Pending
							</Button>
							<Button
								variant={
									TabActive === 'Complete'
										? 'contained'
										: ''
								}
								onClick={() => setTabActive('Complete')}
							>
								Complete
							</Button>
						</div>
						<div id='TabsView'>
							<div id='ListTools'>
								<div id='SearchInputHolder'>
									<SearchInput />
								</div>
								<IconButton 
									aria-controls={open ? 'basic-menu' : undefined}
									aria-haspopup="true"
									aria-expanded={open ? 'true' : undefined}
									onClick={handleClick}
								>
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
										{DocumentSelection.map((document) => {
											return<>
												<Chip id="SelectDocumentDropdown__Chip" label={document.name} onClick={()=>{}} />
											</>
										})}
										</div>
									</div>
								</Menu>
								<Button variant='contained' href='/a/document/create'>Generate Document</Button>
							</div>
							<TabView />
						</div>
					</div>
				</section>
				<div id='SideContent'>
					<div className='Panel__Container'>
						<h6 className='Panel__Title'>Document Analytics</h6>
						<h5>Total Documents</h5>
						<p>[ ]</p>
						<h5>Total Requests</h5>
						<p>[ ]</p>
					</div>
				</div>
			</div>
		</>	
	);
}

export default MintTransfer;
