const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define User schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'User','Task Manager'], default: 'User' } 
});

// Create User model
const User = mongoose.model('User', userSchema);

module.exports = User;
