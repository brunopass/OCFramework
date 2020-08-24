const dotenv = require('dotenv')

const config = {
    port: process.env.PORT,
    secret: process.env.SECRET,
    mongo_db: process.env.MONGO_DB_SECRET,
    jwt: process.env.SECRET
}

module.exports = {config}