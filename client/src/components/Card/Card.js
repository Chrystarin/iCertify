import React from 'react';
import {Link} from "react-router-dom";

import './Card.scss';

import ImagePlaceHolder from './../../images/placeholder/image_placeholder.jpg';

const Card = (props) => {

    const {
        id, 
        image,
        title,
        date,
        role,
        type
    } = props;

    switch (type) {
        case 'event':
            return (
                <div className='EventCardContainer'>
                    <Link to={`/member/event/${id}`}>
                        <img className='EventName' src={image ? image : ImagePlaceHolder} alt=""/>
                        <div>
                            <h6 className="EventTitle">{title}</h6>
                        </div>
                    </Link>
                </div>
            )
        case 'certificate':
            return (
                <div className='EventCardContainer'>
                    <Link to={`/member/certificate/${id}`}>
                        <img className='EventName' src={image ? image : ImagePlaceHolder} alt=""/>
                    </Link>
                </div>
            )
        default:
            return (
                <div className='EventCardContainer'>
                    <Link to={`/empty`}>
                        <img className='EventName' src={image ? image : ImagePlaceHolder} alt=""/>
                    </Link>
                </div>
            )
    }
}

export default Card