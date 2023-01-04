import React from 'react'
import './UserPanelInfo.scss'


function UserPanelInfo(props) {
  return (
    <div id='UserPanel'>
        <img src={props.Image}/>
        <div>
          <h6>{props.Title}</h6>
          <p className='BodyText3'>{props.SubTitle}</p>
        </div>
    </div>
  )
}

export default UserPanelInfo