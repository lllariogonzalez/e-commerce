const { Router } = require('express');
const { postUser, getUserCheck, blockUser, updateUser, getUserByEmail, getUsers } = require('../controllers/usersController.js');
const login = require('../middlewares/login.js');
const admin = require('../middlewares/admin.js');
const fileUpload = require('../middlewares/fileUpload.js');

const userRouter = Router();

userRouter.post('/', postUser);

userRouter.get('/', login, admin, getUsers);

userRouter.get('/:email', login, getUserByEmail);

userRouter.get('/check/:email', getUserCheck);

userRouter.put('/block/:email', login, admin, blockUser);

userRouter.post('/:email', login, fileUpload, updateUser);

userRouter.put('/:email', login, fileUpload, updateUser);

module.exports = userRouter;
