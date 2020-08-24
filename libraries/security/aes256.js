const aes256 = require('aes256')
const {config} = require('../../config')

const encryptAES256 = (path, key) =>{
    return aes256.encrypt(key,path)
}

const decryptAES256 = (path, key) =>{
    return aes256.decrypt(key,path)
}

const serverEncrypt = path =>{
    return aes256.encrypt(config.secret, path)
}

const serverDecrypt = path =>{
    return aes256.decrypt(config.secret, path)
}

module.exports = {
    encryptAES256,
    decryptAES256,
    serverEncrypt,
    serverDecrypt
}