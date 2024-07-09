const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({
      status: 'Unauthorized',
      message: 'Access denied. No token provided.',
    });
  }

  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      status: 'Unauthorized',
      message: 'Access denied. No token provided.',
    });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'Unauthorized',
      message: 'Invalid token.'
    });
  }
};
