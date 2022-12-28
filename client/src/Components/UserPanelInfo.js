import React from 'react'
import './UserPanelInfo.scss'


function UserPanelInfo(props) {
  return (
    <div id='UserPanel'>
        <img src={props.Image}/>
        <h6>{props.Title}</h6>
    </div>
  )
}

export default UserPanelInfo