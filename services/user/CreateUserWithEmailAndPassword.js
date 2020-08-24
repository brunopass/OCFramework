const { POST } = require("../../libraries/database/mongodb")
const SHA256 = require("../../libraries/security/sha256")
const verifyEmail = require("../email/verifyEmail")
const setEmailTimeout = require("../email/setEmailTimeout")
const { serverEncrypt } = require("../../libraries/security/aes256")
const config = require("../../config")
const verifyEmailTemplate = require("../../libraries/smtp/templates/verifyEmailTemplate")

module.exports = CreateUserWithEmailAndPassword = (email = '',password) =>{
    return new Promise((resolve,reject)=>{
        if(!verifyEmail(email)) {reject(new Error('email not valid'))}
        const passphrase = SHA256(password)

        const data = {
            password: passphrase,
            workspace_id: [{}],
            suscription: 0, //means FREE suscription
            validated: false
        }

        try{
            const crypted = serverEncrypt(JSON.stringify(data),config.config.secret)
            POST({
                _id: email,
                data: crypted.toString("base64")
            }, 'users', 'codex')
            .then(()=>{
                setEmailTimeout(email, 'Verificación de Cuenta', 0)
                .then(()=>{
                    resolve('user created')
                })
                .catch(err=> {
                    console.error(err)
                    resolve('user created, no email sent')
                })
            })
            .catch(err => {
                console.error("Error al crear user en db")
                reject(new Error(err))
            })
        }
        catch(Err){
            reject(new Error(Err))
        }
    })
}