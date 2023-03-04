import React from 'react'
import './ShareDocumentModal.scss'
import Fab from '@mui/material/Fab';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';


import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


function ShareDocumentModal(props) {

    const link = window.location.href;
    const handleClickCopyLink = (event) => {
        alert("Link copied : "+ link)
    };

    const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
            backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
            opacity: 1,
            border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.5,
        },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
        color:
            theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
        duration: 500,
        }),
    },
    }));

    return (
        <div id='ShareModal'>
        <div id='ShareModal__Container' className='Panel__Container'>
            <h4 className='Panel__Title'>Share Credential </h4>
            <FormControl sx={{width: '100%'}} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-Link" >Link</InputLabel>
            <OutlinedInput
                id="outlined-adornment-Link"
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {navigator.clipboard.writeText(link)}}
                    edge="end"
                    >
                        <ContentCopyIcon/>
                    </IconButton>
                </InputAdornment>
                }
                label="Link"
                value={link}
            />
            </FormControl>
            <div id='LinkShare__Type'>
                
            </div>
            <div id='MakePublic__Container'>
                <div id='MakePublic__Title'>
                    <h6>Make it Public</h6>
                    <p className='BodyText3'>This certificate can be seen to your User Profile</p>
                </div>
                <FormControlLabel control={<IOSSwitch   />}/>
            </div>
        </div>
        <div id='ShareModal__Buttons'>
            <Fab size='small' color="white" aria-label="full" sx={{zIndex: 97 }} onClick={props.ChangeHandler}>
                <FullscreenExitIcon />
            </Fab> 
        </div>
        </div>
    )
}

export default ShareDocumentModal