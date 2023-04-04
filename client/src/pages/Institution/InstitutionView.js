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
import Logo from '../../images/placeholder/SampleLogo.png';
import Wallpaper from '../../images/placeholder/SampleWallpaper.png'

import axios from '../../utils/axios';

const InstitutionView = (props) => {
    // Get Logged in User
    const user = JSON.parse(localStorage.getItem("user"));

    // Constants Declarations
    const { id } = useParams()
    const [institution, setInstitution] = useState()
    const [offers, setOffers] = useState()
    const [moreButtonAdmin,setMoreButtonAdmin] = useState(false);

    // Here are the states to update the details in the page
    const [pageDetails,setPageDetails] = useState({
        ProfilePicture:Logo,
        Wallpaper:Wallpaper,
        InstitutionName:"STI College Marikina",
        TotalMembers:600,
        TotalDocumentsDestributed:500,
        AboutUs:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis placeat optio inventore eaque explicabo, neque accusamus dignissimos voluptatum pariatur suscipit!",
        ContactNumber:"0908-265-7587",
        Email:"stimarikina@gmail.com",
        Address:"2 L. De Guzman St, Marikina, 1807 Metro Manila"
    });

    // Excecutes on page load
    useEffect(() => {
        // Retrieves Institution Data
		const fetchInstitution = async () => {
			await axios
				.get(`institutions`,{
                    params: {
                        walletAddress: `${id}`
                    }
                })
				.then((response) => {
					setInstitution(response.data)
                    setOffers(response.data.docOffers)
				});
		};
		fetchInstitution();
    }, [])

    // Returns if no data retrieved
    if(!institution || !offers) return <div>loading...</div>
    
    return (
        <div id="Institutioin__View">
            <div id="Institution__Header">
                <div id="Institution__Wallpaper__Container">
                    <img src={pageDetails.Wallpaper} alt="" />
                    {props.owner?<>
                        <div id="Institution__Wallpaper__Update" onClick={()=>{alert()}}>
                            <InsertPhotoIcon id="Institution__Wallpaper__Update__Icon"/>
                            <p>Update Cover Photo</p>
                        </div>
                        </>:<></>
                    }
                </div>
                <div id="Institution__AvatarProfileButtons__Container">
                    <div id="AvatarProfile__Holder">
                        <Avatar src={pageDetails.ProfilePicture} id="AvatarProfile__Avatar"/>
                        {props.owner?<>
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
                            {(user.type == 'institution' && user.walletAddress == id)?<>
                                <Button variant="contained" href="update">Add Document </Button>
                                <Button variant="contained" href="update">Update </Button>
                            </>:<>
                                <Button variant="contained" href={`/institutions/${id}/join`}>
                                    Join
                                </Button>
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
                    <AvailableDocuments owner={props.owner}/>
                </div>
            </div>
        </div>
    )
}

function AvailableDocuments(props){
    
    const AvailableDocuments = [
        {name:'Transcript of Records', id:"213231323132", 
        description:'Document that lists all the courses taken by a student and the grades or marks earned in each course, usually issued by the institution attended. It serves as an official record of the students academic history.', 
        requirements:[
            "Student Graduate", "Student ID", "Student Number"
        ], 
        requestStatus: true},
        
        {name:'Transcript of Records', 
        id:"213231323132", 
        description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis, ea laboriosam praesentium consequuntur eveniet animi quasi quam eaque. Molestias commodi rerum fuga sint obcaecati inventore, nulla ullam cumque at quibusdam.', 
        requirements:[
            "Student Graduate", "Student ID", "Student Number"
        ], 
        requestStatus: true},
        {name:'Transcript of Records', id:"213231323132", 
        description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis, ea laboriosam praesentium consequuntur eveniet animi quasi quam eaque. Molestias commodi rerum fuga sint obcaecati inventore, nulla ullam cumque at quibusdam.', 
        requirements:[
            "Student Graduate", "Student ID", "Student Number"
        ], 
        requestStatus: true},
        
        {name:'Transcript of Records', 
        id:"213231323132", 
        description:'Lorem ipsum, dolor sipraesentium consequuntur eveniet animi quasi quam eaque. Molestias commodi rerum fuga sint obcaecati inventore, nulla ullam cumque at quibusdam.', 
        requirements:[
            "Student Graduate", "Student ID", "Student Number"
        ], 
        requestStatus: true},
        {name:'Transcript of Records', id:"213231323132", 
        description:'Lorem ipsum, dolor site at quibusdam.', 
        requirements:[
            "Student Graduate", "Student ID", "Student Number"
        ], 
        requestStatus: true},
        {name:'Transcript of Records', 
        id:"213231323132", 
        description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis, ea laboriosam praesentium consequuntur eveniet animi quasi quam eaque. Molestias commodi rerum fuga sint obcaecati inventore, nulla ullam cumque at quibusdam.', 
        requirements:[
            "Student Graduate", "Student ID", "Student Number"
        ], 
        requestStatus: true},   
        {name:'Transcript of Records', id:"213231323132", 
        description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis, ea laboriosam praesentium consequuntur eveniet animi quasi quam eaque. Molestias commodi rerum fuga sint obcaecati inventore, nulla ullam cumque at quibusdam.', 
        requirements:[
            "Student Graduate", "Student ID", "Student Number"
        ], 
        requestStatus: true},
        {name:'Transcript of Records', id:"213231323132", 
        description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis, ea laboriosam praesentium consequuntur eveniet animi quasi quam eaque. Molestias commodi rerum fuga sint obcaecati inventore, nulla ullam cumque at quibusdam.', 
        requirements:[
            "Student Graduate", "Student ID", "Student Number"
        ], 
        requestStatus: true},
        // {name:'', description:'', requirements:'', requestStatus: true},
    ]
    return<>
        <div className="InstitutionBody__Content__Containers">
            <div className="InstitutionBody__Content_Holder">
                <h5 className="InstitutionBody__Content__Containers__Title">Available Documents</h5>
                {props.owner?<>
                    <Button variant="" endIcon={<AddBoxIcon/>} href="/a/document/add">Add</Button>
                </>:<>
                    
                </>
                }
                
            </div>
            <div className='grid'>
                {AvailableDocuments.map((Document) => (
                    <DocumentRequestCard name={Document.name} id={Document.id} description={Document.description} requirements={Document.requirements} requestStatus={document.requestStatus} owner={props.owner}/>
                ))}
            </div>
        </div>
    </>
}

export default InstitutionView