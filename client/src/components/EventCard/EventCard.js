import React from 'react';
import ImagePlaceHolder from './../../images/placeholder/image_placeholder.jpg';
import './EventCard.scss';
import {Link} from "react-router-dom";

const EventCard = (props) => {

    const {
        eventId, 
        title,
        dateStart,
        cardType
    } = props;

    return (

        (cardType === "Admin")? <>
            <div className='EventCardContainer'>
                <Link to={`${eventId}`}>
                    <img className='EventName' src={ImagePlaceHolder} alt=""/>
                    <div>
                        <h6 className="EventTitle">{title}</h6>
                        {/* Add class DateDue if the date if near on happening */}
                        <p className='Date BodyText3'>{dateStart}</p>
                    </div>
                    <div id='EvenCardAdminInfo'>
                        <div className='AdminInfo__Container'>
                            <h5>25</h5>
                            <p className='BodyText3'>Pending</p>
                        </div>
                        <div className='AdminInfo__Container'>
                            <h5>15</h5>
                            <p className='BodyText3'>Complete</p>
                        </div>
                    </div>
                </Link>
            </div>
        </>
        :
        <>
            <div className='EventCardContainer'>
                <Link to={`${eventId}`}>
                    <img className='EventName' src={ImagePlaceHolder} alt=""/>
                    <div>
                        <h6 className="EventTitle">{title}</h6>
                        {/* Add class DateDue if the date if near on happening */}
                        <p className='Date BodyText3'>{dateStart}</p>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default EventCard