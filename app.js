const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to Database
mongoose.connect(config.database, { useUnifiedTopology: true, useNewUrlParser: true });

// On Connection Success
mongoose.connection.on('connected', () => {
  console.log('Connect to database ' + config.database);
});

// On Connection Error
mongoose.connection.on('error', (err) => {
  console.log('Database error ' + err);
});

// Initialize app using express
const app = express();

// Include users 
const users = require('./routes/users');

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors())

// Set Static Folder: Client Side Files
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//Index Route
app.get('/', (req, res) => {
  res.send('Invalid enpoint');
});

// Starting the server
app.listen(port, () => {
  console.log('Server started on port ' + port);
});
