const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { validateUserObject } = require('./UserValidators');
const UserQueries = require('./UserQueries');
const UserCtrl = require('./UserController');

// Create New User
app.post('/',
    validateUserObject,
    UserQueries.checkUser, // checkm the user is exists or not
    UserQueries.userCreate, // insert user in db
    UserCtrl.createUser // send response to client
);

app.post('/migrateUsers',
    UserQueries.migrateUsers, // get user details by user objectId
    UserCtrl.usersMigrate // send response to client
);

app.get('/:userId',
    UserQueries.getUserbyId, // get user details by user objectId
    UserCtrl.userList // send response to client
);

app.get('/',
    UserQueries.getUsers, // get overall users details
    UserCtrl.usersLists // send response to client
);

app.put('/:userId',
    UserQueries.updateUserData, // update user in db
    UserCtrl.updateUser // send response to client
);

app.patch('/:userId',
    UserQueries.deactiveUser, // delete user in db
    UserCtrl.userDeactive // send response to client
);

app.delete('/:userId',
    UserQueries.deleteUserData, // delete user in db
    UserCtrl.deleteUser // send response to client
);

module.exports = app;