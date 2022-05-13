const express = require("express");
const db = require('../users/userQueries');

const authRoutes = express.Router();

authRoutes.post('/login', () => console.log('this is the login service'));

module.exports = authRoutes;