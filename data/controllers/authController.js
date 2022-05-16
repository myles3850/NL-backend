const express = require("express");
const auth = require("../services/auth");

const authRoutes = express.Router();

authRoutes.post('/login', auth.login);

module.exports = authRoutes;