const { Mongo } = require("../../libraries/database/mongodb")
const { encryptAES256 } = require("../../libraries/security/aes256")
const SHA256 = require("../../libraries/security/sha256")
const config = require("../../config")

module.exports = createIncogniteWithIdAndPassword = (id, password) => {
    return new Promise((resolve,reject)=>{
        const passphrase = SHA256(password)
        const user = {
            password: passphrase,
            data:[{}]
        }
        new Mongo('incognite', 'codex')
        .POST({
            _id: id,
            validated: false,
            data: encryptAES256(JSON.stringify(user), passphrase)
        })
        .then(()=>{
            resolve(signJWT(encryptAES256(id,config.config.secret)))
        })
        .catch(err => {
            console.error(err)
            reject(new Error('opeartion failed'))
        })
    })
}