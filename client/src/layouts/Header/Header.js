import React, {useState,useRef}from 'react';


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

import axios from '../../utils/axios';
import { useAuth } from "../../utils/AuthContext";

function Header() {
    const { user } = useAuth();

    // For closing the dropdown when clicking outside of
    let menuRef = useRef();

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
                            <Avatar src={user.type =='user' ? ((!user.user.photo) ? '' : user.user.photo) : ((!user.user.photos?.profile) ? '' : user.user.photos.profile)} alt=""></Avatar>
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
                            <a href={`/${user.type}s/${user.walletAddress}`}>
                                <MenuItem  id='ProfileDropdown__Header'>
                                    <Avatar src={user.type =='user' ? ((!user.user.photo) ? '' : user.user.photo) : ((!user.user.photos?.profile) ? '' : user.user.photos.profile)} alt=""></Avatar>
                                    <div>
                                    <h6>{user.type =='user' ? user.user.name.firstName + ' ' + user.user.name.lastName : user.user.name}</h6>
                                    <div id='ProfileDropdown__Header__Metamask'>
                                        <p className='BodyText3'>{user.walletAddress}</p>
                                    </div>
                                    </div>
                                </MenuItem>
                                
                                <div id='ProfileDropdown__Buttons'>
                                    <Button variant=''>Update</Button>
                                    <Logout/>
                                </div>
                            </a>
                        </div>
                    </Menu>
                </div>
            </div>
        </div>
    );
}

export default Header;
