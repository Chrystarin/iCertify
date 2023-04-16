// Import Libraries
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {ethers} from 'ethers';

// Import Components
import './InstitutionView.scss'
import Button from '@mui/material/Button';
import { Avatar } from "@mui/material";
import DocumentRequestCard from "./../../components/Card/DocumentRequestCard";

// Import Icons
import GroupIcon from '@mui/icons-material/Group';
import CallIcon from '@mui/icons-material/Call';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DescriptionIcon from '@mui/icons-material/Description';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';

// Import Images
import Logo from '../../images/placeholder/placeholder_profile.jpg';
import Wallpaper from '../../images/placeholder/placeholder_cover.jpg'

// Import Utilities
import axiosInstance from '../../utils/axios';
import { useAuth } from "../../utils/AuthContext";

const InstitutionView = (props) => {

    const { user, isAuth, isJoined } = useAuth();
    const { id } = useParams();

    // Constants Declarations
    const [institution, setInstitution] = useState();

    // Excecutes on page load
    useEffect(() => {
        // Retrieves Institution Data
		const fetchInstitution = async () => {
			await axiosInstance
				.get(`institutions`,{
                    params: {
                        walletAddress: `${id}`
                    }
                })
				.then((response) => {
					setInstitution(response.data)
                    
				});
		};
		fetchInstitution();
    }, [])

    

    // Returns if no data retrieved
    if(!institution) return <div>loading...</div>
    

    return (
        <div id="Institutioin__View">
            <div id="Institution__Header">
                <div id="Institution__Wallpaper__Container">
                    <img src={Wallpaper} alt="" />
                    {isAuth(id)?<>
                        <div id="Institution__Wallpaper__Update" onClick={()=>{alert()}}>
                            <InsertPhotoIcon id="Institution__Wallpaper__Update__Icon"/>
                            <p>Update Cover Photo</p>
                        </div>
                        </>:<></>
                    }
                </div>
                <div id="Institution__AvatarProfileButtons__Container">
                    <div id="AvatarProfile__Holder">
                        <Avatar src={Logo} id="AvatarProfile__Avatar"/>
                        {isAuth(id)?<>
                            <div id="AvatarProfile__Update" onClick={()=>{alert()}}>
                                <InsertPhotoIcon id="AvatarProfile__Upadate__Icon"/>
                                <p>Update</p>
                            </div></>:
                            <></>
                        }
                        
                    </div>
                    <div id="InstitutionInformationNavigation__Container">
                        <div id="InstitutionInformation__Container">
                            <h3>{institution.name}</h3>
                            <p>{institution.walletAddress}</p>
                            <ul>
                                <li>
                                    <GroupIcon/>
                                    <h6>{institution.members.length}</h6>
                                </li>
                                <li>
                                    <DescriptionIcon/>
                                    <h6>{institution.docOffers.length}</h6>
                                </li>   
                            </ul>
                        </div>
                        <div id="Buttons__Container">
                            {(isAuth(id))?<>
                                <Button variant="contained" href="update">Update</Button>
                            </>:<>
                                {(user.type!='institution') ? 
                                    (isJoined(institution)) ? 'true' :
                                    <Button variant="contained" href={`/institutions/${id}/join`}>
                                        Join
                                    </Button>
                                : ''
                                    
                                
                                }
                            </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div id="InstitutionBody">
                <div id="InstitutionBody__Sidepanel">
                    <div id="Sticky">
                        <div className="Panel__Container">
                            <h6 className="Panel__Title">About Us</h6>
                            <p className="BodyText3">{institution.about}</p>
                        </div>
                        <div className="Panel__Container">
                            <ul className="Panel__MultipleContent">
                                <li>
                                    <h6 className="Panel__Title">Location</h6>
                                    <div className="Panel__Content__IconText">
                                        <LocationOnIcon/>
                                        <p className="BodyText3">{institution.address}</p>
                                    </div>
                                </li>
                                <li>
                                    <h6 className="Panel__Title">Contact Number</h6>
                                    <div className="Panel__Content__IconText">
                                        <CallIcon/>
                                        <p className="BodyText3">{institution.contactNo}</p>
                                    </div>
                                    
                                </li>
                                <li>
                                    <h6 className="Panel__Title">Email</h6>
                                    <div className="Panel__Content__IconText">
                                        <EmailIcon/>
                                        <p className="BodyText3">{institution.email}</p>
                                    </div>
                                </li>
                                <li>
                                    <h6 className="Panel__Title">Website</h6>
                                    <div className="Panel__Content__IconText">
                                        <EmailIcon/>
                                        <p className="BodyText3">{institution.website}</p>
                                    </div>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="InstitutionBody__Content">
                    <div className="InstitutionBody__Content__Containers">
                        <div className="InstitutionBody__Content_Holder">
                            <h5 className="InstitutionBody__Content__Containers__Title">Available Documents</h5>
                            {(isAuth(id))?<>
                                <Button variant="" endIcon={<AddBoxIcon/>} href="/documents/add">Add</Button>
                            </>:<>
                            </>
                            }
                        </div>
                        <div className='grid'>
                            {(institution.docOffers.length === 0 )?
                                <p>No Offers found!</p>
                                :
                                <>
                                    {institution.docOffers.length > 0 &&
                                    institution.docOffers.map((offer) => {
                                    return (
                                        <DocumentRequestCard 
                                            key={offer.docId}
                                            name={offer.title}
                                            id={offer.id} 
                                            description={offer.description} 
                                            requirements={offer.requirements} 
                                            // requestStatus={offer.requestStatus} 
                                            link={`${institution.walletAddress}/${offer.docId}`}
                                            owner={(isAuth(id))}
                                            member={(isJoined(institution))}
                                        />
                                    );
                                    })}
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default InstitutionView