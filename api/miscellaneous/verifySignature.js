const {
	utils: { verifyMessage }
} = require('ethers');

const { Unauthorized } = require('./errors');

const message = 'Connect your wallet to iCertify';

/**
 * Verifies if the message signature corresponds to the given wallet address.
 * @param {string} signature - The signature to verify.
 * @param {string} walletAddress - The wallet address to verify against.
 * @throws {Unauthorized} If the signature doesn't correspond to the wallet address.
 */
module.exports = async (signature, walletAddress) => {
	// We call the verifyMessage function with the message and signature parameters and check if it doesn't equal the wallet address
	if (verifyMessage(message, signature) !== walletAddress) {
		// If it doesn't equal, we throw an Unauthorized error with a message
		throw new Unauthorized(
			"Signer address doesn't match the wallet address"
		);
	}
};
