import React from 'react';
import ImagePlaceHolder from './../../Assets/Images/placeholder/image_placeholder.jpg';
import './../../Assets/Styles/Components/style-EventCard.scss';

const EventCard = (props) => {

    const {
        eventId, 
        title,
        dateStart,
    } = props;

    return (
        <div className='EventCardContainer'>
            <a href={`/events/${eventId}`}>
                <img className='EventName' src={ImagePlaceHolder} alt=""/>
                <div>
                    <h6 className="EventTitle">{title}</h6>
                    {/* Add class DateDue if the date if near on happening */}
                    <p className='Date BodyText3'>{dateStart}</p>
                </div>
            </a>
        </div>
    )
}

export default EventCard