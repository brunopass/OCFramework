const emailValidator = require('email-validator')

module.exports = checkEmail = email =>{
    return emailValidator.validate(email)
}