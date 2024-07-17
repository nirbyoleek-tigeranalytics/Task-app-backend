const Task = require('../models/taskModel');

// Create a new task
const createTask = async (req, res) => {
  const { name,description, dueDate, status, project } = req.body;

  try {
    const newTask = new Task({
      name,
      description,
      dueDate,
      status,
      owner: req.user.id, 
      project,
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update a task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { description, dueDate, status, project } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { description, dueDate, status, project },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getUserTasks = async (req, res) => {
    try {
      const tasks = await Task.find({ owner: req.user.id }).populate('owner', 'username email').populate('project', 'name');
      res.json(tasks);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getUserTasks
};
