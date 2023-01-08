import React from 'react';
// import './../styles/Dashboard.scss';
import './../styles/Public.scss';
import { Outlet } from 'react-router-dom';

import HeaderNavigation from '../layouts/NavBar/NavBar.js';

function Public(props) {
	return (
		<div id='DashboardPublic'>
			<HeaderNavigation />

			<div id='Content'>
				<Outlet />
			</div>
		</div>
	);
}

export default Public;
