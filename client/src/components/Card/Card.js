import React from 'react';
import {Link} from "react-router-dom";

import './Card.scss';
import { Avatar } from '@mui/material';
import ImagePlaceHolder from './../../images/placeholder/image_placeholder.jpg';

const Card = (props) => {

    const {
        id, 
        image,
        title,
        date,
        role,
        type,
        link
    } = props;
    return (
        <div className='Card'>
            <Link to={`/m/document/${id}`}>
                <img className='EventName' src={image ? image : ImagePlaceHolder} alt=""/>
                <h6 className="EventTitle">{title}qweqeqweqeqeqe</h6>
                <div id='Card__Institution'>
                    <Avatar id="Card__Avatar"/>
                    <p className='BodyText3'>STI College Marikina</p>
                </div>
            </Link>
        </div>
    )
    // switch (type) {
    //     case 'institution':
    //         return (
    //             <div className='EventCardContainer'>
    //                 <Link to={`/m/institution/${id}`}>
    //                     <img className='EventName' src={image ? image : ImagePlaceHolder} alt=""/>
    //                     <div>
    //                         <h6 className="EventTitle">{title}</h6>
    //                     </div>
    //                 </Link>
    //             </div>
    //         )
    //     case 'event_admin':
    //         return (
    //             <div className='EventCardContainer'>
    //                 <Link to={`/a/events/${id}`}>
    //                     <img className='EventName' src={image ? image : ImagePlaceHolder} alt=""/>
    //                     <div>
    //                         <h6 className="EventTitle">{title}</h6>
    //                     </div>
    //                 </Link>
    //             </div>
    //         )
    //     case 'certificate':
            
    //     case 'event_mint':
    //         return (
    //             <div className='EventCardContainer' onClick={()=>(window.location.reload())}>
    //                 <Link to={`/a/certificates/event/${id}`}>
    //                     <img className='EventName' src={image ? image : ImagePlaceHolder} alt=""/>
    //                     <div>
    //                         <h6 className="EventTitle">{title}</h6>
    //                     </div>
    //                 </Link>
    //             </div>
    //         )
    //     default:
    //         return (
    //             <div className='EventCardContainer'>
    //                 <Link to={`/empty`}>
    //                     <img className='EventName' src={image ? image : ImagePlaceHolder} alt=""/>
    //                 </Link>
    //             </div>
    //         )
    // }
}

export default Card