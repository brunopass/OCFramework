const {sha256} = require('js-sha256')
const {config} = require('../../config')

const SHA256 = path =>{
    return sha256(path, config.secret)
}

module.exports = SHA256