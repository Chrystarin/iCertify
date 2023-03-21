import React from 'react';
import './MemberCard.scss'
import { Avatar,Button } from '@mui/material';

function MemberCard(props) {
    const {
        name,
        institutionID,
        image,
        member
    } = props;
    return <>
        <div id='MemberCard'>
            <a href="/">
                <Avatar id="MemberCard__Avatar"/>
                <div id='MemberCard__Text'>
                    <h6 id='MemberCard__Name'>{name}</h6>
                    <p className='BodyText3' id='MemberCardID__InstitutionID'>{institutionID}</p>
                </div>
            </a>
            {member?
            <>
            </>:<>
                <div id='MemberCardID__Buttons'>
                    <Button variant='outlined' >Reject</Button>
                    <Button variant='contained'>Add</Button>    
                </div>
            </>}
            
        </div>

{/* 
        {name}
        {institutionID}
        {image} */}
    </>
}

export default MemberCard