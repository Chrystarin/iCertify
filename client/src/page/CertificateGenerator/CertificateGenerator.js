import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import QRCode from 'react-qr-code';
import { ethers } from 'ethers'

import './certificateStyle.css'

import contractBuild from '../../CertificateNFT.json'
import certificateBodyTemplate from './../../Assets/Images/certificate_template_default.png'
import certificateFooterTemplate from './../../Assets/Images/Certificatefooter.png'

// import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';
// import downloadjs from 'downloadjs';

function CertificateGenerator(){
    const exportRef = useRef();
    const [certificate, setCertificate] = useState(new FormData());

    // Values for metamask credentials
    let provider, signer, contract;

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

    // Excecutes upon page load
    useEffect(() => {
        async function requestAccount() {
            return await window.ethereum.request({ method: 'eth_requestAccounts' });
        }

        requestAccount();
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();

        contract = new ethers.Contract('0x2834B7434983cBab156Bfea31024184B9e3CA1B4', contractBuild.abi, signer);
    });

    // Export canvas into image
    const exportAsImage = async (element, imageFileName) => {
        const canvas = await html2canvas(element);
        const image = canvas.toDataURL("image/png", 1.0);

        // Extract information from base64 data
        var [data, bytes] = image.split(',');
        var decodedData = atob(bytes);
        var u8arr = new Uint8Array(decodedData.length);

        // Convert each byte to its corresponding charCode()
        for(var i = 0; i < decodedData.length; i++) {
            u8arr[i] = decodedData.charCodeAt(i);
        }

        // Create a new File and pass it to sendDocument()
        sendDocument(new File([u8arr], 'certificate.png', { type: data.match(/:(.*?);/)[1] }));
    };
    
    // Download image
    const downloadImage = (blob, fileName) => {
        const fakeLink = window.document.createElement("a");
        fakeLink.style = "display:none;";
        fakeLink.download = fileName;
        
        fakeLink.href = blob;
        
        document.body.appendChild(fakeLink);
        fakeLink.click();
        document.body.removeChild(fakeLink);
        
        fakeLink.remove();
    };

    // Send Document
    const sendDocument = async (file) => {
        const formData = new FormData();
        formData.append('certificate', file);

        try {
            // Get address
            const address = await signer.getAddress()

            // Upload the file to ipfs and get CID
            const { path } = await fetch('http://localhost:6787/certificates/ipfs', {
                method: 'post',
                body: formData
            }).then(res => res.json());

            // Mint and transfer to owner
            const transaction = await contract.sendCertificate(
                address,                                        // receiver
                'Dignissim Nulla Sapien Leo Mollis',            // title
                'n9L4NCLt',                                     // fromEvent
                `https://icertify.infura-ipfs.io/ipfs/${path}`  // uri
            )

            // Save the certificate
            const result = await fetch('http://localhost:6787/certificates/save', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: 'Dignissim Nulla Sapien Leo Mollis',
                    ipfsCID: path,
                    hash: transaction.hash,
                    ownerAddress: address,
                    eventId: 'n9L4NCLt'
                })
            }).then(res => res.json());
            console.log(result);

        } catch ({ name, message }) {
            console.log(name, message);
        }
    }

    function mintAndTransfer() {
        exportAsImage(exportRef.current, "Certificate_");
        // sendDocument(certificate);
        // console.log(signer);
    }

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
                <button id="btn_download" onClick={() => mintAndTransfer()}>Download</button>
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