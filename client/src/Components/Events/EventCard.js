import React from 'react'
import ImagePlaceHolder from './../../Assets/Images/placeholder/image_placeholder.jpg';
import './../../Assets/Styles/Components/style-EventCard.scss'

function EventCard() {
  return (
    <div className='EventCardContainer'>
        <a href="/events/1">
            <img className='EventName' src={ImagePlaceHolder} alt=""/>
            <div>
                <h6 className="EventTitle">Blockchain Technology Intro</h6>
                {/* Add class DateDue if the date if near on happening */}
                <p className='Date BodyText3'>Today</p>
                <div className='Container_Participants'>
                    <div className='Wrapper_Participants'>
                        <img src={ImagePlaceHolder} alt=""/>
                        <img src={ImagePlaceHolder} alt=""/>
                        <img src={ImagePlaceHolder} alt=""/>
                    </div>
                    <p>+<span>400</span> Participating</p>
                </div>
            </div>
        </a>
    </div>
  )
}

export default EventCard