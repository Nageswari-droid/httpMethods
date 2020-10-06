const express = require('express');
const routers = express.Router();

const createController = require('../controller/create');
const readController = require('../controller/read');

routers.use(express.json());

routers.post('/user/adduser', createController.addUser);

routers.get('/user/getusers', readController.readAllUsers);

routers.get('/user/getuser/:id', readController.readUser);

module.exports = routers;