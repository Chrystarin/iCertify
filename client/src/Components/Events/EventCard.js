import React from 'react';
import ImagePlaceHolder from './../../Assets/Images/placeholder/image_placeholder.jpg';
import './../../Assets/Styles/Components/style-EventCard.scss';

const EventCard = (props) => {

    const {
        eventId, 
        type,
        title,
        description,
        link,
        location,
        date:start,
        date:end,
        canClaimDocument,
        status,
        isAcceptingVolunteer,
        tags
    } = props;

  return (
    <div className='EventCardContainer'>
        <a href={`/events/${eventId}`}>
            <img className='EventName' src={ImagePlaceHolder} alt=""/>
            <div>
                <h6 className="EventTitle">{`Title:${title}`} and </h6>
                {/* Add class DateDue if the date if near on happening */}
                <p className='Date BodyText3'>Today</p>
                {/* <div className='Container_Participants'>
                    <div className='Wrapper_Participants'>
                        <img src={ImagePlaceHolder} alt=""/>
                        <img src={ImagePlaceHolder} alt=""/>
                        <img src={ImagePlaceHolder} alt=""/>
                    </div>
                    <p>+<span>400</span> Participating</p>
                </div> */}
            </div>
        </a>
    </div>
  )
}

export default EventCard