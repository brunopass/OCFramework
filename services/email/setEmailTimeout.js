const sendEmail = require("../../libraries/smtp/mailjet")
const { ulid } = require("ulid")
const SHA256 = require("../../libraries/security/sha256")
const { POST, DELETE } = require("../../libraries/database/mongodb")

module.exports = setEmailTimeOut = (email, subject, file) =>{
    return new Promise((resolve,reject)=>{
        const _id = SHA256(ulid())
        sendEmail(email, subject,file)
        .then(()=>{
            POST({
                _id: _id,
                user: email
            }, 'auth', 'codex')
            .then(()=>{
                setTimeout(()=>{
                    DELETE({_id: _id})
                    .then(()=>{console.log(`token: ${_id} caducado`)})
                    .catch(err => {})
                }, 1860000)
                resolve('email sent')
            })
            .catch(()=>{
                reject(new Error('email not sent'))
            })
        })
        .catch(err => {})
    })
}