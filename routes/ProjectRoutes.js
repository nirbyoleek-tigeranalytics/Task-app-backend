const express = require('express');
const router = express.Router();
const Project = require('../models/projectModel');
const authMiddleware = require('../middleware/authMiddleware'); 

// POST /api/projects - Create a new project
router.post('/',authMiddleware,async (req, res) => {
  try {
    const { name, description, startDate, endDate } = req.body;
    const owner = req.user.id;

    // Create new project instance
    const newProject = new Project({
      name,
      description,
      startDate,
      endDate,
      owner
    });

    // Save project to database
    const project = await newProject.save();
    res.status(201).json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
