import React, {useState} from 'react';
import './MemberCard.scss'
import { Avatar,Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import Tooltip from '@mui/material/Tooltip';
function MemberCard(props) {
    const {
        name,
        walletAddress,
        institutionID,
        image,
        member,
        membershipProof,
        memberId
    } = props;
    const [openModal, setOpenModal] = React.useState(false);
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
    const [blockStatus, setBlockStatus] = useState(false);



    return <>
        {member?<>
            <div id='MemberCard'>
                <div className={blockStatus?"MemberCard__MoreButton active": "MemberCard__MoreButton"}>
                    <Tooltip title="Block">
                        <IconButton onClick={props.block}>
                            <ReportGmailerrorredIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                
                <a href={`/users/${props.walletAddress}`} id='MemberCard__Container'>
                    <Avatar id="MemberCard__Avatar" src={image}/>
                    <div id='MemberCard__Text'>
                        <h6 className='BodyText2' id='MemberCard__Name'>{name}</h6>
                        {!institutionID ? '' :
                            <p className='BodyText3' id='MemberCardID__InstitutionID'>{institutionID}</p>
                        }
                        <p className='BodyText3' id='MemberCardID__InstitutionID'>{ShortingWallet(walletAddress)}</p>
                    </div>
                </a>
            </div>
        </>
        :
        <>
            <div id='MemberCard'>
                <div className={blockStatus?"MemberCard__MoreButton active": "MemberCard__MoreButton"}>
                    <Tooltip title="Block">
                        <IconButton onClick={props.block}>
                            <ReportGmailerrorredIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                <a id='MemberCard__Container' onClick={member?"":()=>{setOpenModal(!openModal)}} className={member?"":"Buttons"}>
                    <Avatar id="MemberCard__Avatar" src={image}/>
                    <div id='MemberCard__Text'>
                        <h6 id='MemberCard__Name'>{name}</h6>
                        
                        {!institutionID ? '' :
                            <p className='BodyText3' id='MemberCardID__InstitutionID'>{institutionID}</p>
                        }
                        <p className='BodyText3' id='MemberCardID__InstitutionID'>{ShortingWallet(walletAddress)}</p>
                    </div>
                </a>
                <div id='MemberCardID__Buttons'>
                    <Button variant='' onClick={props.reject}>Decline</Button>
                    <Button variant='contained' onClick={props.accept}>Accept</Button>    
                </div>
            </div>
        </>}
        <Modal
            open={openModal}
            onClose={()=>{setOpenModal(false)}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div id='MemberCardModal'>
                <img src={(!membershipProof) ? '' : membershipProof} alt="" />
            </div>
        </Modal>
    </>
}

export default MemberCard