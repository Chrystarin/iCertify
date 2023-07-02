const {
	providers: { JsonRpcProvider },
	Contract
} = require('ethers');

const { abi } = require('../build/contracts/DocumentNFT.json');
const { NotFound } = require('./errors');
const { TESTNET, CONTRACT_ADDRESS } = process.env;

const provider = new JsonRpcProvider(TESTNET);
const contract = new Contract(CONTRACT_ADDRESS, abi, provider);

/**
 * Wait for a transaction to complete and call the corresponding success or
 * failed function based on the outcome.
 *
 * @param {string} txHash - The hash of the transaction to monitor.
 * @param {function} success - The function to call if the transaction succeeds.
 * @param {function} failed - The function to call if the transaction fails.
 * @throws {NotFound} If the transaction is not found in the provider.
 */
const waitTx = async (txHash, success, failed) => {

    // Check if the transaction is valid by getting its details from the provider
    const transaction = await provider.getTransaction(txHash);
    if (!transaction) throw new NotFound('Transaction is not existing');

    console.log(transaction)

    // If the transaction is valid, start monitoring it (asynchronously)
    transaction
        .wait()
        // If the transaction succeeds, call the success function
        .then(success)
        // If the transaction fails, call the failed function
        .catch(failed);
};


module.exports = { waitTx, contract };
