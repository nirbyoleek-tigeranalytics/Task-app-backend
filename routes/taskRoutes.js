const express = require('express');
const { createTask, updateTask, deleteTask ,getUserTasks} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new task
router.post('/', authMiddleware, createTask);

// Update a task
router.put('/:id', authMiddleware, updateTask);

// Delete a task
router.delete('/:id', authMiddleware, deleteTask);

router.get('/', authMiddleware, getUserTasks);

module.exports = router;
