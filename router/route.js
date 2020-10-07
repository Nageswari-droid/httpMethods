const express = require('express');
const routers = express.Router();

const createController = require('../controller/create');
const readController = require('../controller/read');
const deleteController = require('../controller/delete');
const updateController = require('../controller/update');

routers.use(express.json());

routers.post('/user/adduser', createController.addUser);

routers.post('/user/updateOne/:id', updateController.updateUser);

routers.get('/user/getusers', readController.readAllUsers);

routers.get('/user/getuser/:id', readController.readUser);

routers.get('/user/getuuid/:uuid_id', readController.readUserUUID);

routers.get('/user/getrandom', readController.getRandom);

routers.delete('/user/deleteusers', deleteController.deleteAllUser);

routers.delete('/user/deleteusers/:id', deleteController.deleteOneUser);

module.exports = routers;