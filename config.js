const dotenv = require('dotenv')

const config = {
    port: process.env.PORT,
    secret: process.env.SECRET,
    mongo_db: process.env.MONGO_DB_SECRET,
    jwt: process.env.SECRET,
    mailjetKey: process.env.MAILJET_KEY,
    mailjetSecret: process.env.MAILJET_SECRET
}

module.exports = {config}