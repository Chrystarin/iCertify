const jwt = require('jsonwebtoken');

module.exports = async (payload) =>
	jwt.sign({ ...payload, createdAt: new Date() }, process.env.JWT_SECRET, {
		expiresIn: '30d'
	});
