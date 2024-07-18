const express = require('express');
const { createProject,updateProject,deleteProject,getProjects } = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new project
router.post('/', authMiddleware, createProject);
router.put('/:id', authMiddleware, updateProject);
router.get('/', authMiddleware, getProjects);
router.delete('/:id', authMiddleware, deleteProject);``

module.exports = router;
