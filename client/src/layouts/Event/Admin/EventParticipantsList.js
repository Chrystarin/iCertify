import React from 'react'

import './EventParticipantsList.scss'
import UserPanelInfo from "../../../components/UserPanel/UserPanelInfo";
import UserPicture from '../../../images/Resources/Developers/Dianne.jpg';

import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

function EventParticipantsList() {

    const ParticipantsRole = <>
        <option value="Member">Participant</option>
        <option value="Host">Host</option>
        <option value="Speaker">Co-Host</option>
        <option value="Organizer">Organizer</option>
    </>

    return (
        <div id="ListofSetParticipants">
            <h5>Participants:</h5>
            <ul>
                <li>
                    <UserPanelInfo Image={UserPicture}  Title="Dianne Chrystalin Brandez" />
                    <div id='ParticipantsAction'>
                        <select name="" id="">
                            {ParticipantsRole}
                        </select>
                        <IconButton aria-label="delete" color='error' >
                            <ClearIcon />
                        </IconButton>
                    </div>
                </li>
            </ul>
        </div>
        )
}

export default EventParticipantsList