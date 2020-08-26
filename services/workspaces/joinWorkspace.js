const { Mongo } = require("../../libraries/database/mongodb")
const decryptUser = require("../security/decryptUser")
const { decryptAES256 } = require("../../libraries/security/aes256")
const config = require("../../config")

module.exports = joinWorkspace = (jwt,token) =>{
    return new Promise((resolve,reject)=>{
        new Mongo('users', 'codex')
        .VALIDATE(jwt)
        .then(user => {
            const workspace = JSON.parse(decryptAES256(token, config.config.secret))
            const user_data = decryptUser(user)
            user_data.workspace_id.push({name: workspace.name, id: workspace.id})

            new Mongo('users', 'codex')
                .PATCH({_id: jwt}, {data: encryptAES256(JSON.stringify(user_data), config.config.secret)})
                .then(()=>{
                    resolve('workspace joined')
                })
                .catch(err => {
                    reject(new Error(err))
                })
        })
    })
}