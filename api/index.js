const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { createServer } = require('https');
const { readFileSync } = require('fs');
require('dotenv/config');

const { abi } = require('./build/contracts/DocumentNFT.json');
const { NODE_ENV, TEST_MONGO, PORT, MONGO_URI, DROPBOX_ACCESS_TOKEN } = process.env;

const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const Dropbox = require('dropbox').Dropbox;
const dropbox = new Dropbox({ accessToken: DROPBOX_ACCESS_TOKEN });

const { NotFound } = require('./miscellaneous/errors');
const authenticate = require('./middlewares/authenticate');
const errorHandler = require('./middlewares/errorHandler');

// Route imports
const userRoute = require('./routes/user');
const institutionRoute = require('./routes/institution');
const requestRoute = require('./routes/request');
const transactionRoute = require('./routes/transaction');
const authRoute = require('./routes/auth');
const documentRoute = require('./routes/document');

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
        methods: ['POST', 'PUT', 'GET', 'PATCH', 'OPTIONS', 'HEAD'],
		origin: ['http://localhost:3000','https://www.dropbox.com'],
        // origin: 'http://127.0.0.1:8080',
		credentials: true
        
	})
);
app.use(helmet());

app.post('/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    const fileName = file.originalname;
    const fileStream = fs.createReadStream(file.path);

    try {
        const response = await dropbox.filesUpload({
            path: `/uploads/${fileName}`,
            contents: fileStream,
        });

        // Get the shared link for the uploaded file
        const sharedResponse = await dropbox.sharingCreateSharedLink({
        path: response.result.path_display
        });

        const url = sharedResponse.result.url.replace('www.dropbox.com', 'dl.dropboxusercontent.com');

        res.json({
            url: url,
            });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
});

// Routes
app.get('/abi', (req, res, next) => res.json(abi));
app.use('/auth', authRoute);
app.use('/documents', documentRoute);
app.use('/institutions', institutionRoute);
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
	.connect(NODE_ENV === 'development' ? TEST_MONGO : MONGO_URI)
	.then(() => {
		// if (NODE_ENV === 'development')
		// 	return createServer(
		// 		{
		// 			key: readFileSync('./test/localhost.key'),
		// 			cert: readFileSync('./test/localhost.crt')
		// 		},
		// 		app
		// 	);

		// return app;

        app.listen(process.env.PORT, (err) => {
			if (err) return console.log('Error', err);
			console.log('Listening on port', process.env.PORT);
		});
	})
	// .then((server) =>
	// 	server.listen(PORT, () =>
	// 		console.log('Connected to database\nListening on port', PORT)
	// 	)
	// )
	.catch((error) => console.log(error.message));
