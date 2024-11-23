const express = require('express');
const { registerUser, loginUser } = require('../controller/authController');
const route = express.Router();

route.post("/reg",registerUser);
route.post("/login",loginUser);

module.exports = route;