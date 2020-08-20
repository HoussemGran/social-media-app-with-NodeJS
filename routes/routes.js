
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const postController = require('../controller/postController');
const groupController = require('../controller/groupController');

// user controller
router.post('/user',userController.addUser);
router.get('/users',userController.showUsers);
router.get('/profile/:id',userController.showUser);
router.get('/myprofile',userController.myProfile);
router.get('/logout',userController.logout);

// posts controller
router.post('/post',postController.addPost);
router.get('/home',postController.showPosts);
router.post('/post/:id',postController.deletePost);
router.get('/post/:id',postController.showPostsByID);
router.get('/up/:id',postController.incrementUP);

// groups controller
router.post('/group',groupController.addGroup);
router.get('/groups',groupController.showGroups);
router.get('/group/:id',groupController.showGroup);
router.delete('/group/:id',groupController.deleteGroup);
router.patch('/group/details/:id',groupController.updateGroup);

module.exports = router;