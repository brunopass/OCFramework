const verifyEmail = require("../email/verifyEmail");
const { Mongo } = require("../../libraries/database/mongodb");
const SHA256 = require("../../libraries/security/sha256");
const { decryptAES256 } = require("../../libraries/security/aes256");
const { signJWT } = require("../../libraries/security/jsonwebtoken");
const config = require("../../config");

module.exports = SignInWithEmailAndPassword = (email,password) =>{
    return new Promise((resolve,reject)=>{
        if(!verifyEmail(email)){
            console.log('denied')
            reject(new Error('Email invalido'));
        } else{
        const passphrase = SHA256(password)
        new Mongo( 'users', 'codex')
        .VALIDATE(email)
        .then(user => {
            const data = decryptAES256(JSON.stringify(user.data),config.config.secret)
            const userData = JSON.parse(data)
            if(userData.password == passphrase){
                if(userData.validated){
                    const jwt = signJWT({sub: email})
                    resolve(jwt)
                }else{
                    console.log('user not validated')
                    reject(new Error('user not validated'))
                }
                userData = null
            }else{
                reject(new Error('credentials not found'))
            }
        })
        .catch(err =>{
            reject(new Error('credentials not found'))
        })
    }
    })
}