const validator = require('validator')

const validateEmail = (email) => {
    if (!validator.isEmail(email)) {
        return false
    }
    return true
}

module.exports = validateEmail