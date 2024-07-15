const User = require('../models/userModel');

// Create a new user
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      username,
      email,
      password
    });

    // Save user to database
    await user.save();

    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createUser
  // Implement other CRUD operations similarly
};
