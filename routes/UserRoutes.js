const express = require('express');

const { createUser, getAllUsers, getUserById, updateUserById, deleteUserById } = require('../controllers/UserController');

const router = express.Router();

    router.get('/users', getAllUsers);

    router.get('/users/:id', getUserById);

    router.post('/users', createUser);

    router.patch('/users/:id', updateUserById);

    router.delete('/users/:id', deleteUserById);

    module.exports = router;