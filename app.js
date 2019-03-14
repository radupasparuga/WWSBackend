const express = require('express');
require('dotenv').config() // dontenv for the .env file
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const fileUpload = require('express-fileupload');

const users = require('./routes/user'); 
const getUser = require('./routes/getUser');

mongoose.connect(process.env.databaseURL, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Cannot connect to the database'+ err)}
);

const app = express();
app.use(express.static(path.join(__dirname, '/build')));
app.use(passport.initialize());
require('./passport')(passport);
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/getUser', getUser);

app.get('/', function(req, res) {
    res.send('hello');
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/build/index.html'));
  });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});