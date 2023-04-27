import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import './SidePanelList.scss';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
function SidePanelList({data}) {
    return <>
    <div className='SidePanelList__Container'>
        <ul className='SidePanelList'>
            <Item/>
            <Item/>
            <Item/>
        </ul>
    </div>
        
    </>
}
const Item = () =>{
    const [active,setActive] = useState(false)
    return <>
        <li className='SidePanelList__Items' onClick={()=>setActive(!active)}> 
            <div className='SidePanelList__Items__Container'>
                <Avatar className='SidePanelList__Avatar'/>
                <p className='BodyText3'>Dianne Chrystalin Brandez</p>
            </div>
            
            {active?
                <ul className='SidePanelList__MoreItem'>
                    <li className='SidePanelList__MoreItem__items'>
                        <DescriptionIcon/>
                        <p>Transcript of record</p>
                    </li>
                    <li className='SidePanelList__MoreItem__items'>
                        <AccessTimeFilledIcon/>
                        <p>Nov 25, 2023</p>
                    </li>
                </ul>:""    
            }
        </li>
    </>
} 
export default SidePanelList