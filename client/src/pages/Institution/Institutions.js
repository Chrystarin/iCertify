import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import './Institutions.scss';

import ImagePosterSample from './../../images/placeholder/PosterSample.jpg';
import ImageAds from '../../images/Resources/Ads.png'

import Button from '@mui/material/Button';
import InstitutionCard from '../../components/Card/InstitutionCard.js'

// Import Utilities
import axiosInstance from '../../utils/axios';
import { useAuth } from "../../utils/AuthContext";

function Institutions(props) {

    const { user, isAuth } = useAuth();

    // Constant Declarations
	const [isOpenPanel_Institution, seOpenPanel_Institution] = useState('FeaturedInstitutions');
    const [institutions, setInstitutions] = useState(null);
    const [joinedInstitutions, setJoinedInstitutions] = useState(null);

    // Executes on load
    useEffect(() => {
		// Retrieves All institutions Data
		const fetchInstitutions = async () => {
			await axiosInstance
                .get(`/institutions`)
                .then((response) => {
				    setInstitutions(response.data);
			    });
		};

        // Retrieves User's Data
        
		const fetchUser = async () => {
            if(localStorage.getItem("user")){
                await axiosInstance
				.get(`users`,{
                    params: {
                        walletAddress: JSON.parse(localStorage.getItem("user")).walletAddress
                    }
                })
				.then((response) => {
                    setJoinedInstitutions(response.data.institutions)
				});
            } else{
                setJoinedInstitutions(' ')
            }

		};
        // Executes Functions
		fetchInstitutions();
        fetchUser();
	}, []);

    // Returns if institutions is null
    if (!institutions || !joinedInstitutions) return <div>loading...</div>;

    // Returns Institutions View
	return (
		<section id='institutions'>
			<div className='Title__Div'>
				<h2 className='SectionTitle'>Institutions</h2>
				<h5 className='SectionSubTitle'>Collection of Institutions</h5>
			</div>
			<div className='Navigation_Institution'>
				<div className='Navigation_Left'>
					<Button 
                        variant={
                            isOpenPanel_Institution === 'FeaturedInstitutions'
                                ? 'contained'
                                : ''
					    }
					    onClick={() => seOpenPanel_Institution('FeaturedInstitutions')}
					>
						Featured Institutions	
					</Button>
                    {(user) ? 
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
                    : ''}
					
				</div>
				<div className='Navigation_Right'>
				</div>
			</div>
			<div id='Panel_institutions'>
				<Panel_institutions open={isOpenPanel_Institution} />
			</div>
		</section>
	);

    // Panel for Institutions
    function Panel_institutions(props) {
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
    
    // Panel Showing Featured Institutions
    function FeaturedInstitution(){
        return<>
            <div id='Container_Featuredinstitutions'>
                <div className='InstitutionList'>
                    <h5>Newest Institutions</h5>
                    <div  className='Wrapper__Card'> 
                        {(institutions.length === 0 )?
                            <p>No Institutions found!</p>
                            :
                            <>
                                {institutions.length > 0 &&
                                institutions.map((institution) => {
                                return (
                                    <InstitutionCard 
                                        key={institution.walletAddress}
                                        walletAddress={institution.walletAddress}
                                        name={institution.name} 
                                        address={institution.instType} 
                                        totalDocuments={institution.docOffers.length} 
                                        totalMembers={institution.members.length} 
                                        joinStatus={false}
                                        actions={true}
                                    />
                                );
                                })}
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    }

    // Panel Showing Joined Institutions
    function JoinedInstitution(){
        return<>
            <div id='Container_JoinedInstitutions' className='Wrapper__Card'>
                {(joinedInstitutions.length === 0 )?
                    <p>No Institutions found!
                        {joinedInstitutions}

                    </p>
                    :
                    <>
                        {joinedInstitutions.length > 0 &&
                        joinedInstitutions.map((institution) => {
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
                        
                    </>
                }
            </div>
        </>
    }
}

export default Institutions;
