const jwt = require('jsonwebtoken');
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

const duration = {
	// access: 5 * 60 * 1000,           // 5 minutes
    access: 7 * 24 * 60 * 60 * 1000,           // 7 days
	refresh: 7 * 24 * 60 * 60 * 1000 // 7 days
};

const cookieOptions = {
    domain: process.env.CORS_ORIGIN,
    path: '/',
	httpOnly: true, 
	sameSite: 'lax',
	secure: true
};      

// JWT signer
const sign = (payload, secret, expiresIn) =>
	jwt.sign({ ...payload, createdAt: new Date() }, secret, { expiresIn });

// Sign an access-token
const signAccess = (payload) =>
	sign(payload, JWT_ACCESS_SECRET, duration.access);

// Sign a refresh-token
const signRefresh = (payload) =>
	sign(payload, JWT_REFRESH_SECRET, duration.refresh);

module.exports = {
	duration,
	cookieOptions,
	signAccess,
	signRefresh
};
