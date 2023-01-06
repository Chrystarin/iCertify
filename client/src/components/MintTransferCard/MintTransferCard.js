import React, {useState} from 'react'
import './MintTransferCard.scss';

import { Button } from '@mui/material';

import UserPanelInfo from '../../components/UserPanel/UserPanelInfo';

import UserIcon from './../../images/icons/user-round.png';

import ViewRequestorModal from '../../layouts/MintTransfer/ViewRequestorModal';

function MintTransferCard(props) {
    const [OpenModal,setOpenModal] = useState(false);
    const {
        name,
        address,
        role,
        img,
        status,
        eventId,
        eventTitle,
        date,
        location
    } = props;
    
    return (<>
        <div className="MintTransfer__Card Panel__Container">
            <UserPanelInfo Image={img ? img : UserIcon}  Title={name}/> 
            <ul>
                <li>
                    <h6 className='Card__Title'>Event Role</h6>
                    <h6 className='Card__Content'>{role}</h6>
                </li>
            </ul>
            <div id='MintTransfer__Button'>
                {(status === "Pending")?
                <>
                    <Button variant='outlined' onClick={()=>setOpenModal(true)}>View</Button>
                    <Button variant='contained' onClick={()=>console.log("Process")}>Process</Button>
                </>
                : <Button variant='outlined' onClick={props.handler}>View</Button>}
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
        />
    </>)
}

export default MintTransferCard