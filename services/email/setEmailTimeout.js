const sendEmail = require("../../libraries/smtp/mailjet")
const { ulid } = require("ulid")
const SHA256 = require("../../libraries/security/sha256")
const verifyEmailTemplate = require("../../libraries/smtp/templates/verifyEmailTemplate")
const restoreEmailTemplate = require("../../libraries/smtp/templates/restoreEmailTemplate")
const passwordRestoredEmailTemplate = require("../../libraries/smtp/templates/passwordRestoredEmailTemplate")
const twoFactorAuth = require('../../libraries/smtp/templates/2FA')
const { Mongo } = require("../../libraries/database/mongodb")

module.exports = setEmailTimeOut = (email, subject, file,accessCode="") =>{
    return new Promise((resolve,reject)=>{
        const _id = SHA256(ulid())
        const url = "http://localhost:3000"
        let uri = ''
        const templates = {
            0: ()=>{
                uri = `${url}/verify/${_id}`
                file = verifyEmailTemplate(uri)
            },
            1: ()=>{
                uri = `${url}/restore/${_id}`
                file = restoreEmailTemplate(uri)
            },
            2: ()=>{
                uri = `${url}/restore`
                file = passwordRestoredEmailTemplate(uri)
            },
            3:()=>{
                file = twoFactorAuth(accessCode)
            }
        }

        try{
            templates[file]()
        }
        catch(err){
            console.error(err)
            reject(new Error(err))
        }

        sendEmail(email, subject,file)
        .then(()=>{
            new Mongo('auth', 'codex')
            .POST({
                _id: _id,
                user: email
            })
            .then(()=>{
                setTimeout(()=>{
                    new Mongo('auth', 'codex')
                    .DELETE({_id: _id})
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