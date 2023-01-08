import React, { useRef, useEffect } from 'react';
import { ethers } from 'ethers';
import html2canvas from 'html2canvas';

import './ViewRequestorModal.scss';

import Fab from '@mui/material/Fab';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import { Button } from '@mui/material';

import Certificate from '../../components/Certificate/Certificate.js';

import contractBuild from '../../CertificateNFT.json';

import axios from '../../config/axios';

function ViewRequestorModal(props, { setter }) {
	const { data } = props;
	const exportRef = useRef();

	const {
		name,
		address,
		role,
		eventId,
		eventTitle,
		date,
		location,
		qr,
		certificateId
	} = props;

	// Values for metamask credentials
	let provider, signer, contract;

	// const GenerateCertificateID = async () => {
	// 	const certificateId = await axios
	// 		.post('certificates/save', {
	// 			headers: { 'Content-Type': 'application/json' }
	// 		})
	// 		.then(({ data }) => data.certificateId);
	// 	console.log(certificateId);
	// 	return certificateId;
	// };

	useEffect(() => {
		async function requestAccount() {
			return await window.ethereum.request({
				method: 'eth_requestAccounts'
			});
		}
		requestAccount();
		provider = new ethers.providers.Web3Provider(window.ethereum);
		signer = provider.getSigner();
		contract = new ethers.Contract(
			'0xa6E714d68ED63a84746E91F30c32fC072527c2ED',
			contractBuild.abi,
			signer
		);
	});

	// Export canvas into image
	const exportAsImage = async (element, imageFileName) => {
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

		// console.log(image);
		// Create a new File and pass it to sendDocument()
		sendDocument(
			new File([u8arr], 'certificate.png', {
				type: data.match(/:(.*?);/)[1]
			})
		);
	};

	// Send Document
	const sendDocument = async (file) => {
		const formData = new FormData();
		formData.append('certificate', file);

		try {
			// Upload the file to ipfs and get CID
			const { path } = (await axios.post(`certificates/ipfs`, formData))
				.data;

			// Mint and transfer to owner
			const transaction = await contract.sendCertificate(
				address, // receiver
				eventTitle, // title
				eventId, // fromEvent
				`https://icertify.infura-ipfs.io/ipfs/${path}` // uri
			);

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

	function CreateCertificate() {
		exportAsImage(exportRef.current, 'Certificate_');
	}

	const handleClose = () => {
		props.setter(false);
	};

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
							/>
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
						<Button
							variant='contained'
							onClick={() => console.log(certificateId)}
						>
							Check Certificate
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
