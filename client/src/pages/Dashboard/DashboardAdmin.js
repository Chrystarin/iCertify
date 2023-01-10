import React from 'react'
import './DashboardAdmin.scss'
import UserPanelInfo from '../../components/UserPanel/UserPanelInfo'
import SampleImage from '../../images/Resources/Developers/Dianne.jpg'
import DashboardPlaceHolder from '../../images/placeholder/EventDashboard.JPG'

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import EventNoteIcon from '@mui/icons-material/EventNote';
import TopicIcon from '@mui/icons-material/Topic';
function DashboardAdmin() {
  return (
    <div id='AdminDasboard'>
        <section id='DashboardAdmin__Content'>
            <div id='DashboardInfo__Container'>
                <div className='Panel__Container DashboardInfo__Card'>
                    <AccountBalanceWalletIcon id="Icon" sx={{ color:"#666666"}} />
                    <div>
                        <h2 className='HighlightText'>1.5 ETH</h2>
                        <h6 className='HighlightText'>$125,122.3</h6>
                        <h6>Available ETH on wallets</h6>
                    </div>
                </div>
                <div  className='Panel__Container DashboardInfo__Card'>
                    <EventNoteIcon id="Icon" sx={{ color:"#666666"}} />
                    <div>
                        <h2 className='HighlightText'>20</h2>
                        <h6 className='HighlightText'>2022 - 2023</h6>
                        <h6>Active Events</h6>
                    </div>
                </div>
                <div className='Panel__Container DashboardInfo__Card'>
                <TopicIcon id="Icon" sx={{ color:"#666666"}} />
                    <div>
                        <h2 className='HighlightText'>200</h2>
                        <h6 className='HighlightText'>2022 - 2023</h6>
                        <h6>Certificate Released</h6>
                    </div>
                </div>
            </div>
            <div id="DashboardAnalytics__Container" className='Panel__Container'>
                <img src={DashboardPlaceHolder} alt="" />
            </div>
        </section>
        <div id='DashboardAdmin__SideContent'>
            <div id='MemberList' className='Panel__Container'>
                <h4>Members</h4>
                <div id='MemberList_Wrapper'>
                    <a href="">
                        <UserPanelInfo Image={SampleImage} Title="Dianne Chrystalin Brandez"/>
                    </a>
                    <a href="">
                        <UserPanelInfo Image={SampleImage} Title="Dianne Chrystalin Brandez"/>
                    </a>
                    <a href="">
                        <UserPanelInfo Image={SampleImage} Title="Dianne Chrystalin Brandez"/>
                    </a>
                    <a href="">
                        <UserPanelInfo Image={SampleImage} Title="Dianne Chrystalin Brandez"/>
                    </a>
                    <a href="">
                        <UserPanelInfo Image={SampleImage} Title="Dianne Chrystalin Brandez"/>
                    </a>
                    <a href="">
                        <UserPanelInfo Image={SampleImage} Title="Dianne Chrystalin Brandez"/>
                    </a>

                </div>
            </div>
        </div>
    </div>
  )
}

export default DashboardAdmin