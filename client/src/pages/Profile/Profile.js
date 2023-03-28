import React, { useEffect, useState } from 'react';

import './Profile.scss';

// Import Components
import UserPanelInfo from '../../components/UserPanel/UserPanelInfo.js';
import Card from '../../components/Card/Card.js';
import { Button } from '@mui/material';
import InstitutionCard from '../../components/Card/InstitutionCard.js'

// Import Icons & images 
import UserIcon from './../../images/icons/user-round.png';
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MetaMaskIcon from './../../images/icons/fox.png';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PremiumIcon from '@mui/icons-material/WorkspacePremium';

import axios from '../../config/axios';
import Empty from '../../images/icons/empty-folder.png'
import { useParams } from 'react-router-dom';
import {ethers} from 'ethers';

function Profile() {
	const { id } = useParams();
	const [member, setMember] = useState(null);
	const [joinedEvents, setJoinedEvents] = useState(null);
	const [ownedCertificates, setOwnedCertificates] = useState(null);
    const [address, setAddress] = useState(null);

	// Executes on load
	useEffect(() => {
		// Retrieves Member Data
		const fetchMember = async () => {
			const response = await axios
				.get(`members/${id}`)
				.then((response) => {
					setMember(response.data);
				});
		};

		// Retrives Joined Events Data
		const fetchJoinedEvents = async () => {
			const response = await axios
				.get(`members/${id}/events`)
				.then((response) => {
					setJoinedEvents(response.data);
				});
		};

		const fetchOwnedCertificates = async () => {
			const response = await axios
				.get(`members/${id}/certificates`)
				.then((response) => {
					setOwnedCertificates(response.data);
				});
		};

        const checkWallet = async () => {
            try{
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                setAddress(await signer.getAddress());
            }
            catch(err){
                console.error(err.message);
            }
        }
    
        checkWallet();
		fetchMember();
		fetchJoinedEvents();
		fetchOwnedCertificates();
	}, []);

	// Returns if member is null
	if (!member) return <div>loading... No Member Found</div>;
	if (!joinedEvents) return <div>loading... No JoinedEvents Found</div>;
	if (!ownedCertificates)
		return <div>loading... No OwnedCertificates Found</div>;

	return (
		<div id='Profile'>
			<div id='Profile__Container_Div'>
				<img
					id='Profile__Img'
					src={UserIcon}
					alt=''
				/>
				<div id='Profile__Div__Info__Container'>
					<h3>
						{(member.name?.firstName || member.name?.lastName)?
						
							<>
								{(member.name?.firstName ?? '') + ' '}
								{member.name?.middleName
									? [...member.name.middleName][0]
									: ''}
								.{' ' + (member.name?.lastName ?? '')}
								{' ' + (member.name?.extension ?? '')}
								{member.isPremium ? <PremiumIcon /> : ''}
							</>
							:
							<>
								Update Profile Name
							</>
					
						}
						
					</h3>
					<div id='User__Div_Info'>
						<a href='/'>
							<UserPanelInfo
								Title={member.walletAddress}
								Image={MetaMaskIcon}
							/>
						</a>
					</div>
				</div>
				<div id='User__Div__Button'>
                    {(address==id) ?
                        <Button
                            href={`/m/${id}/edit`}
                            variant='contained'
                        >
                            Update
                        </Button>
                    : <></>
                    }
					
				</div>
			</div>
			<div id='Main_Div'>
				<div id='SideBar__Div'>
					<div id='sticky'>
						<div
							className='Panel__Container'
							id='AboutMe__Div'
						>
							<h6 className='Panel__Title'>About</h6>
							<p className='BodyText3'>{member.about ?? ''}</p>
						</div>
						<div
							className='Panel__Container'
							id='Contact__Div'
						>
							<ul className='Panel__MultipleContent'>
								<li className='Panel__MultipleContent'>
									<h6 className='Panel__Title'>Contact Number</h6>

									{(!member.contact?.mobile)? <>
									</>:
									<>
									<div className='Panel__Content__IconText'>
										<PhoneAndroidIcon />
										<p className='BodyText3'>
											{member.contact?.mobile}
										</p>
									</div>
									</>
									}
								</li>
								<li>
									<h6 className='Panel__Title'>Address</h6>
									<div className='Panel__Content__IconText'>
										<LocationOnIcon />
										<p className='BodyText3'>
											{member.location?.city ?? ''}{' '}
											{member.location?.province ?? ''},{' '}
											{member.location?.country ?? ''}
										</p>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
				
				<div id='Content__Div'>
				<section>
						<h5 className='Panel__Title'>Certificates </h5>

					{(ownedCertificates.length === 0 )?
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
								<div className='Wrapper__Card'>
									{ownedCertificates.length > 0 &&
										ownedCertificates.map((ownedCertificate) => {
											return (
												<Card
													key={ownedCertificate.certificateId}
													id={ownedCertificate.certificateId}
													type={'certificate'}
													image={`https://icertify.infura-ipfs.io/ipfs/${ownedCertificate.ipfsCID}`}
												/>
											);
										})}
								</div>
							</>
						}			
						
					</section>
					<section>
						<h5 className='Panel__Title'>Institutions</h5>
						{(joinedEvents.length === 0 )?
							<>
								<div className='EmtpyCard'>
									<div>
										<img src={Empty} alt="" />
										<p>No joined events available!</p>
									</div>
									
								</div>
							</>
							:
							<>
								<div className='Wrapper__Card'>
									{joinedEvents.length > 0 &&
										joinedEvents.map((joinedEvent) => {
										return <>
											
											<InstitutionCard 
												name={joinedEvent.event.title} 
												address={"wewe"} 
												totalDocuments={300}  
												totalMembers={400} 
												joinStatus={true}
											/>
										</>
									})}
								</div>
							</>
						}
							
					</section>

					
				</div>
			</div>
		</div>
	);
}

export default Profile;
