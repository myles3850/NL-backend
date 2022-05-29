const express = require("express");
const userService = require("../services/user");

var userRoutes = express.Router();

userRoutes.get("/", userService.getUsers);
userRoutes.post("/", userService.createUser);

userRoutes.get("/:id", userService.getUserById);
userRoutes.put("/:id", userService.updateUser);
userRoutes.delete("/:id", userService.deleteUser);

module.exports = userRoutes;
