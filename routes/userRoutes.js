const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users');

const AuthHelper = require('../Helpers/AuthHelpers');


router.get('/users', AuthHelper.VerifyToken, UserController.getAllUsers);
router.get('/user/:id', AuthHelper.VerifyToken, UserController.getUser);
router.get('/user/username/:username', AuthHelper.VerifyToken, UserController.getUserByUserName);



module.exports = router;