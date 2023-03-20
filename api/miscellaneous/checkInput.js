const typeError = new TypeError();
typeError.status = 422;

const isString = (strVar, property, canbeUndefined = false) => {
    // Check if string is defined
	if (strVar) {
        // Check if input is type of string
		if (typeof strVar !== 'string') {
			typeError.message = `'${property}' is not a string`;
			throw typeError;
		}

        // Check if string is not empty
		if (!strVar) {
			typeError.message = `'${property}' is empty`;
			throw typeError;
		}
	}

    // Check if canbeUndefined is true if string is undefined
	if (!canbeUndefined) {
		typeError.message = `'${property}' is not defined`;
		throw typeError;
	}
};

const isNumber = (n, property, canbeUndefined = false) => {
    // Check if n is defined
	if (n) {
        // Check if input is type of number
		if (typeof n !== 'number') {
			typeError.message = `'${property} is not a number'`;
			throw typeError;
		}
	}

    // Check if canbeUndefined is true if n is undefined
	if (!canbeUndefined) {
		typeError.message = `'${property}' is not defined`;
		throw typeError;
	}
};

const checkDate = (d) => {
    // Check if input can be translated to date
	if (isNaN(new Date(d))) {
		typeError.message = 'Invalid date';
		throw typeError;
	}
};

const isDate = (from, to) => {
    // Check if from is a date, and assign to itself
	from = checkDate(from);

    // Check if to is defined
	if (to) {
        // Check if to is a date, and assign to itself
		to = checkDate(to);

        // Check if the date range is valid
		if (from > to) {
			typeError.message = 'Starting date is greater than ending date';
			throw typeError;
		}
	}
};

module.exports = {
	isString,
	isNumber,
	isDate
};
