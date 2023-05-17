const { createServer } = require('https');
const { readFileSync } = require('fs');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
require('dotenv/config');

const { abi } = require('./build/contracts/DocumentNFT.json');
const { PORT, MONGO_URI } = process.env;

const { NotFound } = require('./miscellaneous/errors');
const authenticate = require('./middlewares/authenticate');
const errorHandler = require('./middlewares/errorHandler');

// Route imports
const authRoute = require('./routes/auth');
const documentRoute = require('./routes/document');
const institutionRoute = require('./routes/institution');
const requestRoute = require('./routes/request');
const transactionRoute = require('./routes/transaction');
const searchRoute = require('./routes/search');
const userRoute = require('./routes/user');

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		methods: ['POST', 'PUT', 'GET', 'PATCH', 'OPTIONS', 'HEAD', 'DELETE'],
		origin: ['http://localhost:3000'],
		// origin: 'http://127.0.0.1:8080',
		credentials: true
	})
);
app.use(helmet());

// Routes
app.get('/abi', (req, res, next) => res.json(abi));
app.use('/auth', authRoute);
app.use('/documents', documentRoute);
app.use('/institutions', institutionRoute);
app.use('/search', searchRoute)
app.use('/users', userRoute);
app.use(authenticate);
app.use('/requests', requestRoute);
app.use('/transactions', transactionRoute);

// app.use((req, res, next) => next(new NotFound('Route not found')));

app.use((err, req, res, next) => {
	console.log(err);

	res.status(err.status || 500).json({
		name: err.name,
		message: err.message
	});
});

app.use(errorHandler);

// Connect to database
mongoose
	.connect(MONGO_URI)
	.then(() => {
		app.listen(PORT, (err) => {
			if (err) return console.log('Error', err);
			console.log('Listening on port', PORT);
		});
	})
	.catch((error) => console.log(error.message));
