const express = require('express');
const authController = require('../controllers/authControllers');

const userRouter = express.Router();

userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);
module.exports = userRouter;