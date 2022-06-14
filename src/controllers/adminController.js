const express = require("express");
const adminService = require("../services/admin");
const adminRoutes = express.Router();

adminRoutes.post('/createDatabase', adminService.createDatabase);

module.exports = adminRoutes;