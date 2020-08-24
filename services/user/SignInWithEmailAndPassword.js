const verifyEmail = require("../email/verifyEmail");
const { VALIDATE } = require("../../libraries/database/mongodb");
const SHA256 = require("../../libraries/security/sha256");
const { serverEncrypt, serverDecrypt } = require("../../libraries/security/aes256");
const { signJWT } = require("../../libraries/security/jsonwebtoken");
const config = require("../../config");

module.exports = SignInWithEmailAndPassword = (email,password) =>{
    return new Promise((resolve,reject)=>{
        if(!verifyEmail(email)) reject(new Error('Email invalido'));
        const passphrase = SHA256(password)
        VALIDATE(email)
        .then(user => {
            const data = serverDecrypt(JSON.stringify(user.data),config.config.secret)
            const userData = JSON.parse(data)
            if(userData.password == passphrase){
                const jwt = signJWT({sub: email})
                resolve(jwt)
            }else{
                reject(new Error('credentials not found'))
            }
        })
        .catch(err =>{
            reject(new Error('credentials not found'))
        })
    })
}