const express = require("express");
const adminService = require("../services/admin");
const adminRoutes = express.Router();

adminRoutes.post('/admin', adminService.createDatabase);

module.exports = adminRoutes;