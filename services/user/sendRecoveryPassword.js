const verifyEmail = require("../email/verifyEmail");
const { Mongo } = require("../../libraries/database/mongodb");
const setEmailTimeout = require("../email/setEmailTimeout");

module.exports = sendRecoveryPassword = email =>{
    return new Promise((resolve,reject)=>{
        if(!verifyEmail(email))reject(new Error('invalid email'));

        new Mongo( 'users', 'codex')
        .VALIDATE(email)
        .then(()=>{
            setEmailTimeout(email,'Restore password',1)
            .then(()=>{
                resolve('email sent')
            })
            .catch(err => {
                reject(new Error(err))
            })
        })
        .catch(err=>{
            reject(new Error(err))
        })
    })
}