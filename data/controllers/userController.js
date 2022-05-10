const express = require("express");
const db  = require('../users/userQueries');

var userRoutes = express.Router();

userRoutes.get("/", db.getUsers);
userRoutes.post("/", db.createUser);

userRoutes.get("/:id", db.getUserById);
userRoutes.put("/:id", db.updateUser);
userRoutes.delete("/:id", db.deleteUser);

module.exports = userRoutes;