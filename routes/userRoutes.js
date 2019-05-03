const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users');

const AuthHelper = require('../Helpers/AuthHelpers');


router.get('/users', UserController.getAllUsers);


module.exports = router;