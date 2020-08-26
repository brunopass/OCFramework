const { Mongo } = require("../../libraries/database/mongodb")
const { encryptAES256 } = require("../../libraries/security/aes256")
const { config } = require("../../config")
const decryptUser = require("../security/decryptUser")

module.exports = leaveWorkspace = (_id, _workspace) =>{
    return new Promise((resolve,reject)=>{
        new Mongo('users', 'codex')
        .GET({_id: _id})
        .then(user => {
            const userData = decryptUser(user[0])
            const ws = userData.workspace_id.indexOf(_workspace)
            userData.workspace_id.slice(ws, 1)
            new Mongo('users', 'codex')
            .PATCH({_id: _id}, {data: encryptAES256(JSON.stringify(userData),config.secret)})
            .then(()=> resolve('workspace removed'))
            .catch(err => {
                console.error(err)
                reject(new Error('error leaving'))
            })
        })
        .catch(err => {
            console.error(err)
            reject(new Error('user not found'))
        })
    })
}   