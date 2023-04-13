import React,{useState} from 'react'
import './InstitutionCard.scss';
import { Avatar } from '@mui/material';
import EventResourcesDesign from '../../images/Resources/InstitutionCardDesign.png'
import TaskIcon from '@mui/icons-material/Task';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Button } from '@mui/material';

function EventCard(props) {


  return (
    <div id='EventCard'>  
        <a id='EventCard__Container' href={`/institutions/${props.walletAddress}`}>
            <img id='EventResourcesDesign' src={EventResourcesDesign} alt="" />
            <div id='Avatar__Container'>
                <Avatar id="Avatar"/>
            </div>
            <h6>{props.name}</h6>
            <p id='EventCard__Address' className='BodyText3'>{props.address}</p>
        </a>
        <div id='EventCard__Footer'>
            <div>
                <PeopleAltIcon/>
                <p className='BodyText3'>{props.totalMembers}</p>
            </div>
            {props.actions ? 
                (props.joinStatus ?
                    <Button variant='contained'>Request</Button>
                    :
                    <Button variant='contained'>Join</Button>
                )
            : ''}
           
            <div>
                <TaskIcon/>
                <p className='BodyText3'>{props.totalDocuments}</p>
            </div>
        </div>
    </div>
  )
}

export default EventCard