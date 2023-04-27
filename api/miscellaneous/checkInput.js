const { InvalidInput } = require('./errors');

const isString = (strVar, property, canbeUndefined = false) => {
	// Check if string is defined
	if (strVar) {
		// Check if input is type of string
		if (typeof strVar !== 'string')
			throw new InvalidInput(`'${property}' is not a string`);

		// Check if string is not empty
		if (!strVar.trim()) throw new InvalidInput(`'${property}' is empty`);

		return;
	}

	// Check if canbeUndefined is true if string is undefined
	if (!canbeUndefined) throw new InvalidInput(`'${property}' is not defined`);
};

const isNumber = (n, property, canbeUndefined = false) => {
	// Check if n is defined
	if (n === undefined && !canbeUndefined)
		// Check if canbeUndefined is true if n is undefined
		throw new InvalidInput(`'${property}' is not defined`);

	// Check if input is type of number
	if (typeof n !== 'number')
		throw new InvalidInput(`'${property}' is not a number`);
};

const isEmail = (email) => {
	isString(email, 'Email');

	if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email))
		throw new InvalidInput('Invalid email format');
};

const isDate = (date, property) => {
	// Check if input can be translated to date
	if (isNaN(new Date(date)))
		throw new InvalidInput(`'${property}' is in invalid date format`);
};

const isBoolean = (val, property) => {
	// Check if input is a boolean
	if (val) {
		if (typeof val !== 'boolean')
			throw new InvalidInput(`'${property}' is not a boolean`);

		return;
	}

	throw new InvalidInput(`'${property}' is not defined`);
};

module.exports = {
	isString,
	isNumber,
	isDate,
	isEmail,
	isBoolean
};
