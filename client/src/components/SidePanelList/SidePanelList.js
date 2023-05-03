import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import './SidePanelList.scss';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment'

function SidePanelList({data,failedtransaction}) {
    return <>
        <div className='SidePanelList__Container'>
            <ul className='SidePanelList'>
                {data.length>0?<>
                    {data.map((item) => {
                    return <>
                        <Item data={item} note={failedtransaction} key={item.requestId}/>
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
                <Avatar className='SidePanelList__Avatar' src={(!props.data.requestor.photo) ? '' : props.data.requestor.photo }/>
                <p className='BodyText3'>{props.data.requestor.name.firstName + " " + props.data.requestor.name.lastName}</p>
            </div>
            {active?
                <ul className='SidePanelList__MoreItem'>
                    <li className='SidePanelList__MoreItem__items'>
                        <DescriptionIcon/>
                        <p>{props.data.details.offeredDoc.title}</p>
                    </li>
                    <li className='SidePanelList__MoreItem__items'>
                        <AccessTimeFilledIcon/>
                        <p><moment>{moment(props.data.updatedAt).format('LL')}</moment></p>
                    </li>
                    {props.note?<>
                        <li className='SidePanelList__MoreItem__items'>
                            <EditIcon/>
                            
                            <p>{typeof props.data.note}</p>
                        </li>
                    
                    </>:<></>}
                </ul>:""    
            }
        </li>
    </>
} 


export default SidePanelList