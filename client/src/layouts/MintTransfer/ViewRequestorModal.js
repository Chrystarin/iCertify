import React, {useRef, useEffect} from 'react'
import './ViewRequestorModal.scss'
import Fab from '@mui/material/Fab';
import CloseIcon from '@mui/icons-material/Close';
import Certificate from '../../components/Certificate/Certificate.js';
import { Button } from '@mui/material';

import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import contractBuild from '../../CertificateNFT.json'
import { ethers } from 'ethers'


import Backdrop from '@mui/material/Backdrop';


function ViewRequestorModal(props, {setter}) {
  const {data} = props;

  const exportRef = useRef();

  const {
    name,
    address,
    role,
    img,
    status,
    certificate,
    eventId,
    eventTitle
  } = props;

  function CreateCertificate(){
    exportAsImage(exportRef.current, "Certificate_");
  }

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

    console.log(image)
    // Create a new File and pass it to sendDocument()
    // sendDocument(new File([u8arr], 'certificate.png', { type: data.match(/:(.*?);/)[1] }));

  };

  const handleClose = () => {
    props.setter(false);
  };

  return (
    <>
      <div id='ModalRequestor' className={(props.status)?"active":"inactive"}>
        <div id='ViewRequestorModal'>
          <div id='ViewRequestorModal__Container__View' className='Panel__Container'>
            <Certificate
              id=""
              address={address}
              eventId={eventId}
              eventTitle={eventTitle}
              name={name}
            />
          </div>
          <div id='ViewRequestorModal__Container__Info' className='Panel__Container'>
              <h4>Info</h4>
              <Button variant='contained' onClick={()=>console.log()}>Process</Button>
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
    </>
  )
}

export default ViewRequestorModal