const axios = require('axios')
const config = require('../config')

const configuration = {
    email: '',
    password: '',
    token: '',
}

let errors = []
let success = []

const POST = (data,url) => {
    axios.default.post(`http://localhost:${config.config.port}/${url}`, data)
    .then(response=>{
        console.log(response.data, response.headers, response.status, response.request)
        success.push(response)
    })
    .catch(err => {
        console.error(err)
        errors.push(err)
    })
}

const createNewUser = () =>{
    POST({
        email: configuration.email,
        password: configuration.password
    }, 'signup')
}

const tests = {
    0: ()=> createNewUser(),
}

const start = () => {
    for(let i in tests){
        tests[i]()
    }
    setTimeout(()=>{
        console.log(`Success: ${success.length}`)
        console.log(`Fails: ${errors.length}`)
    },1000)
}

start()