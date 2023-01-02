import React from 'react'
import './profile.scss'

import UserPanelInfo from '../../components/UserPanelInfo';
import UserImg from './../../images/Resources/Developers/Dianne.jpg'

import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import MetaMaskIcon from './../../images/icons/fox.png'
import EmailIcon from '@mui/icons-material/Email';

import EventCard from '../../layouts/Event/EventCard'
import CredentialList from '../../layouts/Credential/Table'
function profile() {

    let user = {
        Id:"",
        FirstName: "Dianne Chrystalin",
        LastName: "Brandez",
        Image: UserImg,
        MetamaskAddress:"0x6eWereasdD24A"
    }


    return (
    <div id='Profile'>
        <div id='Profile__Container_Div'>
            <img id='Profile__Img' src={user.Image} alt="" />
            <div id='Profile__Div__Info__Container'>
                <h3>{user.FirstName + " " + user.LastName}</h3>
                <div id='User__Div_Info'>
                    <a href="/" >
                        <UserPanelInfo Title={user.MetamaskAddress} Image={MetaMaskIcon}/>
                    </a>
                    <UserPanelInfo Title="0x6eWereasdD24A" Image={MetaMaskIcon}/>
                </div>
            </div>
        </div>
        <div id='Main_Div'>
            <div id='SideBar__Div'>
                <div id="sticky">
                    <div className='Panel__Container' id='AboutMe__Div'>
                        <h5 className='Panel__Title'>About me</h5>
                        <p className='BodyText3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas cum voluptatibus debitis! Quaerat alias eius debitis tempore. Molestiae animi quae, eveniet repudiandae eligendi officia, nisi labore aut voluptatem recusandae provident.</p>
                    </div>
                    <div className='Panel__Container' id='Contact__Div'>
                        <ul className='Panel__MultipleContent'>
                            <li>
                                <h5 className='Panel__Title'>Contact</h5>
                                <div className='Panel__Content__IconText'>
                                    <CallIcon/>
                                    <p className='BodyText3'> 0915-6666-147</p>
                                </div>
                            </li>
                            <li>
                                <h5 className='Panel__Title'>Location</h5>
                                <div className='Panel__Content__IconText'>
                                    <EmailIcon/>
                                    <p className='BodyText3'> Marikina, Philippines</p>
                                </div>
                            </li>
                            <li>
                                <h5 className='Panel__Title'>Location</h5>
                                <div className='Panel__Content__IconText'>
                                    <LocationOnIcon/>
                                    <p className='BodyText3'> Marikina, Philippines</p>
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
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
                        <EventCard/>
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

export default profile