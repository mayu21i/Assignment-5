const express = require("express");
const userController = require("./user.controller");

const userRouter = express.Router();

userRouter.post('/users/signup' , userController.createUser);

userRouter.put("/users/:id", userController.createOrUpdateById);

userRouter.get("/users/by-email", userController.getByEmail);

userRouter.get("/user/:id", userController.getById);

module.exports = userRouter;