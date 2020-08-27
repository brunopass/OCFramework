const { Mongo } = require("../../libraries/database/mongodb")
const { decryptAES256, encryptAES256 } = require("../../libraries/security/aes256")
const SHA256 = require("../../libraries/security/sha256")
const { config } = require("../../config")

module.exports = signInIncogniteWithIdAndPassword = (id,password) =>{
    return new Promise((resolve,reject)=>{
        const passphrase = SHA256(password)
        new Mongo('incognite', 'codex')
        .VALIDATE(id)
        .then(incognite => {
            const user = JSON.parse(decryptAES256(incognite.data,passphrase))
            if(user.password != undefined && user.password === passphrase){
                resolve(signJWT(encryptAES256(id,config.secret)))
            }else{
                reject(new Error('invalid credentials'))
            }
        })
        .catch(err => {
            console.error(err)
            reject(new Error('invalid credentials'))
        })
    })
}