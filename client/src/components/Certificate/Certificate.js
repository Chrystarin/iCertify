import React, { useEffect, useRef } from 'react';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';

import './Certificate.scss';

import certificateBodyTemplate from './../../images/certificate_template_default.png';
import certificateFooterTemplate from './../../images/Certificatefooter.png';

function Certificate(props, {SetCertImageValue}) {
    const exportRef = useRef();
	const {
		name,
		address,
		eventTitle,
		eventId,
		role,
		location,
		date,
		certificateId
	} = props;
	const dateObject = new Date(date);

    

    // const exportAsImage = async (element, imageFileName) => {
	// 	const canvas = await html2canvas(element);
	// 	const image = canvas.toDataURL('image/png', 1.0);
    //     return image;
	// };

    useEffect(() => {
        // SetCertImageValue(
        //     exportAsImage(exportRef.current, 'Certificate_')
        // )
    }, []);

	return (
		<div
			className='certificate'
			id='certificateContent'
            ref={exportRef}
		>
			<div className='main_body'>
				<img
					src={certificateBodyTemplate}
					alt='certificate body'
				/>
				<h1
					className='user_name'
					id='user_name'
				>
					{name}
				</h1>
				<h2 className='cert_description'>	
					For active and invaluable participation during "{eventTitle}
					" <br />
					as a {role} at {location} on {dateObject.toLocaleString()}
				</h2>
			</div>
			<div className='footer'>
				<img
					src={certificateFooterTemplate}
					alt='certificate footer'
				/>
				<div
					id='qrcode'
					className='qrcode'
				>
					{certificateId && (
						<QRCode
							title='Bicol IT Certificate'
							value={`http://localhost:3000/certificate/${certificateId}`}
							bgColor={'#FFFFFF'}
							fgColor={'#000000'}
							size={100 === '' ? 0 : 100}
							className='qrcode'
							id='qrcode'
						/>
					)}
					{/* {!qr ? 
                        <QRCode
                        title='Bicol IT Certificate'
                        value={qr}
                        bgColor={'#FFFFFF'}
                        fgColor={'#000000'}
                        size={100 === '' ? 0 : 100}
                        className='qrcode'
                        id='qrcode'
                        />
                
                    } */}
				</div>
			</div>
        </div>
	);
}

export default Certificate;
