const ethers = require('ethers');

const ROLES = {
    ADMIN: 'Admin',
    ACCOUNTANT: 'Accountant',
    ORGANIZER: 'Organizer',
    MEMBER: 'Member',
    VIEWER: 'Viewer'
}

const generateNonce = () => Math.floor(Math.random() * 1e8);

const certificateContract = () => {
    return new ethers.Contract(
        process.env.TEST_CONTRACT_ADDRESS,                              // contract address
        require('../build/contracts/CertificateNFT.json').abi,          // abi
        new ethers.providers.JsonRpcProvider(process.env.TEST_PROVIDER) // provider
    );
}

const verifySignature = (signature, walletAddress, nonce) => {
    const message = `Nonce: ${nonce}`;
    const signerAddress = ethers.utils.verifyMessage(message, signature);
    if(signerAddress !== walletAddress)
        throw new UnauthorizedError('Invalid signer');
}

module.exports = {
    ROLES,
    generateNonce,
    certificateContract,
    verifySignature
}