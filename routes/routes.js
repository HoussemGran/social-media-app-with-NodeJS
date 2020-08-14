
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const postController = require('../controller/postController');

router.post('/user',userController.addUser);
router.get('/user',userController.showUsers);

router.post('/post',postController.addPost);
router.get('/',postController.showPosts);
router.post('/post/:id',postController.deletePost);
router.get('/post/:id',postController.showPostsByID);

module.exports = router;