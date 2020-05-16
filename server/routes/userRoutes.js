const express = require('express');
const authController = require('../controllers/authControllers');
const userController = require('../controllers/userControllers');

const userRouter = express.Router();

userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);
userRouter.post('/forgotPassword', authController.forgotPassword);
userRouter.patch('/resetPassword/:token', authController.resetPassword);
userRouter.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePassword
);
userRouter.get('/getMe', authController.protect, userController.getMe);
userRouter.patch('/updateMe', authController.protect, userController.updateMe);
userRouter.patch(
  '/deactivateMe',
  authController.protect,
  userController.deactivateMe
);
module.exports = userRouter;
