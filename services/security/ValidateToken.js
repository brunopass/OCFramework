const { verifyJWT } = require("../../libraries/security/jsonwebtoken")
const { decryptAES256 } = require("../../libraries/security/aes256")

module.exports = ValidateToken = jwt =>{
    return new Promise((resolve,reject)=>{
            try{
                const token = decryptAES256(verifyJWT(jwt))
                resolve(token)
            }catch(err){
                reject(new Error('jwt not signed'))
            }
    })
}
