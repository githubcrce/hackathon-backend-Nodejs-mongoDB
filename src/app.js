const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');

const morgan = require('./config/morgan');
const routes = require('./routes');
// const { errorConverter, errorHandler } = require('./middlewares/error');

const app = express();

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());


// api routes
app.use('/yash', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(Error('Not found'));
});

module.exports = app;
