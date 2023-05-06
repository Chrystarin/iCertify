import React, {useState,useRef,useEffect}from 'react';

import './Header.scss';

import { Button } from '@mui/material';
import SearchInput from '../../components/SearchInput/SearchInput.js';
import Logout from '../../components/Logout/Logout.js';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import MetaMaskIcon from './../../images/icons/fox.png';
import axiosInstance from '../../utils/axios';
import { useAuth } from "../../utils/AuthContext";

function Header() {
    const [user, setUser] = useState();
    const [type, setType] = useState(JSON.parse(localStorage.getItem("user")).type);

    // For closing the dropdown when clicking outside of
    let menuRef = useRef();

    // Executes on load
	useEffect(() => {
        if(localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).type === "user"){
            fetchUser();
        }
        if(localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).type === "institution"){
            fetchInstitution();
        }
	}, []);

    // Retrieves User's Data
    const fetchUser = async () => {
        await axiosInstance
            .get(`users`,{
                params: {
                    walletAddress: JSON.parse(localStorage.getItem("user")).walletAddress
                }
            })
            .then((response) => {
                setUser(response.data);
                console.log(response.data)
            });
    };

    // Retrieves Institution Data
    const fetchInstitution = async () => {
        await axiosInstance
            .get(`institutions`,{
                params: {
                    walletAddress: JSON.parse(localStorage.getItem("user")).walletAddress
                }
            })
            .then((response) => {
                setUser(response.data);
                console.log(response.data)
            });
    };

    // Hook for profile dropdown
    const [anchorElProfile, setAnchorElProfile] = useState(null);
    const openProfile = Boolean(anchorElProfile);
    const handleClickProfile = (event) => {
        setAnchorElProfile(event.currentTarget);
    };
    const handleCloseProfile = () => {
        setAnchorElProfile(null);
    };

    // Hook for Notification dropdown
    const [anchorElNotification, setAnchorElNotification] = useState(null);
    const openNotification = Boolean(anchorElNotification);

    const ShortingWallet = (data) =>{
        let startString = "";
        let EndString = "";
        for (let i= 0; i < 6; i++) {
            startString = startString + data.charAt(i)
        }
        for (let i = data.length-4; i < data.length; i++) {
            EndString = EndString + data.charAt(i);
        }
        return startString + "..." + EndString
    }
    const handleClickNotification = (event) => {
        setAnchorElNotification(event.currentTarget);
    };
    const handleCloseNotification = () => {
        setAnchorElNotification(null);
    };

    // Notifications Function
    function Notification(){
        const Notifications = [
            {name:"STI College Marikina", purpose:"starting to create your Transcript of record", date:"Today", readStatus: false},
            {name:"OLOPSC", purpose:"finish creating your document", date:"last 5 days", readStatus: true},
            {name:"STI College Marikina", purpose:"starting to create your Document", date:"Today", readStatus: false}
        ]

        return <>
            {Notifications.map((notification) => (
                <li className={notification.readStatus?"":"unread"}>
                <a href="">
                    <Avatar className='List__Avatar'/>
                    <div className='List__Content' >
                    <p className='BodyText2'><b>{notification.name}</b> {notification.purpose}</p>
                    <p className='List__Date'>15 hours ago</p>
                    </div>
                </a>
                </li>
            ))}
        </>
    }

    if (!user) return <div>Loading...</div>
   
    return (
        <div id="header_Content">
            <div id='Navigation_Left'>
                <SearchInput/>
            </div>
            
            <div id='Navigation_Content'> 
                <div id="NotificatonHolder"ref={menuRef}>
                    <div id="ProfileDropdown">
                        {/* <Tooltip title="Notification">
                            <IconButton
                            onClick={handleClickNotification}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={openNotification ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openNotification ? 'true' : undefined}
                            >
                            <Badge badgeContent={2} color="primary">
                                <NotificationsIcon color="action" sx={{ fontSize: 30 ,cursor:"pointer"}}/>
                            </Badge>
                            </IconButton>
                        </Tooltip>
                        
                        <Menu
                            anchorEl={anchorElNotification}
                            id="account-menu"
                            open={openNotification}
                            onClose={handleCloseNotification}
                            
                            PaperProps={{
                            elevation: 0,
                            sx: {
                                padding:0,
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                                },
                                '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'white',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                                },
                            },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <div id="NotificationDropdown__Container">
                            <h4 id='NotificationDropdown__Title'>Notification</h4>
                            <ul >
                                <Notification/>
                            
                            </ul>
                            </div>
                        </Menu> */}
                    </div>
                </div>           
                
                <div id="ProfileDropdown">
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClickProfile}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={openProfile ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openProfile ? 'true' : undefined}
                        >
                            <Avatar src={type =='user' ? ((!user.photo) ? '' : user.photo) : ((!user.photos?.profile) ? '' : user.photos.profile)} alt=""></Avatar>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorElProfile}
                        id="account-menu"
                        open={openProfile}
                        onClose={handleCloseProfile}
                        
                        PaperProps={{
                            elevation: 0,
                            sx: {
                            padding:0,
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'rgb(238, 238, 238)',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <div id="ProfileDropdown__Container">
                            <a href={`/${type}s/${user.walletAddress}`}>
                                <MenuItem  id='ProfileDropdown__Header'>
                                    <Avatar id="ProfileDropdown__Header__Avatar" src={type =='user' ? ((!user.photo) ? '' : user.photo) : ((!user.photos?.profile) ? '' : user.photos.profile)} alt=""></Avatar>
                                    <div>
                                    <h6>{type =='user' ? user.name.firstName + ' ' + user.name.lastName : user.name}</h6>
                                    <div id='ProfileDropdown__Header__Metamask'>
                                        <img src={MetaMaskIcon}/>
                                        <p className='BodyText3'>{ShortingWallet(user.walletAddress)}</p>
                                    </div>
                                    </div>
                                </MenuItem>
                            </a>
                                
                                <div id='ProfileDropdown__Buttons'>
                                    <Button href={`${user.walletAddress}/edit`} variant=''>Update</Button>
                                    <Logout/>
                                </div>
                        </div>
                    </Menu>
                </div>
            </div>
        </div>
    );
}

export default Header;
