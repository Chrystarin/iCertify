// This function is an error-handling middleware that receives the error, the request, the response, and the next function as parameters.
module.exports = (error, req, res, next) => {
	// Extract the name, message, and status from the error object, or use default values if they are not present.
	let name = error.name;
	let message = error.message || 'Something went wrong';
	let status = error.status || 500;

	console.log(error)

	switch (error.code) {
		// If the error is a MongoDB duplicate key error, customize the name, message, and status accordingly.
		case 11000:
			const { keyValue } = error;
			const [[property, value]] = Object.entries(keyValue);

			name = 'DuplicateError';
			message = `A ${property} of ${value} already exists`;
			status = 409;
			break;

		// If the error is an ethers.js invalid argument error, customize the name, message, and status accordingly.
		case 'INVALID_ARGUMENT':
			const { reason } = error;

			name = `ethers error: ${error.code}`;
			message = reason;
			status = 422;
			break;
	}

	// If the error is a Mongoose validation error, customize the name, message, and status accordingly.
	if (error.name === 'ValidationError') {
		const { errors, _message } = error;

		name = 'ValidationError';
		message = {
			message: _message,
			errors: Object.values(errors).reduce(
				(output, { path, message }) => [...output, { path, message }],
				[]
			)
		};
		status = 422;
	}

	// If the error is a JWT token expired error, customize the message and status accordingly.
	if (error.name === 'TokenExpiredError') {
		message = 'Token expired';
		status = 401;
	}

	// If the error is a JWT malformed token error, customize the message and status accordingly.
	if (error.name === 'JsonWebTokenError') {
		message = 'Token malformed';
		status = 401;
	}

	// Set the response status and send a JSON response with the customized name and message.
	res.status(status).json({ name, message });
};
