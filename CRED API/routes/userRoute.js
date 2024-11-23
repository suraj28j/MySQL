const express = require('express');
const { updateUser, getUser, deleteUser } = require('../controller/userController');
const { authentication } = require('../auth/verifyToken');

const route = express.Router();

route.get("/user",authentication,getUser);
route.put("/update",authentication,updateUser);
route.delete("/delete",authentication,deleteUser)

module.exports = route;