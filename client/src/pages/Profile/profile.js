import React,{useEffect, useState} from 'react';
import { useParams } from "react-router-dom";

import './Profile.scss'

import UserPanelInfo from '../../components/UserPanel/UserPanelInfo.js';
import UserImg from './../../images/Resources/Developers/Dianne.jpg'

import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import MetaMaskIcon from './../../images/icons/fox.png'
import EmailIcon from '@mui/icons-material/Email';

import EventCard from '../../components/EventCard/EventCard.js'
import CredentialList from '../../components/Table/Table'

import axios from '../../config/axios';

function Profile(props) {
    const { id } = useParams()
    const [member, setMember] = useState(null)

    // Executes on load
    useEffect(() => {
        // Retrieves Member Data
        const fetchMember = async () => {
            const response = await axios.get(`members/${id}`)
            .then((response)=>{
                setMember(response.data)
            })
        }
        
        fetchMember();
    }, [])

    let user = {
        Id:"",
        FirstName: "Dianne Chrystalin",
        LastName: "Brandez",
        Image: UserImg,
        MetamaskAddress:"0x6eWereasdD24A"
    }

    // Returns if member is null
    if(!member) return <div>loading...</div>

    return (
    <div id='Profile'>
        <div id='Profile__Container_Div'>
            <img id='Profile__Img' src={user.Image} alt="" />
            <div id='Profile__Div__Info__Container'>
                <h3>{member.name.firstName + " " + member.name.lastName}</h3>
                <div id='User__Div_Info'>
                    <a href="/" >
                        <UserPanelInfo Title={member.walletAddress} Image={MetaMaskIcon}/>
                    </a>
                </div>
            </div>
        </div>
        <div id='Main_Div'>
            <div id='SideBar__Div'>
                <div id="sticky">
                    <div className='Panel__Container' id='AboutMe__Div'>
                        <h5 className='Panel__Title'>About me</h5>
                        <p className='BodyText3'>{member.occupation}</p>
                        <p className='BodyText3'>{member.about}</p>
                    </div>
                    <div className='Panel__Container' id='Contact__Div'>
                        <ul className='Panel__MultipleContent'>
                            <li>
                                <h5 className='Panel__Title'>Contact</h5>
                                <div className='Panel__Content__IconText'>
                                    <CallIcon/>
                                    <p className='BodyText3'> {member.contact.mobile}</p>
                                </div>
                                <div className='Panel__Content__IconText'>
                                    <CallIcon/>
                                    <p className='BodyText3'> {member.contact.telephone}</p>
                                </div>
                            </li>
                            <li>
                                <h5 className='Panel__Title'>Location</h5>
                                <div className='Panel__Content__IconText'>
                                    <LocationOnIcon/>
                                    <p className='BodyText3'> {member.location.city}  {member.location.province}, {member.location.country}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id='Content__Div'>
                <section >
                    <h5 className='Panel__Title'>Joined Events</h5>
                    <div className='Wrapper__EventCard'>
                        <EventCard/>
                    </div>
                </section>
                <section >
                    <h5 className='Panel__Title'>Credential </h5>
                    <div className=''>
                        <CredentialList/>
                    </div>
                </section>
            </div>
        </div>
    </div>
    )
}

export default Profile