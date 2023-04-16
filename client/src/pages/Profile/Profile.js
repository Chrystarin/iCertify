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

import Empty from '../../images/icons/empty-folder.png'
import { useParams } from 'react-router-dom';
import {ethers} from 'ethers';

// Import Utilities
import axiosInstance from '../../utils/axios';
import { useAuth } from "../../utils/AuthContext";

function Profile() {

    
	const { id } = useParams();
    const { isAuth } = useAuth();

    // Constant Declarations
	const [user, setUser] = useState(null);
    const [institutions, setInstitutions] = useState(null);
	const [documents, setDocuments] = useState(null);

	// Executes on load
	useEffect(() => {
		// Retrieves User's Data
		const fetchUser = async () => {
			await axiosInstance
				.get(`users`,{
                    params: {
                        walletAddress: id
                    }
                })
				.then((response) => {
					setUser(response.data.user);
                    setInstitutions(response.data.institutions)
                    setDocuments(response.data.user.documents)
				});
		};
		fetchUser();
	}, []);

	// Returns if user is null
	if (!user || !institutions || !documents) return <div>loading... No user Found</div>;

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
						{(user.name?.firstName || user.name?.lastName)?
						
							<>
								{(user.name?.firstName ?? '') + ' '}
								{user.name?.middleName
									? [...user.name.middleName][0] + '.'
									: ''}
								{' ' + (user.name?.lastName ?? '')}
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
								Title={user.walletAddress}
								Image={MetaMaskIcon}
							/>
						</a>
					</div>
				</div>
				<div id='User__Div__Button'>
                    {(isAuth(id)) ?
                        <Button
                            href={`${id}/edit`}
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
							<p className='BodyText3'>{user.about ?? ''}</p>
						</div>
						<div
							className='Panel__Container'
							id='Contact__Div'
						>
							<ul className='Panel__MultipleContent'>
								<li className='Panel__MultipleContent'>
									<h6 className='Panel__Title'>Contact Number</h6>

									{(!user.contact?.mobile)? <>
									</>:
									<>
									<div className='Panel__Content__IconText'>
										<PhoneAndroidIcon />
										<p className='BodyText3'>
											{user.email ?? ''}
                                            {user.contactNo ?? ''}
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
											{user.address ?? ''}
										</p>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
				
				<div id='Content__Div'>
				<section>
					<h5 className='Panel__Title'>{(isAuth(id)?'My':'')} Documents</h5>
					{(documents.length === 0 )?
							<>
								<div className='EmtpyCard'>
									<div>
										<img src={Empty} alt="" />
										<p>No Documents Owned!</p>
									</div>
								</div>
							</>
							:
							<>
								<div className='Wrapper__Card'>
									{documents.length > 0 &&
										documents.map((document) => {
											return (
												<Card
													key={document.certificateId}
													id={document.certificateId}
													type={'certificate'}
													image={`https://icertify.infura-ipfs.io/ipfs/${document.ipfsCID}`}
												/>
											);
										})}
								</div>
							</>
						}			
						
					</section>
					<section>
						<h5 className='Panel__Title'>{(isAuth(id)?'My':'')} Institutions</h5>
						{(institutions.length === 0 )?
							<>
								<div className='EmtpyCard'>
									<div>
										<img src={Empty} alt="" />
										<p>No Institutions Joined!</p>
									</div>
									
								</div>
							</>
							:
							<>
								<div className='Wrapper__Card'>
                                {institutions.length > 0 &&
                                institutions.map((institution) => {
                                    return (
                                        <InstitutionCard 
                                            key={institution.walletAddress}
                                            walletAddress={institution.walletAddress}
                                            name={institution.name} 
                                            address={institution.instType} 
                                            totalDocuments={institution.docOffers.length} 
                                            // totalMembers={institution.members.length} 
                                            joinStatus={true}
                                            actions={false}
                                        />
                                    );
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
