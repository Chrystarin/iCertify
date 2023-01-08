import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import './Events.scss';

import Card from '../../components/Card/Card.js';
import ImagePosterSample from './../../images/placeholder/PosterSample.jpg';

import axios from '../../config/axios';

function Event() {
	const [isOpenPanel_Events, setIsOpenPanel_Events] =
		useState('FeaturedEvents');

	return (
		<section id='Events'>
			<div className='Title__Div'>
				<h2 className='SectionTitle'>Events</h2>
				<h5 className='SectionSubTitle'>Collections of Events</h5>
			</div>
			<div className='Navigation_Event'>
				<button
					id='FeaturedEvents'
					className={
						isOpenPanel_Events === 'FeaturedEvents'
							? 'Selected'
							: ''
					}
					onClick={() => setIsOpenPanel_Events('FeaturedEvents')}
				>
					Featured Events
				</button>
				<button
					id='JoinedEvents'
					className={
						isOpenPanel_Events === 'JoinedEvents' ? 'Selected' : ''
					}
					onClick={() => setIsOpenPanel_Events('JoinedEvents')}
				>
					Joined Events
				</button>
				<span>.</span>
				<button
					id='ManageEvents'
					className={
						isOpenPanel_Events === 'ManageEvents' ? 'Selected' : ''
					}
					onClick={() => setIsOpenPanel_Events('ManageEvents')}
				>
					Manage Events
				</button>
			</div>
			<div id='Panel_Events'>
				<Panel_Events open={isOpenPanel_Events} />
			</div>
		</section>
	);
}

function Panel_Events(props) {
	const [joinedEvents, setJoinedEvents] = useState(null);
	const [walletAddress, setWalletAddress] = useState('');
	const [events, setEvents] = useState(null);

	useEffect(() => {
		// Retrieves All Events Data
		const fetchEvents = async () => {
			const response = await axios.get(`/events`).then((response) => {
				setEvents(response.data);
			});
		};

		// Retrieves Joined Events Data
		const fetchJoinedEvents = async () => {
			const response = await axios
				.get(`members/${walletAddress}/events`)
				.then((response) => {
					setJoinedEvents(response.data);
				});
		};

		const addWalletListener = async () => {
			if (window.ethereum)
				window.ethereum.on('accountsChanged', (accounts) =>
					setWalletAddress(accounts[0])
				);
			else setWalletAddress('');
		};

		addWalletListener();
		fetchEvents();
		console.log(walletAddress);
	}, []);

	if (!events) return <div>loading...</div>;
	// if (!joinedEvents) return <div>loading... No Joined Events</div>;

	if (props.open === 'FeaturedEvents') {
		return (
			<div id='Container_FeaturedEvents'>
				<div id='Container_Ads_FeaturedEvents'>
					<div id='Slider_FeaturedEvents'>
						<a href='http://'>
							<img
								src={ImagePosterSample}
								alt=''
							/>
						</a>
					</div>
					<div id='Ads_FeaturedEvents'>
						<span>Advertisement</span>
					</div>
				</div>
				<div id='Container_Upcoming_FeaturedEvents'>
					<h5>Upcoming Events</h5>
					<div id='Wrapper_Upcoming_FeaturedEvents'>
						{events.length > 0 &&
							events.map((event) => {
								if (event.status == 'active') {
									return (
										<Card
											title={event.title}
											key={event.eventId}
											id={event.eventId}
											date={event.date.start}
											type={'event'}
										/>
									);
								}
							})}
					</div>
				</div>
			</div>
		);
	} else if (props.open === 'JoinedEvents') {
		return (
			<div id='Container_JoinedEvents'>
				<div className='EventPerMonths'>
					<span>October 2022</span>
					<Card />
				</div>
				<div className='EventPerMonths'>
					<span>October 2022</span>
					<Card />
				</div>
			</div>
		);
	} else if (props.open === 'ManageEvents') {
		return <div id='Container_ManageEvents'>ManageEvents</div>;
	}
}
export default Event;
