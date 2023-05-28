const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { validateCompanyObject } = require('./CompaniesValidators');
const CompanyQueries = require('./CompaniesQueries');
const CompaniesCtrl = require('./CompaniesController');

// Create Companies
app.post('/',
    validateCompanyObject,
    CompanyQueries.isAlreadyExist, // check companies is exist or not
    CompanyQueries.createCompany, // create new companies in db
    CompaniesCtrl.companyCreated // send response to client
);

// Get Companies by companies ObjectId
app.get('/:companyId',
    CompanyQueries.getCompanybyId, // get companies details by user objectId
    CompaniesCtrl.companyList // send response to client
);

//Get Companies Lists
app.get('/',
    CompanyQueries.getCompanies, // get overall companies details
    CompaniesCtrl.companiesLists // send response to client
);

// Update Companies
app.put('/:companyId',
    CompanyQueries.updateCompany, // update companies in db
    CompaniesCtrl.companyUpdated // send response to client
);

// Remove User from Company
app.patch('/remove-mappeduser/:companyId',
    CompanyQueries.removeUserFromCompany, // remove users in db
    CompaniesCtrl.removeUsers // send response to client
);

// Remove User from Company
app.patch('/user-mapped/:companyId',
    CompanyQueries.usersMapped, // remove users in db
    CompaniesCtrl.mappedUsers // send response to client
);

// Delete  Companies from db
app.delete('/:companyId',
    CompanyQueries.deleteCompanies, // delete companies in db
    CompaniesCtrl.deletedCompanies // send response to client
);

module.exports = app;