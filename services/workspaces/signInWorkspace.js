const { Mongo } = require("../../libraries/database/mongodb")
const decryptWorkspace = require("./security/decryptWorkspace")
const SHA256 = require("../../libraries/security/sha256")
const { signJWT } = require("../../libraries/security/jsonwebtoken")
const { encryptAES256 } = require("../../libraries/security/aes256")
const { config } = require("../../config")

module.exports = signInWorkspace = (_id, password) =>{
    return new Promise((resolve,reject)=>{
        new Mongo('workspace', 'codex')
        .GET({_id: _id})
        .then(workspace => {
            const data = decryptWorkspace(workspace[0], password)
            data.catch(() => reject(new Error('cannot decrypt')))
            data.then(workspaceDecrypted => {
                if(workspaceDecrypted.password === SHA256(password)){
                    resolve(signJWT(encryptAES256(SHA256(password),config.secret)))
                }else{
                    reject(new Error('cannot decrypt'))
                }
            })
        })
        .catch(err => {
            console.error(err)
            reject(new Error('workspace not found'))
        })
    })
}