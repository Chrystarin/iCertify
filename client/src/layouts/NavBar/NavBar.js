import React from 'react';

import Login from '../../components/Login/Login.js';
import WordMark from './../../images/iCertifyBranding//Whitehorizontal.png';

import './NavBar.scss';

export default function NavBar() {
	return (
		<header>
			<div id='Wrapper_Header'>
				<a href='/' id='Home_nav'>
					<img src={WordMark} alt=''/>
				</a>
				<nav>
					<ul>
						<li> <Login/> </li>
						<li id='divider'></li>
						<li id='GetStarted__Container'>
							<a href='/register' id='GetStarted'> Register </a>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}