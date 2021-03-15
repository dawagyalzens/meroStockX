const express = require('express');
const app = express();

const errorMiddleware = require('./middlewares/error');

app.use(express.json());

// Import all routes...
const products = require('./routes/product');
const users = require('./routes/user');

app.use('/api/v1', products);
app.use('/api/v1', users);

// Middleware to handle errors...
app.use(errorMiddleware);

module.exports = app