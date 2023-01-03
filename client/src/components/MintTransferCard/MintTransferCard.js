import React from 'react'
import './MintTransferCard.scss';

import DianneImg from '../../images/Resources/Developers/Dianne.jpg'
import UserPanelInfo from '../../components/UserPanel/UserPanelInfo';
import { Button } from '@mui/material';

function MintTransferCard(props) {
  return (
    <div className="MintTransfer__Card Panel__Container">
        <UserPanelInfo Image={DianneImg}  Title="Dianne Chrystalin Brandez"/> 
        <ul>
          <li>
              <h6 className='Card__Title'>Event Role</h6>
              <h6 className='Card__Content'>Member</h6>
          </li>
          
        </ul>
        <div id='MintTransfer__Button'>

          {(props.Status === "Pending")?<Button variant='contained'>Process</Button>: ""}
          
        </div>
    </div>
  )
}

export default MintTransferCard