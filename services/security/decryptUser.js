const { decryptAES256 } = require("../../libraries/security/aes256")
const {config} = require('../../config')

module.exports = decryptUser = (user) =>{

    console.log(user)

    class User{
        constructor(password, workspace_id, suscription,validated){
            this.password = password
            this.workspace_id = [{}] = workspace_id
            this.suscription = suscription
            this.validated = validated
        }
    }

        const data = decryptAES256(JSON.stringify(user.data), config.secret)
        const data_json = JSON.parse(data)
        let user_data = new User(
            data_json.password,
            data_json.workspace_id,
            data_json.suscription,
            data_json.validated
        )
        return user_data
}