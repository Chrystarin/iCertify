import jwt from 'jsonwebtoken';

const createToken = ids => jwt.sign(ids, process.env.JWT_SECRET, { expiresIn: '1d' });

const generateNonce = () => Math.floor(Math.random() * 1e8);

const filterBody = (acceptedEntries, requestBody) => {
    return Object
        .entries(requestBody)
        .filter(([key]) => acceptedEntries.has(key))
        .reduce((output, [key, value]) => (output[key] = value, output), {})
}

export {
    createToken,
    generateNonce,
    filterBody
}