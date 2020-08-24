const jsonwebtoken = require('jsonwebtoken')
const {config} = require('../../config')

const signJWT = payload =>{
    return jsonwebtoken.sign(payload, config.jwt)
}

const verifyJWT = token =>{
    return jsonwebtoken.verify(token, config.jwt)
}

module.exports = {
    signJWT,
    verifyJWT
}