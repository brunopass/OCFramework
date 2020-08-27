const jsonwebtoken = require('jsonwebtoken')
const {config} = require('../../config')

const signJWT = payload =>{
    return jsonwebtoken.sign(payload, config.jwt)
}

const verifyJWT = token =>{
    try{
        return jsonwebtoken.verify(token, config.jwt)
    }catch{
        return null
    }
}

module.exports = {
    signJWT,
    verifyJWT
}