import React, { useState } from 'react';
import './MintTransferCard.scss';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import TextField from '@mui/material/TextField';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
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
		requestId,
        address,
        name,
        title,
        date,
        type,
		id,
		status,
		key
	} = props;


	return (
		<>
			<div className='MintTransferCard Panel__Container' key={key}>
				<div id='MintTransferCard__Date'>
					<h6>Date Requested</h6>
					<p className='BodyText3'>{date}</p>
				</div>
				<a href='/' id='MintTransferCard__UserInfo'>
					<Avatar id="MintTransferCard__Avatar" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
					<p className='BodyText1'>{name}</p>
				</a>
				<p id='MintTransferCard__Title' className='BodyText3'>{title}</p>
				<div id='MintTransferCard__ID'>

					<Tooltip title="Copy">
						<Chip  label={id} onClick={()=>{}} icon={<ContentCopyIcon fontSize="small" />}/>
					</Tooltip>
				</div>
				{status==="pending"|| status==="approved"?<>
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
						<Button variant='contained' onClick={props.action}>Accept</Button>
					</div>
				</>:<></>}
				{status==="process"?<>
					<div id='MintTransferCard__Buttons'>
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
						<Button variant='contained' onClick={props.action}>process</Button>
					</div>
				</>:<></>}
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