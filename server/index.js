import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { NotFoundError } from './src/errors.js';

// Route imports
import eventRoute from './src/routes/event.js';
import memberRoute from './src/routes/member.js';
import documentRoute from './src/routes/document.js';
import accountantRoute from './src/routes/accountant.js';
import requestRoute from './src/routes/request.js';
import transactionRoute from './src/routes/transaction.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/events', eventRoute);
app.use('/api/members', memberRoute);
app.use('/api/documents', documentRoute);
app.use('/api/accountants', accountantRoute);
app.use('/api/requests', requestRoute);
app.use('/api/transactions', transactionRoute);

app.use((req, res, next) => next(new NotFoundError()));
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
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

