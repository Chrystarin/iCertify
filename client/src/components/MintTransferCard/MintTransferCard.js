import React, {useRef, useEffect} from 'react'
import './MintTransferCard.scss';

import UserPanelInfo from '../../components/UserPanel/UserPanelInfo';
import UserIcon from './../../images/icons/user-round.png';
import { Button } from '@mui/material';

import Certificate from '../../components/Certificate/Certificate';

import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import contractBuild from '../../CertificateNFT.json'
import { ethers } from 'ethers'

function MintTransferCard(props) {
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
    console.log(address)
    console.log(eventId)
    console.log(eventTitle)
    exportAsImage(exportRef.current, "Certificate_");
  }

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

        console.log("WORKING")
        // Create a new File and pass it to sendDocument()
        sendDocument(new File([u8arr], 'certificate.png', { type: data.match(/:(.*?);/)[1] }));

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

  return (
    <div className="MintTransfer__Card Panel__Container">
      <div ref={exportRef}>
        <Certificate
          name={name}
          address={address}
          role={role}
        />
      </div>
      
        <UserPanelInfo Image={img ? img : UserIcon}  Title={name}/> 
        <ul>
          <li>
              <h6 className='Card__Title'>Event Role</h6>
              <h6 className='Card__Content'>{role}</h6>
              
          </li>
          
        </ul>
        
        <div id='MintTransfer__Button'>
        <Button variant='outlined' onClick={()=>CreateCertificate()}>TEST</Button>
          {(status === "Pending")?
          <>
            <Button variant='outlined' onClick={props.handler}>View</Button>
            <Button variant='contained' onClick={()=>CreateCertificate()}>Process</Button>
          </>
          
          : <Button variant='outlined' onClick={props.handler}>View</Button>}
          
        </div>
    </div>
  )
}

export default MintTransferCard