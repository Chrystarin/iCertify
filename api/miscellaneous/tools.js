const ethers = require('ethers');
const { abi } = require('../build/contracts/CertificateNFT.json');
const { Unauthorized } = require('./errors');

const roles = {
    ADMIN: 'Admin',
    ACCOUNTANT: 'Accountant',
    ORGANIZER: 'Organizer',
    MEMBER: 'Member'
}

const generateNonce = () => Math.floor(Math.random() * 1e8);

const certificateContract = () => {
    return new ethers.Contract(
        process.env.TEST_CONTRACT_ADDRESS,                              // contract address
        abi,                                                            // abi
        new ethers.providers.JsonRpcProvider(process.env.TEST_PROVIDER) // provider
    );
}

const verifySignature = (signature, walletAddress, nonce) => {
    const message = `Nonce: ${nonce}`;
    const signerAddress = ethers.utils.verifyMessage(message, signature);
    if(signerAddress !== walletAddress)
        throw new Unauthorized('Invalid signer');
}

module.exports = {
    roles,
    generateNonce,
    certificateContract,
    verifySignature
}