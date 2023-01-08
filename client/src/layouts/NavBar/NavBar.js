import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ethers } from 'ethers';

import useAuth from '../../hooks/useAuth';

import axios from '../../config/axios';

import ModalLogin from '../../components/Login/Login.js';
import WordMark from './../../images/iCertifyBranding//Whitehorizontal.png';
import './NavBar.scss';
import Button from '@mui/material/Button';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export default function NavBar() {
	const { setAuth } = useAuth();
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenSignup, setIsOpenSignup] = useState(false);
	const [walletAddress, setWalletAddress] = useState('');

	useEffect(() => {
		addWalletListener();
	});

	const connectWallet = async () => {
		// Check if metamask is installed
		if (typeof window.ethereum == undefined) {
			window.open('https://metamask.io/download/', '_blank');
			return;
		}

		try {
			await window.ethereum.request({ method: 'eth_requestAccounts' });
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();

			// Get address
			const address = await signer.getAddress();

			// Check if address is already registered
			const { isExisting } = (
				await axios.get(`members/${address}/exists`)
			).data;
			console.log(isExisting);
			if (!isExisting) {
				// Register address
				await axios.post(
					`members/register`,
					JSON.stringify({ walletAddress: address }),
					{
						headers: { 'Content-Type': 'application/json' }
					}
				);
			}

			// Get nonce of address
			const { nonce } = (await axios.get(`members/${address}/nonce`))
				.data;

			// Sign message
			const signature = await signer.signMessage('Nonce: ' + nonce);

			// Login with the address and signature
			const response = await axios
				.post(
					'/members/login',
					JSON.stringify({
                        walletAddress: address,
                        signature
					}),
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							withCredentials: true
						}
					}
				)
				.then((response) => {
					// setAuth({user, roles, accessToken});
					console.log(response.data);
					navigate(`/member/${address}`);
				});
		} catch (err) {
			console.error(err.message);
		}
	};

	const addWalletListener = async () => {
		if (window.ethereum)
			window.ethereum.on('accountsChanged', (accounts) =>
				setWalletAddress(accounts[0])
			);
		else setWalletAddress('');
	};

	return (
		<header>
			<div id='Wrapper_Header'>
				<a
					href='/'
					id='Home_nav'
				>
					<img
						src={WordMark}
						alt=''
					/>
				</a>
				<nav>
					<ul>
						{/* <li>
							<a href='#About'>ABOUT</a>
						</li>
						<li>
							<a href='#LearnMore'>LEARN MORE!</a>
						</li> */}
						<li>
							<Button
								id='Button'
								startIcon={<AccountBalanceWalletIcon />}
								onClick={() => connectWallet()}
							>
								Login Metamask
							</Button>
						</li>
						<li id='divider'></li>
						<li id='GetStarted__Container'>
							<a
								href='/getstarted'
								id='GetStarted'
								onClick={() => setIsOpenSignup(true)}
							>
								{' '}
								Get Started
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}
