const { Mongo } = require("../../libraries/database/mongodb")
const decryptUser = require("../security/decryptUser")
const setEmailTimeout = require("../email/setEmailTimeout")

module.exports = resendVerificationEmail = email =>{
    return new Promise((resolve,reject)=>{
        new Mongo('users', 'codex')
        .VALIDATE(email)
        .then(user => {
            const user_data = decryptUser(user)
            if(user_data.validated){
                reject(new Error('already validated'))
            }else{
                setEmailTimeout(email,'Verificación de Cuenta', 0)
                .then(()=>{
                    resolve('email sent')
                })
                .catch(err => {
                    console.error(err)
                    reject(new Error('cannot sent'))
                })
            }
        })
        .catch(err => {
            console.error(err)
            reject(new Error('invalid credentials'))
        })
    })
}