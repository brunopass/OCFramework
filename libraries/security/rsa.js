const crypto = require('crypto')
const { Buffer } = require('buffer')

class Key{
    constructor(_private,_public){
        this._private = _private,
        this._public = _public
    }
}

const generateKeys = () =>{
    return new Promise((resolve,reject)=>{
        crypto.generateKeyPair("rsa", {
            modulusLength: 4096
        },(err,__public_key, __private_key)=>{
            try{
                resolve(new Key(__private_key,__public_key))
            }catch{
                reject(new Error(err))
            }
        })
    })
}

const encryptRSA = (__path, __public_key) =>{
    const encrypt = crypto.publicEncrypt({
        key: __public_key,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
    }, Buffer.from(__path))
    return encrypt
}

const decryptRSA = (__path, __private_key) =>{
    const decrypt =  crypto.privateDecrypt({
        key: __private_key,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
    }, __path)
    return decrypt
}

const signRSA = (__path, __private_key) =>{
    return crypto.sign("sha256", Buffer.from(__path), {
        key: __private_key,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING
    }).toString()
}

const verifyRSA = (__sign,__path, __public_key) =>{
    return crypto.verify("sha256", Buffer.from(__path),{
        key: __public_key,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING
    }, __sign)
}

module.exports = {
    generateKeys,
    encryptRSA,
    decryptRSA,
    signRSA,
    verifyRSA
}