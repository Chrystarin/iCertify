const typeError = new TypeError();
typeError.status = 422;

const isString = (strVar, property, canbeUndefined = false) => {
	if (strVar) {
		if (typeof str !== 'string') {
			typeError.message = `'${property}' is not a string`;
			throw typeError;
		}

		if (!str) {
			typeError.message = `'${property}' is empty`;
			throw typeError;
		}
	}

	if (!canbeUndefined) {
		typeError.message = `'${property}' is not defined`;
		throw typeError;
	}
};

const isNumber = (n, property, canbeUndefined = false) => {
	if (n) {
		if (typeof n !== 'number') {
			typeError.message = `'${property} is not a number'`;
			throw typeError;
		}
	}

	if (!canbeUndefined) {
		typeError.message = `'${property}' is not defined`;
		throw typeError;
	}
};

const checkDate = (d) => {
	if (isNaN(new Date(d))) {
		typeError.message = 'Invalid date';
		throw typeError;
	}
};

const isDate = (from, to) => {
	from = checkDate(from);

	if (to) {
		to = checkDate(to);

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
