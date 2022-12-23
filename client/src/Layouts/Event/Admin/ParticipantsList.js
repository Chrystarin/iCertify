import React from 'react'

import './ParticipantsList.scss'
import UserPanelInfo from "../../../Components/UserPanelInfo";
import UserPicture from '../../../Assets/Images/Resources/Developers/Dianne.jpg';

import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

function ParticipantsList() {

    const ParticipantsRole = <>
        <option value="Member">Member</option>
        <option value="Host">Host</option>
        <option value="Co_Host">Co-Host</option>
        <option value="Organizer">Organizer</option>
    </>


    return (
        <div id="ListofSetParticipants">
            <h5 id>Participats:</h5>
            <ul>
                <li>
                    <UserPanelInfo Image={UserPicture}  Name="Dianne Chrystalin Brandez" />
                    <div id='ParticipantsAction'>
                        <select name="" id="">
                            {ParticipantsRole}
                        </select>
                        <IconButton aria-label="delete" color='error' >
                            <ClearIcon />
                        </IconButton>
                    </div>
                </li>
                <li>
                    <UserPanelInfo Image={UserPicture}  Name="Dianne Chrystalin Brandez" />
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

export default ParticipantsList