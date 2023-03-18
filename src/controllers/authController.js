const express = require("express");
const authService= require("../services/auth");
const { authenticateAPIRequest } = require("../services/token");
const { apiAuthVerification } = require("../security/apiVerification");

const authRoutes = express.Router();
// as the token endpoint needs to be avalable without verification
//this has been locked in the controller as opposed before the controller

authRoutes.post('/token', authenticateAPIRequest);

authRoutes.post('/login',apiAuthVerification, authService.login);

module.exports = authRoutes;
