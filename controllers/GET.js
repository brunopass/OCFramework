const express = require('express')
const router = express.Router()
const { onSuccess, onError } = require('../services/network/Responses')
const generateId = require('../services/incognite/generateId')
const { verifyJWT } = require('../libraries/security/jsonwebtoken')

router.get('/version', (req,res)=>{
    onSuccess(res, 'V: 0.0.1', 200)
})

router.get('/incognite/id', (req,res)=>{
    const id = generateId()
    onSuccess(res,id,200)
})

router.get('/', (req,res)=>{
    //const jwt = req.cookies.token;
    //const token = verifyJWT(jwt)
    //console.log(token)
})

module.exports = router