const config = require('../../config')

const mailjet = require ('node-mailjet').connect(config.config.mailjetKey, config.config.mailjetSecret)

const sendEmail = (email,subject,file) =>{
    return new Promise((resolve, reject )=>{
        mailjet
        .post("send", {'version': 'v3.1'})
        .request({
          "Messages":[
            {
              "From": {
                "Email": "noreply@mybasedatabase.com",
                "Name": "OCFramework"
              },
              "To": [
                {
                  "Email": email,
                  "Name": 'Usuario'
                }
              ],
              "Subject": subject,
              "TextPart": "",
              "HTMLPart": file,
              "CustomID": ""
            }
          ]
        })
        .then(()=>{
            resolve('ok')
        })
        .catch(()=>reject('error'))
    })
}

module.exports = sendEmail