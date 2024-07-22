const express = require('express');
const { createTask, updateTask, deleteTask ,getTasks,getUserTasks,updateTaskStatus} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new task
router.post('/', authMiddleware, createTask);

// Update a task
router.put('/:id', authMiddleware, updateTask);

// Delete a task
router.delete('/:id', authMiddleware, deleteTask);

router.get('/', authMiddleware, getTasks);

router.get('/user', authMiddleware, getUserTasks);

router.put('/:id/status', authMiddleware, updateTaskStatus);

module.exports = router;
