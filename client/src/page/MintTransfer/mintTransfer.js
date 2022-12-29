import React, { useEffect } from 'react'
import { ethers } from 'ethers'
import contractBuild from '../../CertificateNFT.json'

function MintTransfer() {
    let provider, signer, contract;

    useEffect(() => {
        async function requestAccount() {
            return await window.ethereum.request({ method: 'eth_requestAccounts' });
        }

        requestAccount();
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();

        contract = new ethers.Contract('0x2834B7434983cBab156Bfea31024184B9e3CA1B4', contractBuild.abi, signer);
        console.log(contract)
    });

    const sendDocument = async (file) => {
        const formData = new FormData();
        formData.append('certificate', file);

        console.log(formData.get('certificate'));

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

    return (
        <div>
            <input type='file' onChange={ (e) => sendDocument(e.target.files[0]) }></input>
        </div>
    )
}

export default MintTransfer