const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const GET = require('./controllers/GET')
const POST = require('./controllers/POST')
const PATCH = require('./controllers/PATCH')
const { Mongo } = require('./libraries/database/mongodb')
const { config } = require('./config')
const server = express()
const PORT = config.port

server.use(cookieParser(config.secret))

server.use(cors({
    origin: config.cors,
    credentials: true
}))

server.use(session({
    secret: config.secret,
    cookie: {
        path: '/',
        domain: '',  
    }
}));

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: false}))
server.use(GET)
server.use(POST)
server.use(PATCH)

const connection = server.listen(PORT,()=>{
   new Mongo('auth', 'codex')
    .DELETE({})
    .then(()=> console.log('auth reiniciado'))
    .catch(err => console.error(err))
    console.log(`running on http://localhost:${PORT}/`)
})

connection.on('connection', socket =>{
    console.log(socket.address())
})