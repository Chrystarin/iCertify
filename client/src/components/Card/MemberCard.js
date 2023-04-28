import React from 'react';
import './MemberCard.scss'
import { Avatar,Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import IDSample from '../../images/placeholder/IDSample.jpg'
function MemberCard(props) {
    const {
        name,
        institutionID,
        image,
        member
    } = props;
    const [openModal, setOpenModal] = React.useState(false);

    console.log(image)
    
    return <>
        {member?<>
            <div id='MemberCard'>
                <a href={`/users/${props.institutionID}`} id='MemberCard__Container'>
                    <Avatar id="MemberCard__Avatar" src={image}/>
                    <div id='MemberCard__Text'>
                        <h6 id='MemberCard__Name'>{name}</h6>
                        <p className='BodyText3' id='MemberCardID__InstitutionID'>{institutionID}</p>
                    </div>
                </a>
            </div>
        </>
        :
        <>
            <div id='MemberCard'>
                <a id='MemberCard__Container' onClick={member?"":()=>{setOpenModal(!openModal)}} className={member?"":"Buttons"}>
                    <Avatar id="MemberCard__Avatar" src={image}/>
                    <div id='MemberCard__Text'>
                        <h6 id='MemberCard__Name'>{name}</h6>
                        <p className='BodyText3' id='MemberCardID__InstitutionID'>{institutionID}</p>
                    </div>
                </a>
                <div id='MemberCardID__Buttons'>
                    <Button variant='outlined' >Reject</Button>
                    <Button variant='contained' onClick={props.onClick}>Add</Button>    
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
                <img src={IDSample} alt="" />
            </div>
        </Modal>
    </>
}

export default MemberCard