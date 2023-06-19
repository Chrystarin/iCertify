import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {ethers} from 'ethers';


// Import SCSS File
import './Profile.scss';

// Import Components
import UserPanelInfo from '../../components/UserPanel/UserPanelInfo.js';
import Card from '../../components/Card/Card.js';
import { Button } from '@mui/material';
import InstitutionCard from '../../components/Card/InstitutionCard.js'
import Loading from '../../components/Loading/Loading';
import SnackbarComponent from '../../components/Snackbar/SnackbarComponent';
// Import Icons & images 
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MetaMaskIcon from './../../images/icons/fox.png';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PremiumIcon from '@mui/icons-material/WorkspacePremium';
import UserIcon from './../../images/icons/user-round.png';

import Empty from '../../images/icons/empty-folder.png'

// Import Utilities
import axiosInstance from '../../utils/axios';
import { useAuth } from "../../utils/AuthContext";
import moment from 'moment';

function Profile() {

    // Constant Declarations
	const { id } = useParams();
    const { isAuth, getContract } = useAuth();

    // States Declarations
	const [user, setUser] = useState(null);
    const [institutions, setInstitutions] = useState(null);
	const [documents, setDocuments] = useState(null);
    const [openSnackBar, setOpenSnackBar] = React.useState({
        open:false,
        type:"",
        note:""
    });
    const [mappedDocuments, setMappedDocuments] = useState([]);

	// Executes on load
	useEffect(() => {
		fetchUser();
	}, );

    const mapDocumentsAsync = async (data) => {
        const mappedDocs = await Promise.all(
            data.map(async (document) => {
                const docData = await getDocumentData(document.nftId)
                const image = `https://icertify.infura-ipfs.io/ipfs/${await getTokenURI(document.nftId)}`;
                return (
                    <Card
                        key={isAuth(id) ? document.codes[0] : document.code}
                        id={document.certificateId}
                        title={docData._type}
                        date={document.createdAt}
                        accessCode={isAuth(id) ? document.codes[0] : document.code}
                        image={image}
                    />
                );
            })
        );
        setMappedDocuments(mappedDocs);
    };

    // Retrieves User's Data
    const fetchUser = async () => {
        await axiosInstance
            .get(`users`,{
                params: {
                    walletAddress: id
                }
            })
            .then((response) => {
                setUser(response.data);
                setInstitutions(response.data.institutions)
                setDocuments(response.data.documents)
                mapDocumentsAsync(response.data.documents);
                // documents.filter((item)=>item.toString().toLowerCase().includes('completed'))
                console.log(documents)

            });
    };

    // Retrieves Document's Metadata
    const getTokenURI = async (data) => {
        const contract = await getContract();
        try{
            const response = await contract.tokenURI(data);
            return response
        } catch(error) {
            console.log(error)
        }
    }

    // Retrieves Document's Metadata
    const getDocumentData = async (data) => {
        const contract = await getContract();
        try{
            const response = await contract.getDocumentData(data);
            return response
        } catch(error) {
            console.log(error)
        }
    }

    // Edit User Data
    const EditProfile = async (file) => {
        try {
            const formData = new FormData();
            formData.append('photo', file);
            formData.append('body', JSON.stringify({
                firstName: user.name.firstName,
                middleName: user.name.middleName ?? '',
                lastName: user.name.lastName,
                email: user.email,
                birthDate: user.birthDate,
                address: user.address ?? '',
                contactNo: user.contactNo ?? '',
                about: user.about ?? '',
            }))
            
            await axiosInstance.patch(
                `users`, 
                formData,
                {headers: {'Content-Type': 'multipart/form-data'}}
            )
            .then((response)=>{
                fetchUser();
                setOpenSnackBar(openSnackBar => ({
                    ...openSnackBar,
                    open:true,
                    type:"success",
                    note:"Profile Updated!"
                }));
            })
        } catch (error) {      
            setOpenSnackBar(openSnackBar => ({
                ...openSnackBar,
                open:true,
                type:"error",
                note:error.response.data.message
            }));
            
        }
    }
    
	// Returns if user is null
	if (!user || !institutions || !documents || !mappedDocuments)return <Loading/>;
    
	return (
		<div id='Profile'>
			<div id='Profile__Container_Div'>
                <div id='Profile__Img'>
                    <img src={(!user.photo) ? UserIcon : user.photo }/>
                    {(isAuth(id)) ? <>
                        <input id='UpdateProfile' type="file" accept="image/png, image/jpeg" className='hidden' 
                        onChange={(e) => {
                            setOpenSnackBar(openSnackBar => ({
                                ...openSnackBar,
                                open:true,
                                type:"info",
                                note:"Processing on updating profile"
                            }));
                            EditProfile(e.target.files[0]);
                        }}/>
                        <label htmlFor="UpdateProfile">
                            <div id='Profile__Img__Update'>
                                <InsertPhotoIcon id="AvatarProfile__Upadate__Icon"/>
                                <p className='BodyText3'>Update</p>
                            </div>
                            </label>
                    </>: ''}
                </div>
                
				<div id='Profile__Div__Info__Container'>
					<h4 >
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
					</h4>
					<div id='User__Div_Info'>
                        <a href={`${process.env.REACT_APP_BLOCK_EXPLORER}/address/${user.walletAddress}`} target="_blank">
                            <img src={MetaMaskIcon} alt="" />
                            <h6 className='BodyText3'>{user.walletAddress}</h6>
						</a>
					</div>
				</div>
			</div>
			<div id='Main_Div'>
                
				<div id='SideBar__Div'>
					<div id='sticky'>
                        {(!user.about) ? ' ' :
                        <div
                            className='Panel__Container'
                            id='AboutMe__Div'
                        >
                            
                            <h6 className='Panel__Title'>About</h6>
                            <p className='BodyText3'>{user.about ?? ''}</p>
                        </div>
                        }
						
						<div
							className='Panel__Container'
							id='Contact__Div'
						>
							<ul className='Panel__MultipleContent'>
								<li className='Panel__MultipleContent'>
                                    {(!user.contactNo) ? ' ' :
                                    <div>
                                        <h6 className='Panel__Title'>Contact Number</h6>
                                        <div className='Panel__Content__IconText'>
                                            <PhoneAndroidIcon />
                                            <p className='BodyText3'>
                                                {user.contactNo}
                                            </p>
                                        </div>
                                    </div>
                                    }
								</li>
								<li>
                                {(!user.address) ? ' ' :
                                    <div>
                                        <h6 className='Panel__Title'>Address</h6>
                                        <div className='Panel__Content__IconText'>
                                            <LocationOnIcon />
                                            <p className='BodyText3'>
                                                {user.address}
                                            </p>
                                        </div>
                                    </div>
                                }
                                {(!user.birthDate) ? ' ' :
                                    <div>
                                        <h6 className='Panel__Title'>Birthday</h6>
                                        <div className='Panel__Content__IconText'>
                                            <LocationOnIcon />
                                            <p className='BodyText3'>
                                                {moment(user.birthDate).format('LL')}
                                            </p>
                                        </div>
                                    </div>
                                }
                                {(!user.email) ? ' ' :
                                <div>
                                    <h6 className='Panel__Title'>Email</h6>
                                    <div className='Panel__Content__IconText'>
                                        <EmailIcon />
                                        <p className='BodyText3'>
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                                }
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
                                    {mappedDocuments}
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
                                            image={institution.photos?.profile ? institution.photos?.profile : null}
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
            <SnackbarComponent open={openSnackBar} setter={setOpenSnackBar}/>
		</div>
	);
}

export default Profile;
