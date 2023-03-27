const { Buffer } = require('buffer');
const { randomFillSync } = require('crypto');

const _alphabet =
	'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

/**
 * Converts any given number to a buffer with hex values
 *
 * @param {number} n Number to convert to hex
 * @returns {Buffer}
 */
const toHexBuffer = (n) => {
	let hexN = n.toString(16);
	hexN = (hexN.length % 2 == 0 ? '' : '0') + hexN;

	return Buffer.from(hexN.match(/.{2}/g).map((b) => parseInt('0x' + b)));
};

const toNonceBuffer = (n) =>
	Buffer.from(
		[...toHexBuffer(n)]
			.map((b) => `${b >> 6}${_alphabet[b & 63]}`)
			.join(''),
		'utf-8'
	);

/**
 * Converts the given buffer to a string
 *
 * @param {Buffer} buffer Buffer to convert to string
 * @returns {string}
 */
const bufferToString = (buffer) =>
	[...buffer].map((b) => _alphabet[b & 63]).join('');

/**
 * Generates a buffer with random values
 *
 * @returns {Buffer}
 */
const randomBuffer = () => {
	const pool = Buffer.allocUnsafe(8);
	randomFillSync(pool);

	return pool;
};

/**
 * Generates a unique id from a given nonce
 *
 * @param {number} nonce Given nonce
 * @returns {string}
 */
const generateId = (nonce) =>
	bufferToString(Buffer.concat([randomBuffer(), toNonceBuffer(nonce)]));

let requestNonce = 0;
/**
 * Generates a unique id exclusive for Requests
 *
 * @returns {string}
 */
const genRequestId = () => generateId(++requestNonce);

let docNonce = 0;
/**
 * Generates a unique id exclusive for Requests
 *
 * @returns {string}
 */
const genDocId = () => generateId(++docNonce);

module.exports = { genRequestId, genDocId };
