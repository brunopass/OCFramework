const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const GET = require('./controllers/GET')
const POST = require('./controllers/POST')
const { DELETE } = require('./libraries/database/mongodb')
const { generateKeys, encryptRSA, decryptRSA } = require('./libraries/security/rsa')
const server = express()
const PORT = process.env.PORT

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: false}))
server.use(cookieParser())
server.use(GET)
server.use(POST)

const connection = server.listen(PORT,()=>{
    DELETE({}, 'auth', 'codex')
    .then(()=> console.log('auth reiniciado'))
    .catch(Err => console.error('no se pudo reiniciar el auth'))
    console.log(`running on http://localhost:${PORT}/`)
})

connection.on('connection', socket =>{
    console.log(socket.address())
})