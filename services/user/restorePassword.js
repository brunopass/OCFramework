const { GET, PATCH } = require("../../libraries/database/mongodb")
const decryptUser = require("../security/decryptUser")
const SHA256 = require("../../libraries/security/sha256")
const { encryptAES256 } = require("../../libraries/security/aes256")
const config = require("../../config")
const setEmailTimeout = require("../email/setEmailTimeout")

module.exports = restorePassword = (token, password) =>{
    return new Promise((resolve,reject)=>{
        GET({_id: token}, 'auth', 'codex')
        .then(data =>{
            const _id = data[0].user
            GET({_id: _id}, 'users', 'codex')
            .then(user =>{
                const user_data = decryptUser(user[0])
                user_data.password = SHA256(password)
                PATCH({_id: _id}, {data: encryptAES256(JSON.stringify(user_data),config.config.secret)}, 'users', 'codex')
                .then(()=>{
                    //have to send an email saying {Password have changed} 
                    setEmailTimeout(_id, 'Password modified')
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