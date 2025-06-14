const jwt = require('jsonwebtoken')

const generateToken = (userAuth) => {
    return jwt.sign(userAuth, process.env.JWT_SECRET, { expiresIn: '5m' })
}

module.exports = generateToken