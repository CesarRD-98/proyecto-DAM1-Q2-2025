const jwt = require('jsonwebtoken')

const generateToken = (userAuth) => {
    return jwt.sign(userAuth, process.env.JWT_SECRET, { expiresIn: '1h' })
}

module.exports = generateToken