import React from 'react';
import ImagePlaceHolder from './../../images/placeholder/image_placeholder.jpg';
import './EventCard.scss';
import {Link} from "react-router-dom";

const EventCard = (props) => {

    const {
        eventId, 
        title,
        dateStart,
        role,
        image
    } = props;

    return (
        <div className='EventCardContainer'>
            <Link to={`/member/event/${eventId}`}>
                <img className='EventName' src={image ? image : ImagePlaceHolder} alt=""/>
                <div>
                    <h6 className="EventTitle">{title}</h6>
                    {/* Add class DateDue if the date if near on happening */}
                    <p className='Date BodyText3'>{dateStart}</p>
                    <p className='Date BodyText3'>{role}</p>
                </div>
            </Link>
        </div>
    )
}

export default EventCard