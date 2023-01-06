import React, {useRef, useEffect} from 'react';
import { ethers } from 'ethers';
import html2canvas from 'html2canvas';

import './ViewRequestorModal.scss'

import Fab from '@mui/material/Fab';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import {Button} from '@mui/material';

import Certificate from '../../components/Certificate/Certificate.js';

import contractBuild from '../../CertificateNFT.json'

function ViewRequestorModal(props, {setter}) {
    const {data} = props;
    const exportRef = useRef();

    const {
        name,
        address,
        role,
        eventId,
        eventTitle,
        date,
        location
    } = props;

    // Values for metamask credentials
    let provider, signer, contract;

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

        console.log(image);
        // Create a new File and pass it to sendDocument()
        // sendDocument(new File([u8arr], 'certificate.png', { type: data.match(/:(.*?);/)[1] }));

    };

    // Send Document
    const sendDocument = async (file) => {
        const formData = new FormData();
        formData.append('certificate', file);

        try {
            // Upload the file to ipfs and get CID
            const { path } = await fetch('http://localhost:6787/certificates/ipfs', {
                method: 'post',
                body: formData
            }).then(res => res.json());

            // Mint and transfer to owner
            const transaction = await contract.sendCertificate(
                address,                                        // receiver
                eventTitle,            // title
                eventId,                                     // fromEvent
                `https://icertify.infura-ipfs.io/ipfs/${path}`  // uri
            )

            // Save the certificate
            const result = await fetch('http://localhost:6787/certificates/save', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: eventTitle,
                    ipfsCID: path,
                    hash: transaction.hash,
                    ownerAddress: address,
                    eventId: eventId
                })
            }).then(res => res.json());
            console.log(result);

        } catch ({ name, message }) {
            console.log(name, message);
        }
    }

    function CreateCertificate(){
        exportAsImage(exportRef.current, "Certificate_");
    }

    const handleClose = () => {
        props.setter(false);
    };

    return (<>
        <div id='ModalRequestor' className={(props.status)?"active":"inactive"}>
            <div id='ViewRequestorModal'>
                <div id='ViewRequestorModal__Container__View' className='Panel__Container'>
                    <div ref={exportRef}>
                        <Certificate
                            address={address}
                            eventId={eventId}
                            eventTitle={eventTitle}
                            name={name}
                            date={date}
                            location={location}
                            role={role}
                        />
                    </div>
                </div>
                <div id='ViewRequestorModal__Container__Info' className='Panel__Container'>
                    <h4>Info</h4>
                    <Button variant='contained' onClick={()=>CreateCertificate()}>Process</Button>
                </div>
                <div id='FullView__Buttons'>
                    <Fab size='small' color="white" aria-label="full" sx={{zIndex: 97 }} onClick={handleClose}>
                        <CloseIcon />
                    </Fab> 
                </div>
            </div>
        </div>
        <Backdrop
            sx={{ color: '#fff', zIndex: 98 }}
            open={props.status}
            onClick={handleClose}>
        </Backdrop>
    </>)
}

export default ViewRequestorModal