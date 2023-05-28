const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/companies', require('./src/components/companies/CompaniesRouter')); // Companies routes
app.use('/api/v1/users', require('./src/components/users/UserRouter')); // Users routes


module.exports = app;