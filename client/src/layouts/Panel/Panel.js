import React from 'react'
import { Outlet } from 'react-router-dom';

// Styles
import './../../styles/Dashboard.scss';
import './../../styles/Public.scss';

// Layouts
import SideNavBar from './../SideNavBar/SideNavBar.js';
import HeaderNavigation from './../Header/Header.js';
import LandingPage from './../../pages/LandingPage/LandingPage';
import NavBar from './../../layouts/NavBar/NavBar.js';

function Panel() {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
        switch (user.type){
            case 'user':
                return (
                    <div id='DashboardHolder'>
                      <div id="Navigation">
                        <SideNavBar User={user.walletAddress} Type={user.type}/>
                      </div>
                      <div id="Holder_Content">
                        <HeaderNavigation User={user.walletAddress} Type={user.type}/>
                        <div id="Content">
                            {window.location.pathname == '/' ? window.location.replace(`users/${user.walletAddress}`) : <Outlet/>}
                        </div>
                      </div>
                    </div>
                )
            case 'institution':
                return (
                    <div id='DashboardHolder'>
                      <div id="Navigation">
                        <SideNavBar UserType="Admin" User={user.walletAddress} Type={user.type}/>
                      </div>
                      <div id="Holder_Content">
                        <HeaderNavigation UserType="Admin" User={user.walletAddress} Type={user.type}/>
                        <div id="Content">
                            {window.location.pathname == '/' ? window.location.replace(`institutions/${user.walletAddress}`) : <Outlet/>}
                        </div>
                      </div>
                    </div>
                )
        }
    } else{
        return <>
            <NavBar />
            <div id='DashboardPublic'>
                <div id="Content">
                    {window.location.pathname == '/' ? <LandingPage/> : <Outlet />}
                </div>
            </div>
        </>;
    }
    
}

export default Panel