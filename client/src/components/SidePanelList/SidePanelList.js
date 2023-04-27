import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import './SidePanelList.scss';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import EditIcon from '@mui/icons-material/Edit';
function SidePanelList({data,failedtransaction}) {

    
    return <>
    <div className='SidePanelList__Container'>
        <ul className='SidePanelList'>
            {data.length>0?<>
                {data.map((item) => {
                return <>
                    <Item data={item} note={failedtransaction}/>
                </>
                ;
                })}
            </>:<>
                <p>No record</p>
            </>}
        </ul>
    </div>
        
    </>
}
const Item = (props) =>{
    const [active,setActive] = useState(false)
    return <>
        <li className='SidePanelList__Items' onClick={()=>setActive(!active)}> 
            <div className='SidePanelList__Items__Container'>
                <Avatar className='SidePanelList__Avatar'/>
                <p className='BodyText3'>{props.data.user}</p>
            </div>
            
            {active?
                <ul className='SidePanelList__MoreItem'>
                    <li className='SidePanelList__MoreItem__items'>
                        <DescriptionIcon/>
                        <p>{props.data.name}</p>
                    </li>
                    <li className='SidePanelList__MoreItem__items'>
                        <AccessTimeFilledIcon/>
                        <p>{props.data.timestamp}</p>
                    </li>
                    {props.note?<>
                        <li className='SidePanelList__MoreItem__items'>
                            <EditIcon/>
                            <p>{props.data.note}</p>
                        </li>
                    
                    </>:<></>}
                </ul>:""    
            }
        </li>
    </>
} 


export default SidePanelList