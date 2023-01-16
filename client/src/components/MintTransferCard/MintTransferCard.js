import React, { useState } from 'react';
import './MintTransferCard.scss';

import { Button } from '@mui/material';

import UserPanelInfo from '../../components/UserPanel/UserPanelInfo';

import UserIcon from './../../images/icons/user-round.png';

import ViewRequestorModal from '../../layouts/MintTransfer/ViewRequestorModal';

import axios from '../../config/axios';

function MintTransferCard(props) {
	const [OpenModal, setOpenModal] = useState(false);
	const {
		name,
		address,
		role,
		img,
		status,
		eventId,
		eventTitle,
		date,
		location,
		type
	} = props;

	// const certificateId = axios
	// 	.post('certificates/save', {
	// 		headers: { 'Content-Type': 'application/json' }
	// 	})
	// 	.then(({ data }) => data.certificateId);

	// const certificateId = null;

	// const GenerateCertificateID = async () => {
	// 	const certificateId = await axios
	// 		.post('certificates/save', {
	// 			headers: { 'Content-Type': 'application/json' }
	// 		})
	// 		.then(({ data }) => data.certificateId);
	// 		console.log(certificateId);
	// 	return certificateId;
	// };

	// function OpenProcess() {
	// 	// certificateId = GenerateCertificateID();
	// 	certificateId = 'Test';
	// 	console.log(certificateId);
	// 	setOpenModal(true);
	// }

	// let certificateId = null;

	return (
		<>
			<div className='MintTransfer__Card Panel__Container'>
				<UserPanelInfo
					Image={img ? img : UserIcon}
					Title={name}
				/>
				<ul>
					<li>
						<h6 className='Card__Title'>Event Role</h6>
						<h6 className='Card__Content'>{role}</h6>
					</li>
				</ul>
				<div id='MintTransfer__Button'>
					{type === 'pending' ? (
						<>
							{/* <Button variant='outlined' onClick={()=>setOpenModal(true)}>View</Button> */}
							{/* <Button
								variant='contained'
							>
								Check CertID
							</Button> */}
							<Button
								variant='contained'
								onClick={() => setOpenModal(true)}
							>
								Process
							</Button>
						</>
					) : (
						<Button
							variant='outlined'
							onClick={props.handler}
						>
							View
						</Button>
					)}
				</div>
			</div>
			<ViewRequestorModal
				address={address}
				name={name}
				role={role}
				eventId={eventId}
				eventTitle={eventTitle}
				status={OpenModal}
				setter={setOpenModal}
				date={date}
				location={location}
				// certificateId={null}
			/>
		</>
	);
}

export default MintTransferCard;
