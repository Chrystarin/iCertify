module.exports = (error, req, res, next) => {
	const { _message, code } = error;
	let { name } = error;

	// Validations
	if (name === 'ValidationError') {
		const { errors } = error;

		error = {
			...error,
			message: {
				message: _message,
				errors: Object.values(errors).reduce(
					(output, { name, path, message }) => [
						...output,
						{ name, path, message }
					],
					[]
				)
			},
			status: 422
		};
	}

	// unique
	if (code === 11000)
		error = { ...error, message: 'Duplicate entry', status: 409 };

	// ethers.js
	if (code === 'INVALID_ARGUMENT') {
		const { reason } = error;
		error = {
			...error,
			name: 'ethers: Invalid wallet address',
			message: reason,
			status: 422
		};
	}

	// jsonwebtoken
	if (name === 'TokenExpiredError') {
		error = { ...error, message: 'Token expired' };
	}
	if (name === 'JsonWebTokenError') {
		error = { ...error, message: 'Token malformed' };
	}

	({ name } = error);
	const { status, message } = error;

	res.status(status || 500).json({ name, message });
};
