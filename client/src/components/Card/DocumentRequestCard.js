import React from 'react';
import './DocumentRequestCard.scss';
import DocumentIcon from '../../images/icons/DocumentIcon.png';
import ResourcesDesign from '../../images/Resources/InstitutionCardDesign.png';
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
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
            {props.requirements.map((requirement) => (
              <li>
                <p className='BodyText3'>{requirement}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div id='DocumentRequestCard__Navigation'>
      <React.Fragment id="ProfileDropdown">
          <Tooltip title="Menu">
            <IconButton
              onClick={handleClickMenu}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={openMenu ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? 'true' : undefined}
            >
            <MoreVertIcon color="action" sx={{ fontSize: 30 ,cursor:"pointer"}}/>
            </IconButton>
          </Tooltip>
        
          <Menu
            anchorEl={anchorElMenu}
            id="account-menu"
            open={openMenu}
            onClose={handleCloseMenu}
            
            PaperProps={{
              elevation: 0,
              sx: {
                padding:0,
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 9,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  left: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'white',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          >
            <div id='DocumentRequestCard__Navigation__Menu'>
              <Button
                id="demo-customized-button"
                aria-haspopup="true"
                variant=""
                disableElevation
                startIcon={<NoteAddIcon/>}
              >
                Update Document
              </Button>
              <Button
                id="demo-customized-button"
                aria-haspopup="true"
                variant=""
                disableElevation
                startIcon={<ToggleOnIcon color="primary" sx={{ fontSize: 70}} />}
                
              >
                Active
              </Button>
              <Button
                id="demo-customized-button"
                aria-haspopup="true"
                variant=""
                disableElevation
                startIcon={<MoreVertIcon/>}
              >
                Remove Document
              </Button>
            
            </div>
            
              
          </Menu>
        </React.Fragment>
        <Button id="DocumentRequestCard__Button" variant="outlined">Request Document</Button>
      </div>
      {/* {props.name}
      {props.id}
      {props.description}
      {props.requirements}
      {props.requestStatus} */}
    </div>
  )
}

export default DocumentRequestCard