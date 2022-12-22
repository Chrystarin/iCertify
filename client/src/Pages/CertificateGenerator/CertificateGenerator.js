import React, { useRef, useState } from 'react';
// import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
// import downloadjs from 'downloadjs';
// import html2canvas from 'html2canvas';

import './../../Assets/Styles/certificateStyle.css'

import certificateBodyTemplate from './../../Assets/Images/certificate_template_default.png'
import certificateFooterTemplate from './../../Assets/Images/footer.png'
import QRCode from 'react-qr-code';
import exportAsImage from './exportAsImage';

function CertificateGenerator(){
    const exportRef = useRef();

    // Values for Certificate Info
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [event, setEvent] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');

    // Values for QR Code
    const [value, setQRValue] = useState('');
    const [back, setQRBack] = useState('#FFFFFF');
    const [fore, setQRFore] = useState('#000000');
    const [size, setQRSize] = useState(60);

    return(
        <div className="CertificateGenerator">
            <h1>Certificate Info</h1>
            <ul>    
                <li>Name: <input type="text" id="user_name_input" onChange={e => setName(e.target.value)}/></li>
                <li>Event: <input type="text" id="event_title_input" onChange={e => setEvent(e.target.value)}/></li>
                <li>Role: <input type="text" id="user_role_input" onChange={e => setRole(e.target.value)}/></li>
                <li>Location: <input type="text" id="qrcode_input" onChange={e => setLocation(e.target.value)}/></li>
                <li>Date:  <input type="date" id="event_date_input" onChange={e => setDate(e.target.value)}/></li>
                <li>QR Content: <input type="text" id="qrcode_input" onChange={e => setQRValue(e.target.value)}/></li>
                <button id="btn_download" onClick={() => exportAsImage(exportRef.current, "Certificate")}>Download</button>
            </ul>

            <div className="certificate" id="certificateContent" ref={exportRef}>
                <div className="main_body">
                    <img src={certificateBodyTemplate} alt="certificate body"/> 
                    <h1 className="user_name" id="user_name">{name}</h1>
                    <h2 className="cert_description">For active and invaluable participation during "{event}" <br/>as a {role} at {location} on {date}</h2>
                </div>
                <div className="footer">
                    <img src={certificateFooterTemplate} alt="certificate footer"/>
                    <div id="qrcode" className="qrcode">
                        {value && (
                            <QRCode
                                title="Bicol IT Certificate"
                                value={value}
                                bgColor={back}
                                fgColor={fore}
                                size={size === '' ? 0 : size}
                                className="qrcode"
                                id="qrcode"
                            />
                        )}
                    </div> 
                </div>
            </div> 
        </div>
    );
}

export default CertificateGenerator;