import React, {forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';

import './Certificate.scss';

import certificateBodyTemplate from './../../images/certificate_template_default.png';
import certificateFooterTemplate from './../../images/Certificatefooter.png';
import contractBuild from '../../CertificateNFT.json'
import { ethers } from 'ethers'

const Certificate = forwardRef((props, ref) => {
    const exportRef = useRef();

    const {
        name,
        address,
        eventTitle,
        eventId,
        role,
        location,
        date,
        // provider,
        // signer,
        // contract,
        qr
    } = props

    // // Values for metamask credentials
    // let provider, signer, contract;

    // useImperativeHandle(ref, () => ({
    //     CreateCertificate() {
    //         // exportAsImage(exportRef.current, "Certificate_");
    //         console.log(name + " and " +address );
    //     },
    // }));

    // useEffect(() => {
    //     async function requestAccount() {
    //         return await window.ethereum.request({ method: 'eth_requestAccounts' });
    //     }
    //     requestAccount();
    //     provider = new ethers.providers.Web3Provider(window.ethereum);
    //     signer = provider.getSigner();
    //     contract = new ethers.Contract('0x2834B7434983cBab156Bfea31024184B9e3CA1B4', contractBuild.abi, signer);
    // });

    // // Export canvas into image
    // const exportAsImage = async (element, imageFileName) => {
    //     const canvas = await html2canvas(element);
    //     const image = canvas.toDataURL("image/png", 1.0);

    //     // Extract information from base64 data
    //     var [data, bytes] = image.split(',');
    //     var decodedData = atob(bytes);
    //     var u8arr = new Uint8Array(decodedData.length);

    //     // Convert each byte to its corresponding charCode()
    //     for(var i = 0; i < decodedData.length; i++) {
    //         u8arr[i] = decodedData.charCodeAt(i);
    //     }

    //     console.log("WORKING")
    //     // Create a new File and pass it to sendDocument()
    //     sendDocument(new File([u8arr], 'certificate.png', { type: data.match(/:(.*?);/)[1] }));

    // };

    // // Send Document
    // const sendDocument = async (file) => {
    //     const formData = new FormData();
    //     formData.append('certificate', file);

    //     try {
    //         // Upload the file to ipfs and get CID
    //         const { path } = await fetch('http://localhost:6787/certificates/ipfs', {
    //             method: 'post',
    //             body: formData
    //         }).then(res => res.json());

    //         // Mint and transfer to owner
    //         const transaction = await contract.sendCertificate(
    //             address,                                        // receiver
    //             eventTitle,            // title
    //             eventId,                                     // fromEvent
    //             `https://icertify.infura-ipfs.io/ipfs/${path}`  // uri
    //         )

    //         // Save the certificate
    //         const result = await fetch('http://localhost:6787/certificates/save', {
    //             method: 'post',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 title: eventTitle,
    //                 ipfsCID: path,
    //                 hash: transaction.hash,
    //                 ownerAddress: address,
    //                 eventId: eventId
    //             })
    //         }).then(res => res.json());
    //         console.log(result);

    //     } catch ({ name, message }) {
    //         console.log(name, message);
    //     }
    // }

    return (
        <div className="certificate" id="certificateContent" ref={exportRef}>
            <div className="main_body">
                <img src={certificateBodyTemplate} alt="certificate body"/> 
                <h1 className="user_name" id="user_name">{name}</h1>
                <h2 className="cert_description">For active and invaluable participation during "{eventTitle}" <br/>as a {role} at {location} on {date}</h2>
            </div>
            <div className="footer">
                <img src={certificateFooterTemplate} alt="certificate footer"/>
                <div id="qrcode" className="qrcode">
                    {qr && (
                        <QRCode
                            title="Bicol IT Certificate"
                            value={qr}
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

});

export default Certificate;