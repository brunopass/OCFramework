const jsonwebtoken = require('jsonwebtoken')
const {config} = require('../../config')

const signJWT = payload =>{
    return jsonwebtoken.sign(payload, config.jwt)
}

const verifyJWT = token =>{
    return new Promise((resolve,reject)=>{
        try{
            let verify = jsonwebtoken.verify(token, config.jwt)
            resolve(verify)
        }catch(err){
            console.error(err)
            reject(new Error("invalid cookie"))
        }
    })
}

module.exports = {
    signJWT,
    verifyJWT
}