const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { createServer } = require('https');
const { readFileSync } = require('fs');
require('dotenv/config');

const { abi } = require('./build/contracts/DocumentNFT.json');
const { NODE_ENV, TEST_MONGO, PORT, MONGO_URI } = process.env;

const { NotFound } = require('./miscellaneous/errors');
const authenticate = require('./middlewares/authenticate');

// Route imports
const userRoute = require('./routes/user');
const institutionRoute = require('./routes/institution');
const requestRoute = require('./routes/request');
const transactionRoute = require('./routes/transaction');
const errorHandler = require('./middlewares/errorHandler');

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
app.use(authenticate);
app.use('/requests', requestRoute);
app.use('/transactions', transactionRoute);

app.use((req, res, next) => next(new NotFound('Route')));
app.use(errorHandler);

// Connect to database
mongoose
	.connect(NODE_ENV === 'development' ? TEST_MONGO : MONGO_URI)
	.then(() => {
		if (NODE_ENV === 'development')
			return createServer(
				{
					key: readFileSync('./test/localhost.key'),
					cert: readFileSync('./test/localhost.crt')
				},
				app
			);

		return app;
	})
	.then((server) => server.listen(PORT))
	.then((error) => {
		if (error) throw error;
		console.log('Connected to database\nListening on port', PORT);
	})
	.catch((error) => console.log(error.message));
