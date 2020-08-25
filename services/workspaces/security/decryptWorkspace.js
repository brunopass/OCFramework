const { decryptAES256 } = require("../../../libraries/security/aes256")
const SHA256 = require("../../../libraries/security/sha256")

module.exports = decryptWorkspace = (__workspace, __password) =>{
    try{
        return Promise.resolve(JSON.parse(decryptAES256(__workspace, SHA256(__password))))
    }catch(err){
        console.error(err)
        return Promise.reject(new Error('cannot decrypt'))
    }
}