import React,{useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import MemberCard from '../../components/Card/MemberCard.js';
import SearchInput from '../../components/SearchInput/SearchInput.js';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Analytics from '../../layouts/Analytics/Analytics.js';

import axios from '../../utils/axios';

function MemberList() {

    // Constant Declarations
    const [members, setMembers] = useState();
    const [joinRequests, setJoinRequests] = useState();
    const [isOpenPanel_Institution, seOpenPanel_Institution] = useState('All');

    // Excecutes on page load
    useEffect(() => {
        // Retrieves Institutions' Members
		const fetchMembers = async () => {
			await axios
				.get(`institutions/members`)
				.then((response) => {
					setMembers(response.data)
                    console.log(response.data)
				});
		};

        // Retrieves Institutions' Members
		const fetchJoinRequests = async () => {
			await axios
				.get(`requests`,{
                    params: {
                        type: 'join'
                    }
                })
				.then((response) => { 
					setJoinRequests(response.data)
                    
				});
		};

        // Execute Functions
        fetchJoinRequests();
		fetchMembers();
    }, [])

    const AcceptRequest = async (request) => {
        try {
            await axios.patch(
                `requests`,
                JSON.stringify({ 
                    requestId: request.requestId,
                    status: request.status
                })
            )
            .then((res)=>{
                alert("Member Added!")
                console.log(res.data)
                window.location.reload(true); 
            })
        } catch (err) {      
            console.error(err.message);
        }
    }

    if(!members || !joinRequests) return <div>Loading...</div>

    return (
        <div id='AdminDasboard'>
            <section id='institutions'>
                <div className='Title__Div'>
                    <h2 className='SectionTitle'>Members</h2>
                    <h5 className='SectionSubTitle'>Members of the institution</h5>
                </div>
                <div className='Navigation_Institution'>
                    <div className='Navigation_Left'>
                        <Button 
                            variant={
                                isOpenPanel_Institution === 'All'
                                    ? 'contained'
                                    : ''
                            }
                            onClick={() => seOpenPanel_Institution('All')}
                        >
                            All
                        </Button>
                        {/* <Button 
                            variant={
                                isOpenPanel_Institution === 'New Members'
                                    ? 'contained'
                                    : ''
                            }
                            onClick={() => seOpenPanel_Institution('New Members')}
                        >
                            New Members
                        </Button> */}
                        <Button 
                            variant={
                                isOpenPanel_Institution === 'Join Requests'
                                    ? 'contained'
                                    : ''
                            }
                            onClick={() => seOpenPanel_Institution('Join Requests')}
                        >
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
                        {(members.length === 0 )?
                            <p>No Requests found!</p>
                            :
                            <>
                                {members.length > 0 &&
                                members.map((member) => {
                                    return (
                                        <MemberCard 
                                            key={member.user.walletAddress} 
                                            name={member.user.name.firstName + ' ' + member.user.name.lastName } 
                                            institutionID={member.user.walletAddress} 
                                            member={true}
                                        />
                                    );
                                })}
                            </>
                        }
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
                        {(joinRequests.length === 0 )?
                            <p>No Requests found!</p>
                            :
                            <>
                                {joinRequests.length > 0 &&
                                joinRequests.map((request) => {
                                    if (request.status == 'pending') return (
                                        <MemberCard 
                                            key={request.requestor.walletAddress} 
                                            name={`${request.requestor.name.firstName}`+" "+`${request.requestor.name.lastName}`}
                                            institutionID={request.requestor.walletAddress} 
                                            member={false}
                                            onClick={()=>AcceptRequest(request)}
                                        />
                                    );
                                })}
                            </>
                        }
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