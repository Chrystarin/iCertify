import React, { useState } from 'react';
import './RequestCard.scss';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import TextField from '@mui/material/TextField';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import IconButton from '@mui/material/IconButton';



function RequestCard(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
        props.decline(note)
		setAnchorEl(null);
	};


    const [note, setNote] = useState();
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
		key,
        paymentProof,
        multipleSelectStatus,
        setSelectMultipleStatus,
        setMultipleSelectValue,
        MultipleSelectValue
        
	} = props;

	const ShortingWallet = (data) =>{
        let startString = "";
        let EndString = "";
        for (let i= 0; i < 6; i++) {
            startString = startString + data.charAt(i)
        }
        for (let i = data.length-4; i < data.length; i++) {
            EndString = EndString + data.charAt(i);
        }
        return startString + "..." + EndString
    }

	return (
		<>
			<div className={MultipleSelectValue?.includes(requestId)?"MintTransferCard Panel__Container activeRequestCard":"MintTransferCard Panel__Container"} key={key}>
				<div id='MintTransferCard__Date'>
					<h6>Date Requested</h6>
					<p className='BodyText3'>{date}</p>
				</div>
				<a href={`/users/${id}`} id='MintTransferCard__UserInfo'>
					<Avatar id="MintTransferCard__Avatar" alt="Remy Sharp" src={props.image ? props.image : "/static/images/avatar/1.jpg"} />
					<p className='BodyText1'>{name}</p>
                    
				</a>
                <div className={MultipleSelectValue?.includes(requestId)?"MintTransferCard__MultipleSelect MintTransferCard__MultipleSelectactive" :"MintTransferCard__MultipleSelect "}
                    onClick={
                        MultipleSelectValue?.includes(requestId)?()=>{
                            if(MultipleSelectValue.length === 1){
                                setSelectMultipleStatus(false);
                            }
                            setMultipleSelectValue(MultipleSelectValue.filter((item)=>item !== requestId))
                        }:()=>{
                            setSelectMultipleStatus(true);
                            setMultipleSelectValue([...MultipleSelectValue,requestId]);
                        }
                        
                    }
                >
                    <IconButton size="large">
                        <AutoAwesomeMotionIcon/>
                    </IconButton>
                </div>
				<p id='MintTransferCard__Title' className='BodyText3'>{title}</p>
				<div id='MintTransferCard__ID'>
                    {(!paymentProof) ? '' :
                        <Tooltip title="Copy">
                            <Chip  label={"View Payment"} onClick={()=>{window.open(paymentProof, '_blank', 'noreferrer')}} icon={<RemoveRedEyeIcon fontSize="small" />}/>
                        </Tooltip>
                    }
					<Tooltip title="Copy">
						<Chip  label={ShortingWallet(id)} onClick={()=> navigator.clipboard.writeText(id)} icon={<ContentCopyIcon fontSize="small" />}/>
					</Tooltip>
				</div>
				{(status==="pending"|| status==="paid")?<>
					<div className='MintTransferCard__Buttons' id='MintTransferCard__Buttons_2'>
						<Button disabled={MultipleSelectValue?.includes(requestId)?true:false}  variant='outlined' onClick={handleClick}>Decline</Button>
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
                                onChange={(e)=>setNote(e.target.value)}
								/>
								<div>
									<Button variant='contained' onClick={handleClose}>Ok</Button>
								</div>
							</div>
						</Menu>
						<Button disabled={MultipleSelectValue?.includes(requestId)?true:false} variant='contained' onClick={props.action}>Accept</Button>
					</div>
				</>:<>
                    {/* <div className='MintTransferCard__Buttons' id='MintTransferCard__Buttons_1'>
                        {MultipleSelectValue?.includes(requestId)?<>
                            <Button variant='' onClick={()=>{
                                setMultipleSelectValue(MultipleSelectValue.filter((item)=>item !== requestId))
                            }}>
                                unselect
                            </Button>
                            {multipleSelectStatus?<>
                                <Button variant='contained' onClick={()=>{
                                    setMultipleSelectValue([...MultipleSelectValue,requestId])
                                }}>
                                    select
                                </Button>
                            </>:<></>}
                        </>:<></>}
						
					</div> */}
                </>}
				{status==="verified"?<>
					<div className='MintTransferCard__Buttons' id='MintTransferCard__Buttons_1'>
						<Button variant='contained' onClick={props.action}  disabled={MultipleSelectValue?.includes(requestId)?true:false} >Process</Button>
					</div>
				</>:<></>}
			</div>
		</>
	);
}

export default RequestCard;
