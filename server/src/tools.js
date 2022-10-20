import jwt from 'jsonwebtoken';

const createToken = ids => jwt.sign(ids, process.env.JWT_SECRET, { expiresIn: '1d' });
const generateNonce = () => Math.floor(Math.random() * 100000000);

export {
    createToken,
    generateNonce
}