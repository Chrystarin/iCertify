const { InvalidInput } = require('./errors');

/**
 * Validates if a given variable is a non-empty string or not.
 * @param {string} strVar - The variable to be validated.
 * @param {string} property - The name of the variable being validated.
 * @param {boolean} canbeUndefined - Whether or not the variable can be undefined. Default value is false.
 * @throws {InvalidInput} If the variable is undefined and canbeUndefined is false, or if the variable is not a non-empty string.
 * @returns {undefined} If the variable is undefined and canbeUndefined is true, or if the variable is a non-empty string.
 */
const isString = (strVar, property, canbeUndefined = false) => {
	// Check if the variable is undefined or null
	if (!strVar) {
		// If it cannot be undefined, throw an error
		if (!canbeUndefined) {
			throw new InvalidInput(`'${property}' is not defined`);
		}
		// Otherwise, return nothing
		return;
	}

	// Check if the variable is a non-empty string
	if (typeof strVar !== 'string' || !strVar.trim()) {
		throw new InvalidInput(`'${property}' is not a non-empty string`);
	}
};

/**
 * Checks if input is a number.
 * @param {number} n - The input to check.
 * @param {string} property - The name of the input.
 * @param {boolean} canbeUndefined - Determines if input can be undefined or not.
 * @throws {InvalidInput} Throws an error if input is not a number or undefined (if canbeUndefined is false).
 */
const isNumber = (n, property, canbeUndefined = false) => {
	// Check if n is defined
	if (n === undefined && !canbeUndefined)
		// Check if canbeUndefined is true if n is undefined
		throw new InvalidInput(`'${property}' is not defined`);

	// Check if input is type of number
	if (typeof n !== 'number')
		throw new InvalidInput(`'${property}' is not a number`);
};

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
/**
 * Checks if the given email string is in a valid format.
 * @param {string} email - The email address to check.
 * @throws {InvalidInput} If the email is not in a valid format.
 * @throws {TypeError} If the email parameter is not a string.
 */
const isEmail = (email) => {
	// First, we check if the email is a string. If it's not, we throw an error.
	isString(email, 'Email');

	// We use a regular expression to check if the email is in a valid format.
	// If it's not, we throw an error.
	if (!emailRegex.test(email)) throw new InvalidInput('Invalid email format');
};

/**
 * Checks if the input date can be translated to a valid Date object.
 * @param {string} date - The date to be validated.
 * @param {string} property - The name of the property being validated.
 * @throws {InvalidInput} If the input date is in an invalid format.
 */
const isDate = (date, property) => {
	// Check if input can be translated to date
	if (isNaN(new Date(date)))
		throw new InvalidInput(`'${property}' is in invalid date format`);
};

/**
 * Throws an error if the given value is not a boolean.
 *
 * @param {any} val - The value to check.
 * @param {string} property - The name of the property being checked (for error message).
 * @throws {InvalidInput} If `val` is not a boolean.
 */
const isBoolean = (val, property) => {
	if (typeof val !== 'boolean')
		throw new InvalidInput(`'${property}' is not a boolean`);
};

module.exports = {
	isString,
	isNumber,
	isDate,
	isEmail,
	isBoolean
};
