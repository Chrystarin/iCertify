import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import './Institutions.scss';

import ImagePosterSample from './../../images/placeholder/PosterSample.jpg';
import ImageAds from '../../images/Resources/Ads.png'
import axios from '../../config/axios';
import Button from '@mui/material/Button';
import InstitutionCard from '../../components/Card/InstitutionCard.js'


function Institutions() {
	const [isOpenPanel_Institution, seOpenPanel_Institution] = useState('FeaturedInstitutions');
		

	return (
		<section id='institutions'>
			<div className='Title__Div'>
				<h2 className='SectionTitle'>Institutions</h2>
				<h5 className='SectionSubTitle'>Collection of Education Institution</h5>
			</div>
			<div className='Navigation_Institution'>
				<div className='Navigation_Left'>
					<Button variant={
						isOpenPanel_Institution === 'FeaturedInstitutions'
							? 'contained'
							: ''
					}
					onClick={() => seOpenPanel_Institution('FeaturedInstitutions')}
					>
						Featured Institutions	
					</Button>
					<Button 
					variant={
						isOpenPanel_Institution === 'JoinedInstitutions'
							? 'contained'
							: ''
					}
					onClick={() => seOpenPanel_Institution('JoinedInstitutions')}
					>
						Joined Institutions
					</Button>
				</div>
				<div className='Navigation_Right'>
				</div>
			</div>
			<div id='Panel_institutions'>
				<Panel_institutions open={isOpenPanel_Institution} />
			</div>
		</section>
	);
}

function Panel_institutions(props) {
	const [JoinedInstitutions, setJoinedInstitutions] = useState(null);
	const [walletAddress, setWalletAddress] = useState('');
	const [institutions, setinstitutions] = useState(null);

	useEffect(() => {
		// Retrieves All institutions Data
		const fetchinstitutions = async () => {
			const response = await axios.get(`/events`).then((response) => {
				setinstitutions(response.data);
			});
		};

		// Retrieves Joined institutions Data
		const fetchJoinedinstitutions = async () => {
			const response = await axios
				.get(`members/${walletAddress}/institutions`)
				.then((response) => {
					setJoinedInstitutions(response.data);
				});
		};

		const addWalletListener = async () => {
			if (window.ethereum)
				window.ethereum.on('accountsChanged', (accounts) =>
					setWalletAddress(accounts[0])
				);
			else setWalletAddress('');
		};

		addWalletListener();
		fetchinstitutions();
		console.log(walletAddress);
	}, []);

	if (!institutions) return <div>loading...</div>;
	// if (!joinedinstitutions) return <div>loading... No Joined institutions</div>;

	switch (props.open) {
		case "FeaturedInstitutions":
			return  <FeaturedInstitution/>

		case "JoinedInstitutions":
			return (
				<JoinedInstitution/>
			);
		
		default:
			break;
	}
}
function FeaturedInstitution(){

	const Institutions = [
		{ name : 'STI College Marikina', address:"L. De Guzman St, Marikina, Metro Manila", totalMembers:"450", totalDocument:"3000",joinStatus: false},
		{ name : 'Ateneo de Manila', address:"L. De Guzman St, Marikina, Metro Manila", totalMembers:"450", totalDocument:"3000",joinStatus: false},
		{ name : 'OLOPSC', address:"L. De Guzman St, Marikina, Metro Manila", totalMembers:"450", totalDocument:"3000",joinStatus: true},
		{ name : 'APEC', address:"L. De Guzman St, Marikina, Metro Manila", totalMembers:"450", totalDocument:"3000",joinStatus: false},
		{ name : 'OLFU', address:"L. De Guzman St, Marikina, Metro Manila", totalMembers:"450", totalDocument:"3000",joinStatus: true},
	];

	return<>
		<div id='Container_Featuredinstitutions'>
			{/* <div id='Container_Ads_Featuredinstitutions'>
				<div id='Slider_Featuredinstitutions'>
					<a href='http://'>
						<img
							src={ImagePosterSample}
							alt=''
						/>
					</a>
				</div>
				<div id='Ads_Featuredinstitutions'>
					<img src={ImageAds} alt="" />
				</div>
			</div> */}
			<div className='InstitutionList'>
				<h5>Newest Institutions</h5>
				<div  className='Wrapper__Card'> 
					{Institutions.map((Institution) => (
						<InstitutionCard name={Institution.name} address={Institution.address} totalDocuments={Institution.totalDocument}  totalMembers={Institution.totalMembers} joinStatus={Institution.joinStatus}/>
					))}
					{/* {institutions.length > 0 &&
						institutions.map((institution) => {
							if (institution.status == 'active') {
								return (
									{Vehicles.map((Vehicle) => (
										<Card type="Vehicles" title={Vehicle.plateNumber} subTitle1={Vehicle.model} subTitle2={Vehicle.brand} url="viewvisitor" />
									))}
									<InstitutionCard/>
								);
							}
						})} */}
				</div>
			</div>
			<div className='InstitutionList'>
				<h5>Newest Institutions</h5>
				<div  className='Wrapper__Card'> 
					{Institutions.map((Institution) => (
						<InstitutionCard name={Institution.name} address={Institution.address} totalDocuments={Institution.totalDocument}  totalMembers={Institution.totalMembers} joinStatus={Institution.joinStatus}/>
					))}
					{/* {institutions.length > 0 &&
						institutions.map((institution) => {
							if (institution.status == 'active') {
								return (
									{Vehicles.map((Vehicle) => (
										<Card type="Vehicles" title={Vehicle.plateNumber} subTitle1={Vehicle.model} subTitle2={Vehicle.brand} url="viewvisitor" />
									))}
									<InstitutionCard/>
								);
							}
						})} */}
				</div>
			</div>
		</div>
	</>
}
function JoinedInstitution(){
	const JoinedInstitutions = [
		{ name : 'OLOPSC', address:"L. De Guzman St, Marikina, Metro Manila", totalMembers:"450", totalDocument:"3000",joinStatus: true},
		{ name : 'OLFU', address:"L. De Guzman St, Marikina, Metro Manila", totalMembers:"450", totalDocument:"3000",joinStatus: true},
	];

	return<>
		<div id='Container_JoinedInstitutions' className='Wrapper__Card'>
			{JoinedInstitutions.map((Institution) => (
				<InstitutionCard name={Institution.name} address={Institution.address} totalDocuments={Institution.totalDocument}  totalMembers={Institution.totalMembers} joinStatus={Institution.joinStatus}/>
			))}
		</div>
	</>
}
export default Institutions;
