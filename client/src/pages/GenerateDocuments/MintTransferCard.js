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
				{status==="pending"|| status==="paid"?<>
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
				{status==="verified"?<>
					<div id='MintTransferCard__Buttons'>
						<Button variant='contained' onClick={props.action}>Process</Button>
					</div>
				</>:<></>}
			</div>
		</>
	);
}

export default MintTransferCard;
