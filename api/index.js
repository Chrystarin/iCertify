const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const https = require('https');
const fs = require('fs');
require('dotenv/config');

const { NotFound } = require('./miscellaneous/errors');
const authUser = require('./middlewares/authUser');

// Route imports
const eventRoute = require('./routes/event');
const memberRoute = require('./routes/member');
const certificateRoute = require('./routes/certificate');
const accountantRoute = require('./routes/accountant');
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
app.use('/members', memberRoute);
app.use('/events', eventRoute);
app.use('/certificates', certificateRoute);
app.use('/accountants', accountantRoute);
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
	.connect(process.env.MONGO_URI)
	.then(() => {
		// Run server
		if (process.env.NODE_ENV === 'DEVELOPMENT') {
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
				});
		} else {
			app.listen(process.env.PORT, (err) => {
				if (err) return console.log('Error', err);
				console.log(
					'Connected to database\nListening on port',
					process.env.PORT
				);
			});
		}
	})
	.catch((error) => console.log(error.message));
