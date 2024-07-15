const jwt = require('jsonwebtoken');
const config = require('../config/config'); // Adjust path as necessary

function authMiddleware(req, res, next) {
  // Get token from request header
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization denied. No token provided.' });
  }

  // Remove Bearer prefix if present
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7, authHeader.length).trimLeft() : authHeader;

  try {
    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret);

    // Set user in request object
    req.user = decoded.user; // Assuming decoded.user contains user information

    next(); // Move to the next middleware or route handler
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json({ message: 'Authorization denied. Invalid token.' });
  }
}

module.exports = authMiddleware;
