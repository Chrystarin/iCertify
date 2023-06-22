import React from 'react';
import './DocumentRequestCard.scss';

import ResourcesDesign from '../../images/Resources/InstitutionCardDesign.png';
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import DocumentIcon from '../../images/icons/DocumentIcon.png';
import Switch from '@mui/material/Switch';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';

function DocumentRequestCard(props) {

    const [anchorElMenu, setAnchorElMenu] = React.useState(null);
    const openMenu = Boolean(anchorElMenu);
    const handleClickMenu = (event) => {
        setAnchorElMenu(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorElMenu(null);
    };

    return (
        <div id='DocumentRequestCard' className='item'>
            <img id='DocumentRequestCard__imageResource' src={ResourcesDesign} alt="" />
            <img id="DocumentRequestCard__DocumentIcon" src={DocumentIcon} alt="" />
            <h5 id='DocumentRequestCard__Name'>{props.name}</h5>
            <div id='DocumentRequestCard__Contents'>
                <div>
                <h6 className='DocumentRequestCard__Contents__Title'>Description:</h6>
                <p className='BodyText3'>
                    {props.description}
                </p>
                </div>
                <div>
                <h6 className='DocumentRequestCard__Contents__Title'>Requirements:</h6>
                <ul>
                    <li>
                        <p className='BodyText3'>{props.requirements}</p>
                    </li>
                </ul>
                </div>
            </div>
            <div id='DocumentRequestCard__Navigation'>
                {props.owner?<>
                <Button id="DocumentRequestCard__Button" variant="outlined" href={`/documents/${props.id}/edit`}>Edit Document</Button>
                </>: 
                (props.member) 
                    ? <Button id="DocumentRequestCard__Button" variant="outlined" href={props.link}>Request Document</Button>
                    : ''
                }
            </div>
        </div>
    )
}

export default DocumentRequestCard