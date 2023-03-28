import React, { useState, useEffect }  from 'react'
import './Analytics.scss'
import UserPanelInfo from '../../components/UserPanel/UserPanelInfo'
import SampleImage from '../../images/Resources/Developers/Dianne.jpg'
import DashboardPlaceHolder from '../../images/placeholder/EventDashboard.JPG'
import UserIcon from './../../images/icons/user-round.png';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import EventNoteIcon from '@mui/icons-material/EventNote';
import TopicIcon from '@mui/icons-material/Topic';

import axios from '../../config/axios';

function DashboardAdmin() {

    const [members, setMembers] = useState(null);

	useEffect(() => {
		// Retrieves All Events Data
		const fetchMembers = async () => {
			const response = await axios.get(`/members`).then((response) => {
				setMembers(response.data);
			});
		};
		fetchMembers();
	}, []);

    if (!members) return <div>loading...</div>;

    return (
        <div id='AdminDasboard'>
            <section id='DashboardAdmin__Content'>
                <div id='DashboardInfo__Container'>
                    <div className='Panel__Container DashboardInfo__Card'>
                        <AccountBalanceWalletIcon id="Icon" sx={{ color:"#666666"}} />
                        <div>
                            <h2 className='HighlightText'>1.5 MATIC</h2>
                            <h6 className='HighlightText'>$125,122.3</h6>
                            <h6>Available MATIC on wallets</h6>
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
                    {members.length > 0 && members.map((member) => {
                        return (
                            <a href={`/a/member/${member.walletAddress}`}>
                                <UserPanelInfo Image={UserIcon} Title={
                                    (member.name?.firstName || member.name?.lastName)?
                                        <>
                                            {(member.name?.firstName ?? '') + ' '}
                                            {member.name?.middleName
                                                ? [...member.name.middleName][0]
                                                : ''}
                                            .{' ' + (member.name?.lastName ?? '')}
                                            {' ' + (member.name?.extension ?? '')}
                                        </>
                                        :
                                        <>
                                            {member.walletAddress}
                                        </>
                                }/>
                            </a>
                        );
                    })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardAdmin