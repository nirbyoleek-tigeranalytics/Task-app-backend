const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const UserController = require('../controllers/userController');

// POST /api/users (Create user)
router.post('/', UserController.createUser);

// GET /api/users (Get all users)
router.get('/', authMiddleware, UserController.getUsers);

// GET /api/users/:id (Get user by ID)
router.get('/:id', authMiddleware, UserController.getUserById);

// PUT /api/users/:id (Update user by ID)
router.put('/:id', authMiddleware, UserController.updateUser);

// DELETE /api/users/:id (Delete user by ID)
router.delete('/:id', authMiddleware, UserController.deleteUser);

module.exports = router;
