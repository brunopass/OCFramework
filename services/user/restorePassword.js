const { Mongo } = require("../../libraries/database/mongodb")
const decryptUser = require("../security/decryptUser")
const SHA256 = require("../../libraries/security/sha256")
const { encryptAES256 } = require("../../libraries/security/aes256")
const config = require("../../config")
const setEmailTimeout = require("../email/setEmailTimeout")

module.exports = restorePassword = (token, password) =>{
    return new Promise((resolve,reject)=>{
        new Mongo('auth', 'codex')
        .GET({_id: token})
        .then(data =>{
            const _id = data[0].user

            new Mongo('users', 'codex')
            .GET({_id: _id})
            .then(user =>{
                const user_data = decryptUser(user[0])
                user_data.password = SHA256(password)

                new Mongo( 'users', 'codex')
                .PATCH({_id: _id}, {data: encryptAES256(JSON.stringify(user_data),config.config.secret)})
                .then(()=>{

                    setEmailTimeout(_id, 'Password modified', 2)
                    .then(()=>{
                        resolve('password changed')
                    })
                    .catch(err =>{
                        resolve('password changed but not email sent')
                    })
                })
                .catch(err => {
                    reject(new Error(err))
                })
            })
            .catch(err =>{
                console.error(err)
                reject(new Error(err))
            })
        })
        .catch(err => reject(new Error(err)))
    })
}