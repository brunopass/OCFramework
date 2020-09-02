const { decryptAES256 } = require("../../libraries/security/aes256")
const { config } = require("../../config")
const { signJWT } = require("../../libraries/security/jsonwebtoken")

module.exports = signInWithToken = (token,accessCode) =>{   
    return new Promise((resolve,reject)=>{
        const data = getToken(token)
        if(accessCode == data.access){
            resolve(signJWT({sub:data.email}))
        }else{
            reject(new Error('Invalid Code'))
        }
    })
}

const getToken = token => {
    return JSON.parse(decryptAES256(token,config.secret))
}