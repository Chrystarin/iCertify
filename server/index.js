import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';

import { NotFoundError } from './src/errors.js';
import authUser from './src/middlewares/authUser.js';

// Route imports
import eventRoute from './src/routes/event.js';
import memberRoute from './src/routes/member.js';
import documentRoute from './src/routes/document.js';
import accountantRoute from './src/routes/accountant.js';
import requestRoute from './src/routes/request.js';
import transactionRoute from './src/routes/transaction.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

// Route-specific authentication
app.use('/api/members', memberRoute);

// Authentication
app.use(authUser);

// Routes
app.use('/api/events', eventRoute);
app.use('/api/documents', documentRoute);
app.use('/api/accountants', accountantRoute);
app.use('/api/requests', requestRoute);
app.use('/api/transactions', transactionRoute);

app.use((req, res, next) => next(new NotFoundError('Route')));
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

    console.log(err);
    if(err.code || 11000) {
        err.message = 'Duplicate entry';
        err.status = 409;
    }

    res.status(err.status || 500).json({ error: err.message });
});

function checkUser(req, res, next) {
    console.log(req.user);
}

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

