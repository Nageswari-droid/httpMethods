const express = require('express');
const routers = express.Router();

const createController = require('../controller/create');
const readController = require('../controller/read');
const deleteController = require('../controller/delete')

routers.use(express.json());

routers.post('/user/adduser', createController.addUser);

routers.get('/user/getusers', readController.readAllUsers);

routers.get('/user/getuser/:id', readController.readUser);

routers.delete('/user/deleteusers', deleteController.deleteAllUser);

routers.delete('/user/deleteusers/:id', deleteController.deleteOneUser);

module.exports = routers;