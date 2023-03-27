import React, { useState } from 'react';
import './MintTransferCard.scss';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import UserPanelInfo from '../../components/UserPanel/UserPanelInfo';
import Chip from '@mui/material/Chip';
import UserIcon from './../../images/icons/user-round.png';
import Tooltip from '@mui/material/Tooltip';
import ViewRequestorModal from '../../layouts/MintTransfer/ViewRequestorModal';
import Menu from '@mui/material/Menu';
import axios from '../../config/axios';
import TextField from '@mui/material/TextField';
function MintTransferCard(props) {

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
  	};

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
			<div className='MintTransferCard Panel__Container'>
				<div id='MintTransferCard__Date'>
					<h6>Expected Finish Date</h6>
					<p className='BodyText3'>October 18, 2020 - October 20, 2020</p>
				</div>
				<a href='/' id='MintTransferCard__UserInfo'>
					<Avatar id="MintTransferCard__Avatar" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
					<h6>Harold James H. Castillo</h6>
				</a>
				<div id='MintTransferCard__ID'>
					<Tooltip title="Copy">
						<Chip label="02000069502" onClick={()=>{}}/>
					</Tooltip>
				</div>
				<div id='MintTransferCard__Buttons'>
					<Button variant='outlined' onClick={handleClick}>Decline</Button>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
						'aria-labelledby': 'basic-button',
						}}
					>
						<div id='DeclineDropdown'>
							<h6>Reason of decline :</h6>
							<TextField
							id="outlined-multiline-flexible"
							label=""
							multiline
							maxRows={4}
							variant="standard"
							/>
							<div>
								<Button variant='contained' onClick={handleClose}>Ok</Button>
							</div>
						</div>
					</Menu>
					<Button variant='contained' href='/a/document/create'>Process</Button>
				</div>
			</div>
		</>
	);
}
{/* <UserPanelInfo
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
			<Button variant='outlined' onClick={()=>setOpenModal(true)}>View</Button>
			<Button
				variant='contained'
			>
				Check CertID
			</Button>
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
</div> */}
export default MintTransferCard;
