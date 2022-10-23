import jwt from 'jsonwebtoken';

const createToken = ids => jwt.sign(ids, process.env.JWT_SECRET, { expiresIn: '1d' });

const generateNonce = () => Math.floor(Math.random() * 1e8);

const filterBody = (properties, requestBody) => {
    return Object.keys(requestBody).reduce((body, key) => {
        if(new Set(properties).has(key) && true)
            body[key] = requestBody[key]
        return body;
    })
}

export {
    createToken,
    generateNonce,
    filterBody
}