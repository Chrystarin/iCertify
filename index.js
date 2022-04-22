const express = require('express');
const ethers = require('ethers');

const app = express();
const port = process.env.port || 6787;

// Template
app.set('views', './src/views');
app.set('view engine', 'ejs');

// Routes
app.use('/api', require('./src/routes/api'));
app.use('/', (req, res) => {

});

app.listen(port, err => {
    if(err) return console.log('Error', err);
    console.log(`Listening on port ${ port }`);
});