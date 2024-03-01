const jwt = require('jsonwebtoken')

const config = require('../../config.js')

// Secret key for JWT  // Do Not change the seceretKey
const secretKey = config.JWT_Secret_key;      //jsonwebtoken uses a secret key to encrypt and decrypt the token

// Access Token Generation function
function generateAccessToken(user) {
    return jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
  }
  
  // Middleware for authenticating the token
  function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Token is required.' });
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid Access Token.' });
      req.user = user;
      next();
    });
  }

  module.exports = { generateAccessToken, authenticateToken };