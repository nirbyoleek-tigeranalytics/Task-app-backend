const Task = require('../models/taskModel');
const Project = require('../models/projectModel');

const createProject = async (req, res) => {
  const { name, description, startDate, endDate, owner } = req.body;

  try {
    const newProject = new Project({
      name,
      description,
      startDate,
      endDate,
    });

    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Fetch all projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update project by ID
const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description, startDate, endDate } = req.body;

  try {
    const project = await Project.findByIdAndUpdate(
      id,
      { name, description, startDate, endDate },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete project by ID
const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the project by ID and delete it
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Delete all tasks associated with the project
    await Task.deleteMany({ project: id });

    res.json({ message: 'Project and related tasks deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getProjects
};
