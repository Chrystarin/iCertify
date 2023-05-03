import React from 'react';
import {Link} from "react-router-dom";


import moment from 'moment'
import './Card.scss';
import { Avatar } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ImagePlaceHolder from './../../images/placeholder/image_placeholder.jpg';
const Card = (props) => {

    const {
        image,
        title,
        date,
        accessCode
    } = props;
    return (
        <Link to={`/documents/${accessCode}`}>
            <div className='Card'>
                <div className='Card__Image___Container'>
                    <img src={image ? image : ImagePlaceHolder} alt=""/>
                </div>
                <h6 className="BodyText2 Card__Title">{title}</h6>
                <div className=' Card__Date'>
                    <CalendarMonthIcon/>
                    <p className='BodyText3'><moment>{moment(date).format('LL')}</moment></p>
                </div>
                {/* <div className='Card__InstitutionInfo'>
                    <Avatar className='Card__InstitutionInfo__Avatar'></Avatar>
                    <p className='BodyText3'>STI College Marikina</p>
                </div> */}
            </div>
        </Link>

    )
}

export default Card