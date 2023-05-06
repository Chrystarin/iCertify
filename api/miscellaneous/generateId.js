const { Buffer } = require('buffer');
const { randomBytes } = require('crypto');

const _alphabet =
	'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

/**
 * Converts a number to a Buffer object containing its hexadecimal representation. *
 * @param {number} n - The number to convert to hexadecimal.
 * @returns {Buffer} A new Buffer object with the byte values of the hexadecimal representation.
 */
const toHexBuffer = (n) => {
	// Convert the number to a hexadecimal string
	let hexN = n.toString(16);

	// If the length of the hexadecimal string is odd, add a leading zero
	hexN = (hexN.length % 2 == 0 ? '' : '0') + hexN;

	// Split the hexadecimal string into an array of two-character strings
	// and convert each to a number
	const byteValues = hexN.match(/.{2}/g).map((b) => parseInt('0x' + b));

	// Return a new Buffer object with the byte values
	return Buffer.from(byteValues);
};

/**
 * Convert the given number to a buffer representing its nonce in a custom encoding.
 * @param {number} n - The number to convert to a nonce buffer.
 * @returns {Buffer} A buffer containing the nonce in the custom encoding.
 */
const toNonceBuffer = (n) =>
	// First, we convert `n` to a buffer containing its hexadecimal representation.
	Buffer.from(
		[...toHexBuffer(n)]
			// We then map over each byte in the buffer and encode it using our custom alphabet.
			.map((b) => `${b >> 6}${_alphabet[b & 63]}`)
			// Finally, we join the encoded bytes together into a string and create a buffer from it.
			.join(''),
		'utf-8'
	);

/**
 * Converts a buffer of bytes to a string representation.
 * The buffer is first converted to an array of integers, with each byte represented as a number between 0 and 255.
 * Then, each integer is bitwise ANDed with 63 to get a number between 0 and 63.
 * The resulting array of numbers is then converted to a string by mapping each number to a character in a pre-defined alphabet string.
 * The resulting characters are concatenated to form the final string representation of the buffer.
 *
 * @param {Buffer} buffer - The buffer of bytes to convert to a string.
 * @returns {string} The string representation of the buffer.
 */
const bufferToString = (buffer) =>
	[...buffer].map((b) => _alphabet[b & 63]).join('');

/**
 * Generate a unique ID by concatenating three buffers together:
 *     8 random bytes,
 *     a buffer representing the current timestamp, and
 *     a buffer representing the nonce.
 * @param {string} nonce - A unique string used as part of the ID generation process.
 * @returns {string} - The generated ID.
 */
const generateId = (nonce) => {
	// This line concatenates three buffers together: 8 random bytes, a buffer representing the current timestamp, and a buffer representing the nonce.
	const concatenatedBuffers = Buffer.concat([
		randomBytes(8), // This function returns 8 random bytes.
		toHexBuffer(Date.now()), // This function returns a buffer representing the current timestamp in hexadecimal format.
		toNonceBuffer(nonce) // This function returns a buffer representing the nonce in hexadecimal format.
	]);

	// This line converts the concatenated buffers into a string.
	const generatedId = bufferToString(concatenatedBuffers);

	// This line returns the generated ID.
	return generatedId;
};

let requestNonce = 0;
/**
 * Generates a unique id exclusive for Requests
 *
 * @returns {string}
 */
const genRequestId = () => generateId(++requestNonce);

let docNonce = 0;
/**
 * Generates a unique id exclusive for Documents offered
 *
 * @returns {string}
 */
const genDocId = () => generateId(++docNonce);

let accessNonce = 0;
/**
 * Generates a unique id exclusive for Documents offered
 *
 * @returns {string}
 */
const genAccessCode = () => generateId(++accessNonce);

let paymentNonce = 0;
/**
 * Generates a unique id exclusive for Documents offered
 *
 * @returns {string}
 */
const genPaymentId = () => generateId(++paymentNonce);

module.exports = { genRequestId, genDocId, genAccessCode, genPaymentId };
