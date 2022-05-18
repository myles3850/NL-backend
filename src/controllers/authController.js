const express = require("express");
const authService= require("../services/auth");

const authRoutes = express.Router();

authRoutes.post('/login', authService.login);

module.exports = authRoutes;
