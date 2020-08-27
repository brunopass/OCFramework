const { verifyJWT } = require("../../libraries/security/jsonwebtoken")

module.exports = ValidateToken = jwt =>{
    return new Promise(async(resolve,reject)=>{
            try{
                const token = verifyJWT(jwt)
                resolve(token)
            }catch(err)
            {
                reject(new Error('jwt not signed'))
            }
    })
}
