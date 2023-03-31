import React, { useRef, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import html2canvas from 'html2canvas';

import './ViewRequestorModal.scss';

import Fab from '@mui/material/Fab';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import { Button } from '@mui/material';

import Certificate from '../../components/Certificate/Certificate.js';

import axios from '../../config/axios';

function ViewRequestorModal(props, { setter }) {
	const { data } = props;
	const exportRef = useRef();
    const [contract, setContract] = useState(null);
    const [certImage, setCertImage] = useState(null);

	const {
		name,
		address,
		role,
		eventId,
		eventTitle,
		date,
		location,
		qr
	} = props;

	// Values for metamask credentials
	let provider, signer;
	const [certificateId, setCertificateId] = useState(null);

	const GenerateCertificateID = async () => {
		const response = await axios
			.post('certificates/save', {
				headers: { 'Content-Type': 'application/json' }
			})
			.then(({ data }) => setCertificateId(data.certificateId));

        console.log('gen cert id', contract)
	};

	useEffect(() => {
		// async function requestAccount() {
		// 	return await window.ethereum.request({
		// 		method: 'eth_requestAccounts'
		// 	});
		// }
		// requestAccount();
		// provider = new ethers.providers.Web3Provider(window.ethereum);
		// signer = provider.getSigner();
		// setContract(new ethers.Contract(
		// 	'0x5AE7d1d82cEef6eE9745F9C27CE98Ea57c51F5C2',
		// 	contractBuild.abi,
		// 	signer
		// ))

        // console.log('onload', contract)
        // console.log(certImage)

		// GenerateCertificateID();
	}, []);

    // Send Document
	const sendDocument = async (file) => {
		const formData = new FormData();
		formData.append('certificate', file);

		try {
			// Upload the file to ipfs and get CID
			const { path } = (await axios.post(`certificates/ipfs`, formData))
				.data;

            console.log(path)
            console.log(contract)

			// Mint and transfer to owner
			const transaction = await contract.sendCertificate(
				address, // receiver
				eventTitle, // title
				eventId, // fromEvent
				`https://icertify.infura-ipfs.io/ipfs/${path}` // uri
			);

            console.log(transaction)

			// Save the certificate
			const result = await axios
				.post(
					`certificates/save`,
					JSON.stringify({
						certificateId,
						title: eventTitle,
						ipfsCID: path,
						hash: transaction.hash,
						ownerAddress: address,
						eventId: eventId
					}),
					{
						headers: { 'Content-Type': 'application/json' }
					}
				)
				.then((response) => response.data);
			console.log(result);
			window.location.reload();
		} catch ({ name, message }) {
			console.log(name, message);
		}
	};

	// Export canvas into image
	const exportAsImage = async (element, imageFileName) => {
        console.log('export image', contract)
		const canvas = await html2canvas(element);
		const image = canvas.toDataURL('image/png', 1.0);

		// Extract information from base64 data
		var [data, bytes] = image.split(',');
		var decodedData = atob(bytes);
		var u8arr = new Uint8Array(decodedData.length);

		// Convert each byte to its corresponding charCode()
		for (var i = 0; i < decodedData.length; i++) {
			u8arr[i] = decodedData.charCodeAt(i);
		}

        // console.log(sendDocument);

		// console.log(image);
		// Create a new File and pass it to sendDocument()
		sendDocument(
			new File([u8arr], 'certificate.png', {
				type: data.match(/:(.*?);/)[1]
			})
		);
	};

	function CreateCertificate() {
        console.log('create cert', contract)
		exportAsImage(exportRef.current, 'Certificate_');
	}

	const handleClose = () => {
		props.setter(false);
	};
	
	if(!certificateId) return (
		<>
			<div
				id='ModalRequestor'
				className={props.status ? 'active' : 'inactive'}
			>
				<div id='ViewRequestorModal'>
					<div
						id='ViewRequestorModal__Container__View'
						className='Panel__Container'
					>
						Loading....
					</div>
					<div id='FullView__Buttons'>
						<Fab
							size='small'
							color='white'
							aria-label='full'
							sx={{ zIndex: 97 }}
							onClick={handleClose}
						>
							<CloseIcon />
						</Fab>
					</div>
				</div>
			</div>
			<Backdrop
				sx={{ color: '#fff', zIndex: 98 }}
				open={props.status}
				onClick={handleClose}
			></Backdrop>
		</>
	)

	return (
		<>
			<div
				id='ModalRequestor'
				className={props.status ? 'active' : 'inactive'}
			>
				<div id='ViewRequestorModal'>
					<div
						id='ViewRequestorModal__Container__View'
						className='Panel__Container'
					>
						<div ref={exportRef}>
							<Certificate
								address={address}
								eventId={eventId}
								eventTitle={eventTitle}
								name={name}
								date={date}
								location={location}
								role={role}
								certificateId={certificateId}
                                // SetCertImageValue={setCertImage}
							/>
                            {/* Make image data state */}
                            {/* Get image data. Then resize */}
						</div>
					</div>
					<div
						id='ViewRequestorModal__Container__Info'
						className='Panel__Container'
					>
						<h4>Info</h4>
						<Button
							variant='contained'
							onClick={() => CreateCertificate()}
						>
							Generate Certificate
						</Button>
					</div>
					<div id='FullView__Buttons'>
						<Fab
							size='small'
							color='white'
							aria-label='full'
							sx={{ zIndex: 97 }}
							onClick={handleClose}
						>
							<CloseIcon />
						</Fab>
					</div>
				</div>
			</div>
			<Backdrop
				sx={{ color: '#fff', zIndex: 98 }}
				open={props.status}
				onClick={handleClose}
			></Backdrop>
		</>
	);
}

export default ViewRequestorModal;
