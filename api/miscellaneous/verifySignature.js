const {
	utils: { verifyMessage }
} = require('ethers');

const { Unauthorized } = require('./errors');

const message = 'Test message';

module.exports = async (signature, walletAddress) => {
	if (verifyMessage(message, signature) !== walletAddress)
		throw new Unauthorized(
			"Signer address doesn't much the wallet address"
		);
};
