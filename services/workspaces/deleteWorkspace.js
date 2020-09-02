const { Mongo } = require("../../libraries/database/mongodb")
const SHA256 = require("../../libraries/security/sha256")
const decryptWorkspace = require("./security/decryptWorkspace")

const deleteWorkspace = (workspace_id,password) =>{
    return new Promise((resolve,reject)=>{
        new Mongo("workspace","codex")
        .GET({_id: workspace_id})
        .then(workspace => {
            let passphrase = SHA256(password)
            decryptWorkspace(workspace[0].data, passphrase)
            .then(ws => {
                try{
                    if(ws.password === passphrase){
                        new Mongo("workspace", "codex")
                        .DELETE({_id: workspace_id})
                        .then(()=>{
                            resolve('workspace deleted')
                            console.log(`workspace: ${workspace_id}, Deleted`)
                        })
                        .catch(err => {
                            console.error(err)
                            reject(new Error('workspace could not be eliminated'))
                        })
    
                    }
                }catch(err){
                    reject(new Error('invalid credentials'))
                }
            })
            .catch(err => {
                console.error(err)
                eject(new Error('invalid credentials'))
            })
        })
        .catch(err => {
            console.error(err)
            reject(new Error('workspace not found'))
        })
    })
}

module.exports = deleteWorkspace