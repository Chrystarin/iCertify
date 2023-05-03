/**
 * Transform an object of request handlers into an object of middleware functions.
 *
 * @param {Object} handlers - An object of request handler functions.
 * @returns {Object} An object of middleware functions.
 */
module.exports = (handlers) =>
	// The Object.fromEntries() method transforms a list of key-value pairs into an object.
	Object.fromEntries(
		// Object.entries() method returns an array of a given object's own enumerable property [key, value] pairs.
		Object.entries(handlers).map(([key, value]) => [
			// For each [key, value] pair, we create a new array with the key and a new value.
			key,

			// The new value is a function that takes in request, response, and next arguments.
			(req, res, next) =>
				// We wrap the original handler function in a Promise.resolve() call to handle potential errors.
				Promise.resolve(value(req, res, next)).catch(next)
		])
	);
