const { Mongo } = require("../../libraries/database/mongodb")
const decryptUser = require("../security/decryptUser")
const { encryptAES256 } = require("../../libraries/security/aes256")
const { config } = require("../../config")
const ERROR_MESSAGE = 'user not validated'

module.exports = verifyUserCreated = token =>{
    return new Promise((resolve,reject)=>{
        
        new Mongo('auth', 'codex')
        .GET({_id: token})
        .then(data =>{
            const _id = data[0].user
            validateUser(_id)
            .then(ok =>{
                new Mongo('auth', 'codex')
                .DELETE({_id:token})
                .then(()=> console.log('auth removed'))
                .catch(()=> console.error('auth not removed'))
                resolve(ok)
            })    
            .catch(err => reject( new Error(err)))
        })
        .catch(err => {
            console.error(err)
            reject(new Error(ERROR_MESSAGE))
        })
    })
}

//TODO: 
//having a promise hell, fix later
const validateUser = _id =>{
    return new Promise((resolve,reject)=>{
        new Mongo('users', 'codex')
        .GET({_id: _id})
        .then(user => {
            
            const user_data = decryptUser(user[0])
            if(user_data.validated) reject(new Error('user already validated'));
            else{
                user_data.validated = true
                console.log(JSON.stringify(user_data))
                
                new Mongo('users', 'codex')
                .PATCH({_id: _id},{data: encryptAES256(JSON.stringify(user_data), config.secret)})
                .then(()=>{
                    console.log(`user ${_id}, validated`)
                    resolve('user validated')
                })
                .catch(err => {
                    console.error(err)
                    reject(ERROR_MESSAGE)
                })
            }
        })
        .catch(err =>{
            console.error(err)
            reject(ERROR_MESSAGE)
        })
    })
}