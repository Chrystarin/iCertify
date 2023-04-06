const {
	utils: { Interface },
	providers: { JsonRpcProvider },
    Contract
} = require('ethers');

const { abi } = require('../build/contracts/DocumentNFT.json');
const { NotFound } = require('./errors');
const { NODE_ENV, TESTNET, TEST_PROVIDER, CONTRACT_ADDRESS } = process.env;

const provider = new JsonRpcProvider(
	NODE_ENV === 'development' ? TEST_PROVIDER : TESTNET
);
const contract = (new Contract(CONTRACT_ADDRESS, abi, provider));
const { parseLog } = new Interface(abi);

// Monitors a transaction by waiting for it to be mined
const waitTx = async (txHash, callback) => {
	// Check if transaction is valid
	const transaction = await provider.getTransaction(txHash);
	if (!transaction) throw new NotFound('Transaction is not existing');

	// Monitor transaction (async)
	transaction
		.wait()
		// Transaction succeeded
		.then(callback)
		// Transaction failed
		.catch(() => {
            // Update user with the failed transaction
        });
};

module.exports = { parseLog, waitTx, contract };
