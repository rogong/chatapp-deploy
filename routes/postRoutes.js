const express = require('express');
const router = express.Router();

const PostController = require('../controllers/posts');

const AuthHelper = require('../Helpers/AuthHelpers');

router.get('/posts', AuthHelper.VerifyToken, PostController.getAllPosts);

router.post('/post/add-post', AuthHelper.VerifyToken, PostController.addUser);
router.post('/post/add-like', AuthHelper.VerifyToken, PostController.addLike);
router.post('/post/add-comment', AuthHelper.VerifyToken, PostController.addComment);

module.exports = router;