const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  // Get token from header
  const token = req.header('Authorization');

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Authorization denied. Token not provided.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, 'your-secret-key');

    // Attach user from token payload to request object
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Authorization denied. Invalid token.' });
  }
};

module.exports = authMiddleware;
