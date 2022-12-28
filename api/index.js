const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
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
app.use(cors());
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
    if(err.name === 'ValidationError') {
        err.status = 409;
        err.message = {
            message: err._message,
            errors: Object
                .values(err.errors)
                .reduce((output, err) => {
                    var { name, path, message } = err;
                    output.push({ name, path, message });
                    return output
                }, [])
        }
    }

    if(err.code === 11000) {
        err.message = 'Duplicate entry';
        err.status = 409;
    }

    res.status(err.status || 500).json({ name: err.name, message: err.message });
});

// Connect to database
mongoose
    .connect(process.env.TEST_MONGO)
    .then(() => {
        // Run server
        app.listen(process.env.PORT, err => {
            if(err) return console.log('Error', err);
            console.log('Connected to database\nListening on port', process.env.PORT);
        });
    })
    .catch(error => console.log(error.message));