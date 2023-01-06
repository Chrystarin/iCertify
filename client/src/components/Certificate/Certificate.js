import React from 'react';
import QRCode from 'react-qr-code';

import './Certificate.scss';

import certificateBodyTemplate from './../../images/certificate_template_default.png';
import certificateFooterTemplate from './../../images/Certificatefooter.png';

function Certificate(props){
    const {
        name,
        address,
        eventTitle,
        eventId,
        role,
        location,
        date,
        qr
    } = props
    const dateObject = new Date(date)
    
    return (
        <div className="certificate" id="certificateContent">
            <div className="main_body">
                <img src={certificateBodyTemplate} alt="certificate body"/> 
                <h1 className="user_name" id="user_name">{name}</h1>
                <h2 className="cert_description">For active and invaluable participation during "{eventTitle}" <br/>as a {role} at {location} on {dateObject.toLocaleString() }</h2>
            </div>
            <div className="footer">
                <img src={certificateFooterTemplate} alt="certificate footer"/>
                <div id="qrcode" className="qrcode">
                    {qr && (
                        <QRCode
                            title="Bicol IT Certificate"
                            value={address}
                            bgColor={'#FFFFFF'}
                            fgColor={'#000000'}
                            size={100 === '' ? 0 : 100}
                            className="qrcode"
                            id="qrcode"
                        />
                    )}
                </div> 
            </div>
        </div> 
    )
}

export default Certificate;