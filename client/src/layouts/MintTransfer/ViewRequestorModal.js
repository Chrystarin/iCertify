import React from 'react'
import './ViewRequestorModal.scss'
import Fab from '@mui/material/Fab';
import CloseIcon from '@mui/icons-material/Close';
function ViewRequestorModal({setter}) {
  return (
    <div id='ViewRequestorModal'>
        <div id='ViewRequestorModal__Container__View' className='Panel__Container'>

        </div>
        <div id='ViewRequestorModal__Container__Info' className='Panel__Container'>
            <h4>Info</h4>
        </div>
        <div id='FullView__Buttons'>
            <Fab size='small' color="white" aria-label="full" sx={{zIndex: 97 }} onClick={()=>setter(false)}>
                <CloseIcon />
            </Fab> 
        </div>
    </div>
  )
}

export default ViewRequestorModal