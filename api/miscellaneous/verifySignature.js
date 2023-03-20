const {
	utils: { verifyMessage }
} = require('ethers');
const { CustomError } = require('./errors');

module.exports = async (signature, walletAddress, Model) => {
	const { nonce } = await Model.findOne({ walletAddress });
	if (verifyMessage(`Nonce: ${nonce}`, signature) !== walletAddress)
		throw new CustomError(
			'Invalid Signature',
			"Signer address doesn't much the wallet address",
			401
		);
};
