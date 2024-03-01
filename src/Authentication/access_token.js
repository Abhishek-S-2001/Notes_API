const jwt = require('jsonwebtoken')

const config = require('../../config.js')

// Secret key for JWT  // Do Not change the seceretKey
const accessTokenSecretKey = config.JWT_Access_key;      //jsonwebtoken uses a secret key to encrypt and decrypt the token
const refreshTokenSecretKey = config.JWT_Refresh_key

// Access Token Generation function
function generateAccessToken(user) {
    return jwt.sign({ userId: user._id }, accessTokenSecretKey, { expiresIn: '1h' });
  }

// Refresh Token Generation function
function generateRefreshToken(user) {
    return jwt.sign({ userId: user._id }, refreshTokenSecretKey, { expiresIn: '7d' });
  }
  
// Middleware for authenticating the token
function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Token is required.' });

    jwt.verify(token, accessTokenSecretKey, (err, user) => {
        if (err) {
            // Check if it's an expired token
            if (err.name === 'TokenExpiredError') {
                // Attempt to refresh the token
                const refreshToken = req.header('Refresh-Token');
                if (!refreshToken) return res.status(401).json({ message: 'Refresh Token is required.' });

                jwt.verify(refreshToken, refreshTokenSecretKey, (refreshErr, decoded) => {
                if (refreshErr) return res.status(403).json({ message: 'Invalid Refresh Token. Please SignIn' });

                // If the refresh token is valid, generate a new access token
                const newAccessToken = generateAccessToken(decoded);
                // Attach the new access token to the response headers
                res.set('New-Access-Token', newAccessToken);
                // Continue with the request
                req.user = decoded;
                next();
                });
            } else {
                return res.status(403).json({ message: 'Invalid Access Token.' });
            }
        } else {
        req.user = user;
        next();
        }
    });
}

  module.exports = { generateAccessToken, generateRefreshToken, authenticateToken };