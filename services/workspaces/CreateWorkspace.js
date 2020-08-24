const SHA256 = require("../../libraries/security/sha256")
const { Mongo } = require("../../libraries/database/mongodb")
const { ulid } = require("ulid")
const { encryptAES256 } = require("../../libraries/security/aes256")
const config = require("../../config")
const decryptUser = require("../security/decryptUser")

module.exports = CreateWorkspace = (user_id,name,password) =>{
    return new Promise((resolve,reject)=>{
        const passphrase = SHA256(password)
        const _id = ulid()

        const data = {
            password: passphrase,
            data: [{}]
        }
        
        new Mongo('workspace', 'codex')
        .POST({
            _id: _id,
            name: name,
            data: encryptAES256(JSON.stringify(data), passphrase)
        })
        .then(()=>{ 
            new Mongo('users', 'codex')
            .GET({_id:user_id})
            .then(user =>{
                const user_data = decryptUser(user[0])
                user_data.workspace_id.push({name: name, id: _id})
                
                new Mongo('users', 'codex')
                .PATCH({_id: user_id}, {data: encryptAES256(JSON.stringify(user_data), config.config.secret)})
                .then(()=>{
                    resolve('workspace created')
                })
                .catch(err => {
                    reject(new Error(err))
                })

            })
            .catch(err => {
                reject(new Error(err))
            })
        })
        .catch(err => {
            console.error('workspace no creado')
            reject(new Error(err))
        })
    })
}