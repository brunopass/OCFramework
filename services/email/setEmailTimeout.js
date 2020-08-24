const sendEmail = require("../../libraries/smtp/mailjet")
const { ulid } = require("ulid")
const SHA256 = require("../../libraries/security/sha256")
const { POST, DELETE } = require("../../libraries/database/mongodb")
const verifyEmailTemplate = require("../../libraries/smtp/templates/verifyEmailTemplate")
const restoreEmailTemplate = require("../../libraries/smtp/templates/restoreEmailTemplate")
const passwordRestoredEmailTemplate = require("../../libraries/smtp/templates/passwordRestoredEmailTemplate")

module.exports = setEmailTimeOut = (email, subject, file) =>{
    return new Promise((resolve,reject)=>{
        const _id = SHA256(ulid())
        const url = ''
        const templates = {
            0: ()=>{
                file = verifyEmailTemplate(url)
            },
            1: ()=>{
                file = restoreEmailTemplate(url)
            },
            2: ()=>{
                file = passwordRestoredEmailTemplate(url)
            }
        }
        
        try{
            templates[file]()
        }
        catch(err){
            console.error(err)
        }

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