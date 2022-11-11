import jwt from 'jsonwebtoken';
import { create } from 'ipfs-http-client';
import { Buffer } from 'node:buffer';

const ROLES = {
    ADMIN: 'Admin',
    ACCOUNTANT: 'Accountant',
    ORGANIZER: 'Organizer',
    MEMBER: 'Member',
    VIEWER: 'Viewer'
}

const createToken = ids => jwt.sign(ids, process.env.JWT_SECRET, { expiresIn: '1d' });

const generateNonce = () => Math.floor(Math.random() * 1e8);

const filterBody = (acceptedEntries, requestBody) => {
    return Object
        .entries(requestBody)
        .filter(([key]) => acceptedEntries.has(key))
        .reduce((output, [key, value]) => (output[key] = value, output), {})
}

const ipfsClient = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: 'Basic ' + Buffer.from(process.env.IPFS_ID + ':' + process.env.IPFS_SECRET).toString('base64')
    }
});
// const ipfsClient = create('https://icertify.infura-ipfs.io')

export {
    ROLES,
    createToken,
    generateNonce,
    filterBody,
    ipfsClient
}