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

        contract = new ethers.Contract('0xe6c7CcA0aAa4b4D425DDd3B20784D9FFf4dE1d06', contractBuild.abi, signer);
    })

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
                '0x53Ce82317C57eF4cFa2b2e27361eb2F07C0BA626',   // receiver
                'Dignissim Nulla Sapien Leo Mollis',            // title
                'IJLL2jm3',                                     // fromEvent
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
                    ownerAddress: '0x53Ce82317C57eF4cFa2b2e27361eb2F07C0BA626',
                    eventId: 'IJLL2jm3'
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