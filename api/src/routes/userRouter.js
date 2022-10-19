const { Router } = require('express');
const { getUsers, getUserId, postUser, deleteUser, updateUser } = require('../controllers/usersController.js');

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', getUserId);

userRouter.post('/', postUser);

userRouter.delete("/:id", deleteUser);

userRouter.put("/:id", updateUser);


module.exports = userRouter;