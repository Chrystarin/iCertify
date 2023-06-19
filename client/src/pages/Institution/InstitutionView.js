// Import Libraries
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {ethers} from 'ethers';

// Import Components
import './InstitutionView.scss'
import Button from '@mui/material/Button';
import { Avatar } from "@mui/material";
import DocumentRequestCard from "./../../components/Card/DocumentRequestCard";
import SnackbarComponent from "../../components/Snackbar/SnackbarComponent";
import Loading from "../../components/Loading/Loading";
// Import Icons
import GroupIcon from '@mui/icons-material/Group';
import CallIcon from '@mui/icons-material/Call';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DescriptionIcon from '@mui/icons-material/Description';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import MetaMaskIcon from './../../images/icons/fox.png';
import LanguageIcon from '@mui/icons-material/Language';
// Import Images
import Logo from '../../images/placeholder/placeholder_profile.jpg';
import Wallpaper from '../../images/placeholder/placeholder_cover.jpg'

// Import Utilities
import axiosInstance from '../../utils/axios';
import { useAuth } from "../../utils/AuthContext";

const InstitutionView = () => {

    // Constants Declarations
    const { id } = useParams();
    const { user, isAuth, isJoined } = useAuth();
    const [institution, setInstitution] = useState();
    const [request, setRequest] = useState();
    const [openSnackBar, setOpenSnackBar] = React.useState({
        open:false,
        type:"",
        note:"",
        action: ()=>{}
    });

    // Excecutes on page load
    useEffect(() => {
		fetchInstitution();
        // fetchDocumentRequests();
        
        if(localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).type === "user"){
            fetchDocumentRequests();
        }
    }, [])

    
    // Retrieves Institution Data
    const fetchInstitution = async () => {
        await axiosInstance
            .get(`institutions`,{
                params: {
                    walletAddress: id
                }
            })
            .then((response) => {
                setInstitution(response.data)
            });
    };

    // Retrieves Document Requests
    const fetchDocumentRequests = async () => {
        await axiosInstance
            .get(`requests`,{
                params: {
                    requestType: 'join'
                }
            })
            .then((response) => { 
                setRequest((response.data).filter(obj => obj.institution.walletAddress === id))
                console.log((response.data).filter(obj => obj.institution.walletAddress === id))
            });
    };

    // Finds Specific Value based on Key Value Pair
    function findValue(obj, val) {
        for (let key in obj) {
            if (typeof obj[key] === 'object') {
                const result = findValue(obj[key], val);
                if (result !== undefined) {
                return result;
                }
            } else if (obj[key] === val) {
                return obj;
            }
        }
        return undefined;
    }


    // Edit Institution Data
    const EditInstitution = async ({selected, file}) => {
        
        try {
            const formData = new FormData();
            formData.append(selected, file);
            formData.append('body', JSON.stringify({
                name: institution.name,
                type: institution.instType,
                email: institution.email,
                about: institution.about,
                address: institution.address,
                website: institution.website,
                contactNo: institution.contactNo,
                needId: institution.needs.ID,
                needMembership: institution.needs.membership
            }))
            
            await axiosInstance.patch(
                `institutions`, 
                formData,
                {headers: {
                    'Content-Type': 'multipart/form-data'
                }})
            .then((response)=>{
                fetchInstitution();
                setOpenSnackBar(openSnackBar => ({
                    ...openSnackBar,
                    open:true,
                    type:"success",
                    note:`Your ${selected} photo has been updated.`
                }))
            })
        } catch (err) { 
            setOpenSnackBar(openSnackBar => ({
                ...openSnackBar,
                open:true,
                type:"error",
                note:"Error Occurred: " + err.message
            }))     
            console.error(err.message);
        }
    }

    // Returns if no data retrieved
    if(!institution) return <Loading/>
    
    return (
        <div id="Institutioin__View">
            <div id="Institution__Header">
            {/* <button onClick={EditInstitution}>TSET</button> */}
                <div id="Institution__Wallpaper__Container">
                    <img src={(!institution.photos?.cover) ? Wallpaper : institution.photos.cover } alt="" />
                    {isAuth(id)?<>
                        <input id="UpdateCoverPhoto" className="hidden"  accept="image/png, image/jpeg" type="file" 
                        onChange={(e) => {
                            EditInstitution({selected:'cover', file:e.target.files[0]})
                            setOpenSnackBar(openSnackBar => ({
                                ...openSnackBar,
                                open:true,
                                type:"info",
                                note:"Uploading Photo..."
                            }))
                        }}/>
                        <label htmlFor="UpdateCoverPhoto" >
                            <div id="Institution__Wallpaper__Update">
                                <InsertPhotoIcon id="Institution__Wallpaper__Update__Icon"/>
                                <p>Update Cover Photo</p>
                            </div>
                        </label>
                        
                        </>:<></>
                    }
                </div>
                <SnackbarComponent open={openSnackBar} setter={setOpenSnackBar}/> 
                <div id="Institution__AvatarProfileButtons__Container">
                    <div id="AvatarProfile__Holder">
                        <Avatar src={(!institution.photos?.profile) ? Logo : institution.photos.profile } id="AvatarProfile__Avatar"/>
                        {isAuth(id)?<>
                            <input id="ProfilePicture" className="hide"  accept="image/png, image/jpeg"  type="file" 
                            onChange={(e) => {
                                EditInstitution({selected:'profile', file:e.target.files[0]})
                                setOpenSnackBar(openSnackBar => ({
                                    ...openSnackBar,
                                    open:true,
                                    type:"info",
                                    note:"Uploading Photo..."
                                }))
                            }} />
                            <label htmlFor="ProfilePicture">
                                <div id="AvatarProfile__Update">
                                    <InsertPhotoIcon id="AvatarProfile__Upadate__Icon"/>
                                    <p>Update</p>
                                </div>
                            </label>
                            </>:<></>
                        }
                        
                    </div>
                    <div id="InstitutionInformationNavigation__Container">
                        <div id="InstitutionInformation__Container">
                            <h3 id="InstitutionInformation__Container__Name">{institution.name}</h3>
                            <ul>
                                <li>
                                    <GroupIcon/>
                                    <p>{institution.members.length}</p>
                                </li>
                                <li>
                                    <DescriptionIcon/>
                                    <p>{institution.docOffers.length}</p>
                                </li> 
                                <li>
                                    <a href={`${process.env.REACT_APP_BLOCK_EXPLORER}/address/${institution.walletAddress}`} target="_blank">
                                        <img className="InstitutionInformation__Container__Icon" src={MetaMaskIcon}></img><p>{institution.walletAddress}</p>
                                    </a>
                                </li>  
                            </ul>
                        </div>
                        <div id="Buttons__Container">
                            {(isAuth(id))?<>
                                {/* <Button variant="contained" href={`/institutions/${id}/edit`}>Update</Button> */}
                            </>:<>
                                {(user?.type!='institution') ? 
                                    (isJoined(institution)) ? '' :

                                    (!request || request.length === 0) 
                                    ? 
                                        <Button variant="contained" href={`/institutions/${id}/join`}>
                                            Join
                                        </Button>
                                    :
                                        (request[request.length-1]?.status === "declined") 
                                        ? 
                                            <Button variant="contained" href={`/institutions/${id}/join`}>
                                                Join
                                            </Button>
                                        :
                                            <Button disabled variant="contained">
                                                Request Sent
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
                        {institution.about?<>
                            <div className="Panel__Container">
                                <h6 className="Panel__Title">About Us</h6>
                                <p className="BodyText3 InfoOverFlow">{institution.about}</p>
                            </div>
                        </>:<></>}
                        
                        <div className="Panel__Container">
                            <ul className="Panel__MultipleContent">
                                {institution.address?
                                    <li>
                                        <h6 className="Panel__Title">Location</h6>
                                        <div className="Panel__Content__IconText InfoOverFlow">
                                            <LocationOnIcon/>
                                            <p className="BodyText3">{institution.address}</p>
                                        </div>
                                    </li>
                                :<></>}
                                
                                {institution.contactNo?
                                    <li>
                                        <h6 className="Panel__Title">Contact Number</h6>
                                        <div className="Panel__Content__IconText InfoOverFlow">
                                            <CallIcon/>
                                            <p className="BodyText3">{institution.contactNo}</p>
                                        </div>
                                        
                                    </li>
                                :<></>}
                                
                                {institution.email?
                                    <li>
                                        <h6 className="Panel__Title">Email</h6>
                                        <div className="Panel__Content__IconText InfoOverFlow">
                                            <EmailIcon/>
                                            <p className="BodyText3">{institution.email}</p>
                                        </div>
                                    </li>
                                :<></>}
                                

                                {institution.website?
                                    <li>
                                        <h6 className="Panel__Title">Website</h6>
                                        <div className="Panel__Content__IconText InfoOverFlow">
                                            <LanguageIcon/>
                                            <p className="BodyText3">{institution.website}</p>
                                        </div>
                                    </li>
                                :<></>}
                                
                                
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
                        <div className='Wrapper__Card'>
                            {(institution.docOffers.length === 0 )?
                                <p>No Offers found!</p>
                                :
                                <>
                                    {institution.docOffers.length > 0 &&
                                    institution.docOffers.map((offer) => {
                                    if(((!isAuth(id) && offer.status==="inactive")))
                                    {
                                        return null
                                    }
                                    else{
                                        return (
                                            <DocumentRequestCard 
                                                key={offer.docId}
                                                name={offer.title}
                                                id={offer.docId} 
                                                description={offer.description} 
                                                requirements={offer.requirements} 
                                                // requestStatus={offer.requestStatus} 
                                                status={offer.status}
                                                link={`${institution.walletAddress}/${offer.docId}`}
                                                owner={(isAuth(id))}
                                                member={(isJoined(institution))}
                                            />
                                        );
                                    }
                                    
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