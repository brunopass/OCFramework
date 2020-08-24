const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const GET = require('./controllers/GET')
const POST = require('./controllers/POST')
const PATCH = require('./controllers/PATCH')
const { Mongo } = require('./libraries/database/mongodb')
const { config } = require('./config')
const server = express()
const PORT = config.port

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: false}))
server.use(cookieParser())
server.use(GET)
server.use(POST)
server.use(PATCH)

const connection = server.listen(PORT,()=>{
    new Mongo('auth', 'codex')
    .DELETE({})
    .then(()=> console.log('auth reiniciado'))
    .catch(Err => console.error('no se pudo reiniciar el auth'))
    console.log(`running on http://localhost:${PORT}/`)
})

connection.on('connection', socket =>{
    console.log(socket.address())
})