const {
	utils: { Interface },
	providers: { JsonRpcProvider }
} = require('ethers');

const Transaction = require('../models/Transaction');

const { abi } = require('../build/contracts/DocumentNFT.json');
const { NotFound } = require('./errors');
const { NODE_ENV, TESTNET, TEST_PROVIDER } = process.env;

const provider = new JsonRpcProvider(
	NODE_ENV === 'development' ? TEST_PROVIDER : TESTNET
);
const { parseLog } = new Interface(abi);

// Updates a transaction status
const updateTransaction = (hash, status) =>
	Transaction.findOneAndUpdate({ hash }, { status });

// Monitors a transaction by waiting for it to be mined
const waitTx = async (txHash, callback) => {
	// Check if transaction is valid
	const transaction = await provider.getTransaction(txHash);
	if (!transaction) throw new NotFound('Transaction is not existing');

	// Monitor transaction (async)
	transaction
		.wait()
		.then(callback)
		// Transaction succeeded
		.then(updateTransaction(txHash, 'success'))
		// Transaction failed
		.catch(updateTransaction(txHash, 'failed'));
};

module.exports = { parseLog, waitTx };
