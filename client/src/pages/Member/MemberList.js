import React,{useState, useEffect, useCallback} from 'react'
import Button from '@mui/material/Button';
import MemberCard from '../../components/Card/MemberCard.js';
import SearchInput from '../../components/SearchInput/SearchInput.js';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Analytics from '../../layouts/Analytics/Analytics.js';
import Loading from '../../components/Loading/Loading.js';
import axiosInstance from '../../utils/axios';
import SnackbarComponent from '../../components/Snackbar/SnackbarComponent.js';
function MemberList() {

    // Constant Declarations
    const [members, setMembers] = useState();
    const [joinRequests, setJoinRequests] = useState();
    const [isOpenPanel_Institution, seOpenPanel_Institution] = useState('All');
    const [openSnackBar, setOpenSnackBar] = React.useState({
        open:false,
        type:"",
        note:""
    });
    // Excecutes on page load
    useEffect(() => {
        // Execute Functions
        fetchJoinRequests();
		fetchMembers();
    }, [])

    // Retrieves Institutions' Members
    const fetchMembers = async () => {
        await axiosInstance
            .get(`institutions/members`)
            .then((response) => {
                setMembers(response.data)
            });
    };

    // Retrieves Institutions' Join Requests
    const fetchJoinRequests = async () => {
        await axiosInstance
            .get(`requests`,{
                params: {
                    requestType: 'join'
                }
            })
            .then((response) => { 
                setJoinRequests(response.data)
                console.log(response.data)
            });
    };

    const AcceptRequest = async (request) => {
        try {
            const formData = new FormData();
            formData.append('body', JSON.stringify({
                requestId: request.requestId,
                status: 'approved',
            }))
            await axiosInstance.patch(
                `requests`,
                formData
            )
            .then((res)=>{
                setOpenSnackBar(openSnackBar => ({
                    ...openSnackBar,
                    open:true,
                    type:"success",
                    note:"Member Added"
                }))
                // Execute Functions
                fetchJoinRequests();
                fetchMembers();
            })
        } catch (err) {      
            console.error(err.message);
        }
    }

    const RejectRequest = async (request) => {
        try {
            const formData = new FormData();
            formData.append('body', JSON.stringify({
                requestId: request.requestId,
                status: 'declined',
            }))
            await axiosInstance.patch(
                `requests`,
                formData
            )
            .then((res)=>{
                setOpenSnackBar(openSnackBar => ({
                    ...openSnackBar,
                    open:true,
                    type:"error",
                    note:"Member Rejected"
                }))
                // Execute Functions
                fetchJoinRequests();
                fetchMembers();
            })
        } catch (err) {      
            console.error(err.message);
        }
    }

    if(!members || !joinRequests) return <Loading/>

    return (
        <div className='AdminPanelContainer'>
            <section className='AdminPanelContainer__Content' id='institutions'>
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
                <div >
                    {(isOpenPanel_Institution === "All")?
                    <>
                        {/* <div className='NavigationSidetoSide'>
                            <SearchInput/>
                            
                            <div className='NavigationSidetoSide__Right__Container'>
                                <IconButton aria-label="delete" >
                                    <FilterAltIcon />
                                </IconButton>
                            </div>
                        </div> */}
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
                                            image={member.user.photo} 
                                            member={true}
                                            memberId={member.details.idNumber}
                                            membershipProof={member.details.membership}
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
                        {/* <div className='NavigationSidetoSide'>
                            <SearchInput/>
                            
                            <div className='NavigationSidetoSide__Right__Container'>
                                <IconButton aria-label="delete" >
                                    <FilterAltIcon />
                                </IconButton>
                            </div>
                        </div> */}
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
                                            walletAddress={request.requestor.walletAddress} 
                                            institutionID={(!request.details?.idNumber) ? request.details?.idNumber : ''}
                                            member={false}
                                            membershipProof={(!request.details?.membership) ? request.details?.membership : ''}
                                            image={request.requestor.photo} 
                                            accept={()=>AcceptRequest(request)}
                                            reject={()=>RejectRequest(request)}
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
            {/* <div className='AdminPanelContainer__SideContent'>
                <Analytics/>
            </div> */}
            <SnackbarComponent open={openSnackBar} setter={setOpenSnackBar}/>
        </div>
    )
}



export default MemberList