module.exports = (error, req, res, next) => {
	const { code } = error;
	let { name } = error;

	// Validations
	if (name === 'ValidationError') {
		const { errors, _message } = error;

		error = {
			...error,
			name: 'ValidationError',
			message: {
				message: _message,
				errors: Object.values(errors).reduce(
					(output, { path, message }) => [
						...output,
						{ path, message }
					],
					[]
				)
			},
			status: 422
		};
	}

	// unique
	if (code === 11000) {
		const { keyValue } = error;
		const [[property, value]] = Object.entries(keyValue);

		error = {
			...error,
			name: 'DuplicateError',
			message: `A ${property} of ${value} already exists`,
			status: 409
		};
	}

	// ethers.js
	if (code === 'INVALID_ARGUMENT') {
		const { reason } = error;
		error = {
			...error,
			name: `ethers error: ${code}`,
			message: reason,
			status: 422
		};
	}

	// jsonwebtoken
	if (name === 'TokenExpiredError') {
		error = { ...error, message: 'Token expired', status: 401 };
	}
	if (name === 'JsonWebTokenError') {
		error = { ...error, message: 'Token malformed', status: 401 };
	}

	({ name } = error);
	const { status, message } = error;

	res.status(status || 500).json({ name, message });
};
