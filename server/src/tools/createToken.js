import jwt from 'jsonwebtoken';

export default (ids) => {
    return jwt.sign(ids, process.env.JWT_SECRET, { expiresIn: '1d' });
}