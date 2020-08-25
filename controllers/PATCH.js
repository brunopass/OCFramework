const express = require('express')
const restorePassword = require('../services/user/restorePassword')
const { onSuccess, onError } = require('../services/network/Responses')
const verifyUserCreated = require('../services/user/verifyUserCreated')
const router = express.Router()

router.patch('/recover', (req,res)=>{
    restorePassword(
        req.body.token,
        req.body.password
    )
    .then(ok => onSuccess(res,ok,201))
    .catch(err => onError(res,err,403))
})

router.patch('/verify', (req,res)=>{
    verifyUserCreated(
        req.body.token
    )
    .then(ok => onSuccess(res,ok,200))
    .catch(err => onError(res,err,400)) //error may change(? can be forbidden
})

module.exports = router