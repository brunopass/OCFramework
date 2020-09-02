const setEmailTimeout = require("../email/setEmailTimeout")
const { signJWT } = require("../../libraries/security/jsonwebtoken")
const SHA256 = require("../../libraries/security/sha256")
const { encryptAES256 } = require("../../libraries/security/aes256")
const config = require("../../config")

const sendAuthVerification = email =>{
    return new Promise((resolve,reject)=>{
        const accessCode = generateAccessCode()

        setEmailTimeout(email, 'Código de verificación', 3, accessCode)
        .then(()=>{
            const data = encryptAES256(JSON.stringify({email: email, access:SHA256(accessCode)}),config.config.secret)
            const jwt = signJWT({access:data})
            resolve(jwt)
        })
        .catch((err)=>{
            console.error(err)
            reject(new Error('error login in'))
        })
    })
}

const generateAccessCode = () =>{
    let code = ''
    for(let i=0;i<6;i++){
        code+=Math.floor(Math.random()*9).toString()
    }
    return code
}

module.exports = sendAuthVerification