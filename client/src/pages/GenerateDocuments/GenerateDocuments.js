import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './GenerateDocuments.scss';
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
import axiosInstance from '../../utils/axios';

function GenerateDocuments() {

	const [TabActive, setTabActive] = useState('Pending');
	const [requests, setRequests] = useState();

	const navigate = useNavigate();

	const [anchorElDropDownDocument, setAnchorElDropDownDocument] = React.useState(null);
	const open = Boolean(anchorElDropDownDocument);
	const handleClick = (event) => {
		setAnchorElDropDownDocument(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorElDropDownDocument(null);
	};

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
                    console.log(response.data)
				});
		};

        // Execute Functions
        fetchDocumentRequests();
    }, [])

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
			case 'Pending':
				if (requests.length === 0)
					return <div></div>;
				return (
					<>
						{/* <h5 className='TabView__Title'>Transcript of Record</h5> */}
						<div className='Wrapper__Card'>
							{requests.length > 0 &&
							requests.map((request) => {
								return (
									<>
										{request.status=='pending' ? (
											<MintTransferCard
												key={
													request.requestId
												}
												address={
													request.requestor
														.walletAddress
												}
												name={
													request.requestor.name
														.firstName +
													' ' +
													request.requestor.name
														.lastName
												}
												type='pending'
												title={request.details.docId}
												date={request.createdAt}
                                                action={()=>ProcessRequest(request)}
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
						<div className='Wrapper__Card'>
							{requests.length > 0 &&
							requests.map((request) => {
								return (
									<>
										{request.status=='approved' ? (
											<MintTransferCard
												key={
													request.requestId
												}
												address={
													request.requestor
														.walletAddress
												}
												name={
													request.requestor.name
														.firstName +
													' ' +
													request.requestor.name
														.lastName
												}
												type='approved'
												title={request.details.docId}
												date={request.createdAt}
                                                action={()=>ProcessRequest(request)}
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
	
	if (!requests) return <div>loading...</div>;

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
							<TabView requests={requests}/>
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

export default GenerateDocuments;
