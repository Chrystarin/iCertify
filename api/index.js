const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const https = require('https');
const fs = require('fs');
require('dotenv/config');

const { abi } = require('./build/contracts/CertificateNFT.json');

const { NotFound } = require('./miscellaneous/errors');

// Route imports
const userRoute = require('./routes/user');
const institutionRoute = require('./routes/institution');
const requestRoute = require('./routes/request');
const transactionRoute = require('./routes/transaction');

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true
	})
);
app.use(helmet());

// Routes
app.get('/abi', (req, res, next) => res.status(200).json(abi));
app.use('/users', userRoute);
app.use('/institutions', institutionRoute);
app.use('/requests', requestRoute);
app.use('/transactions', transactionRoute);

app.use((req, res, next) => next(new NotFound('Route')));
app.use((err, req, res, next) => {
	console.log(err);
	if (err.name === 'ValidationError') {
		err.status = 409;
		err.message = {
			message: err._message,
			errors: Object.values(err.errors).reduce(
				(output, err) => (
					output.push({
						name: err.name,
						path: err.path,
						message: err.message
					}),
					output
				),
				[]
			)
		};
	}

	if (err.code === 11000) {
		err.message = 'Duplicate entry';
		err.status = 409;
	}

	res.status(err.status || 500).json({
		name: err.name,
		message: err.message
	});
});

// Connect to database
mongoose
	.connect(process.env.TEST_MONGO)
	.then(() =>
		https
			.createServer(
				{
					key: fs.readFileSync('./test/localhost.key'),
					cert: fs.readFileSync('./test/localhost.crt')
				},
				app
			)
			.listen(process.env.PORT, (err) => {
				if (err) return console.log('Error', err);
				console.log(
					'Connected to database\nListening on port',
					process.env.PORT
				);
			})
	)
	.catch((error) => console.log(error.message));
