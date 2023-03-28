import React,{useState} from 'react'
import Button from '@mui/material/Button';
import MemberCard from '../../components/Card/MemberCard.js';
import SearchInput from '../../components/SearchInput/SearchInput.js';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Analytics from '../../layouts/Event/Admin/EventAnalytics.js';
function MemberList() {
    const [isOpenPanel_Institution, seOpenPanel_Institution] = useState('All');


    const Members = [
		{ name : 'Dianne Chrystalin Brandez', userID : "023245", institutionID:"020008524",totalRequestedDocuments:"5",},
        { name : 'Gian Carlo Dela Cruz', userID : "023245", institutionID:"020008524",totalRequestedDocuments:"5",},
        { name : 'Jon Angelo Llagas', userID : "023245", institutionID:"020008524",totalRequestedDocuments:"5",},
        { name : 'John Michael Hipolito', userID : "023245", institutionID:"020008524",totalRequestedDocuments:"5",},
    ];
    const MembersJoinRequests = [
		{ name : 'Shiba Castillo', userID : "023245", institutionID:"020008524",totalRequestedDocuments:"5",},
        
    ];
    return (
        <div id='AdminDasboard'>
            <section id='institutions'>
                <div className='Title__Div'>
                    <h2 className='SectionTitle'>Members</h2>
                    <h5 className='SectionSubTitle'>Members of the institution</h5>
                </div>
                <div className='Navigation_Institution'>
                    <div className='Navigation_Left'>
                        <Button variant={
                            isOpenPanel_Institution === 'All'
                                ? 'contained'
                                : ''
                        }
                        onClick={() => seOpenPanel_Institution('All')}
                        >
                            All
                        </Button>
                        <Button 
                        variant={
                            isOpenPanel_Institution === 'New Members'
                                ? 'contained'
                                : ''
                        }
                        onClick={() => seOpenPanel_Institution('New Members')}>
                            New Members
                        </Button>
                        <Button 
                        variant={
                            isOpenPanel_Institution === 'Join Requests'
                                ? 'contained'
                                : ''
                        }
                        onClick={() => seOpenPanel_Institution('Join Requests')}>
                            Join Requests
                        </Button>
                    </div>
                    <div className='Navigation_Right'>
                    </div>
                </div>
                <div id='Panel_institutions'>
                    {(isOpenPanel_Institution === "All")?
                    <>
                        <div className='NavigationSidetoSide'>
                            <SearchInput/>
                            
                            <div className='NavigationSidetoSide__Right__Container'>
                                <IconButton aria-label="delete" >
                                    <FilterAltIcon />
                                </IconButton>
                            </div>
                        </div>
                        <div className='Wrapper__Card'>
                            {Members.map((Member) => (
                                <MemberCard name={Member.name} institutionID={Member.institutionID} image={Member.image} member={true}/>
                            ))}
                        </div>
                    </>:<></>
                    }
                    {(isOpenPanel_Institution === "Join Requests")?
                    <>
                        <div className='NavigationSidetoSide'>
                            <SearchInput/>
                            
                            <div className='NavigationSidetoSide__Right__Container'>
                                <IconButton aria-label="delete" >
                                    <FilterAltIcon />
                                </IconButton>
                            </div>
                        </div>
                        <div className='Wrapper__Card'>
                            {MembersJoinRequests.map((Member) => (
                                <MemberCard name={Member.name} institutionID={Member.institutionID} image={Member.image} member={false}/>
                            ))}
                        </div>
                    </>:<></>
                    }
                </div>
            </section>
            <div>
                <Analytics/>
            </div>
        </div>
    )
}



export default MemberList