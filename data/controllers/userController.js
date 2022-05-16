const express = require("express");
const userQueries = require('../users/userQueries');

var userRoutes = express.Router();

userRoutes.get("/", userQueries.getUsers);
userRoutes.post("/", userQueries.createUser);

userRoutes.get("/:id", userQueries.getUserById);
userRoutes.put("/:id", userQueries.updateUser);
userRoutes.delete("/:id", userQueries.deleteUser);

module.exports = userRoutes;
