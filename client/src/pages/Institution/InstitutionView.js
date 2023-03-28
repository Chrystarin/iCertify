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


const EventView = (props) => {

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




    const { id } = useParams()
    const [memberAddress, setMemberAddress] = useState()

    const [moreButtonAdmin,setMoreButtonAdmin] = useState(false);
    const event = {
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
        "tags":[],
        "regularPrice":{
            "$numberInt":"3"
        },
        "premiumPrice":{
            "$numberInt":"1"
        },
        "volunteerRequests":[]
    }
    const participants = [
        {
            "member":{
                "$oid":"63eb5f308bded2c850c93210"
            },
            "role":"Participant",
            "certificateProcessed":false,
            "_id":{
            "$oid":"63eb5f818bded2c850c93249"
            }
        },
        {
            "member":{
                "$oid":"63eb5f468bded2c850c9321c"
            },
            "role":"Participant",
            "certificateProcessed":false,
            "_id":{
            "$oid":"63eb5f948bded2c850c93268"
            }
        },
        {
            "member":{
            "$oid":"63f496e780ce7fae3542be12"
            },
            "role":"Participant",
            "certificateProcessed":true,
            "_id":{
            "$oid":"63fb0307153eb3004953dd74"
            }
        }
    ]   
    // Member join event function
    const joinEvent = async () => {
        try{
            // const response = await axios.post(`events/${id}/join`,
            // JSON.stringify({ eventId: id, walletAddress: memberAddress, role: 'Participant' }),
            // {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     }
            // })
            // .then(response => {
            //     console.log("event joined!");
            //     window.location.reload();
            // });
        }
        catch (err){
            console.error(err.message);
        }
    };
    // Checks if member has already joined the event
    function eventJoined(json, value) {
        let contains = false;
        // Object.keys(json).some(key => {
        //     contains = typeof json[key] === 'object' ? eventJoined(json[key], value) : json[key] === value;
        //      return contains;
        // });
        return contains;
     }

    // Excecutes on page load
    useEffect(() => {
        // Checks currently connected wallet
        // const checkWallet = async () => {
        //     try{
        //         const accounts = await window.ethereum.request({method: 'eth_requestAccounts'}); 
        //         const provider = new ethers.providers.Web3Provider(window.ethereum);
        //         const signer = provider.getSigner();
        //         const address = await signer.getAddress();
        //         setMemberAddress(address);
        //     }
        //     catch(err){
        //         console.error(err.message);
        //     }
        // }

        // // Fetches event data
        // const fetchEvent = async () => {
        //     const response = await axios.get(`/events/${id}`)
        //     .then((response)=>{
        //         setEvent(response.data)
        //     })
        // }

        // // Fetches event participants data
        // const fetchParticipants = async () => {
        //     const response = await axios.get(`/events/${id}/participants`)
        //     .then((response)=>{
        //         setParticipants(response.data)
        //     })
        // }

        // fetchParticipants()
        // fetchEvent()
        // checkWallet()
    }, [])

    // if(!event || !participants) return <div>loading...</div>
    
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
                            <h3>STI College Marikina</h3>
                            <ul>
                                <li>
                                    <GroupIcon/>
                                    <h6>{pageDetails.TotalMembers}</h6>
                                </li>
                                <li>
                                    <DescriptionIcon/>
                                    <h6>{pageDetails.TotalDocumentsDestributed}</h6>
                                </li>   
                            </ul>
                        </div>
                        <div id="Buttons__Container">
                            {props.owner?<>
                                <Button variant="contained" href="update">Update </Button>
                            </>:<>
                                <Button variant="contained" href="/m/institution/join">
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
                            <p className="BodyText3">{pageDetails.AboutUs}</p>
                        </div>
                        <div className="Panel__Container">
                            <ul className="Panel__MultipleContent">
                                <li>
                                    <h6 className="Panel__Title">Location</h6>
                                    <div className="Panel__Content__IconText">
                                        <LocationOnIcon/>
                                        <p className="BodyText3">{pageDetails.Address}</p>
                                    </div>
                                </li>
                                <li>
                                    <h6 className="Panel__Title">Contact Number</h6>
                                    <div className="Panel__Content__IconText">
                                        <CallIcon/>
                                        <p className="BodyText3">{pageDetails.ContactNumber}</p>
                                    </div>
                                    
                                </li>
                                <li>
                                    <h6 className="Panel__Title">Email</h6>
                                    <div className="Panel__Content__IconText">
                                        <EmailIcon/>
                                        <p className="BodyText3">{pageDetails.Email}</p>
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

export default EventView