import React from 'react';
// import './../styles/Dashboard.scss';
import './../styles/Public.scss';
import { Outlet } from 'react-router-dom';

import HeaderNavigation from '../layouts/NavBar/NavBar.js';
import LandingPage from '../pages/LandingPage/LandingPage';

function Public(props) {
    const root = props;
	return (
		<div id='DashboardPublic'>
			<HeaderNavigation />
			<div>
                {window.location.pathname == '/' ? <LandingPage/> : <Outlet />}
			</div>
		</div>
	);
}

export default Public;
