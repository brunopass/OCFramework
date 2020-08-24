const express = require('express')
const restorePassword = require('../services/user/restorePassword')
const { onSuccess, onError } = require('../services/network/Responses')
const router = express.Router()

router.patch('/recover', (req,res)=>{
    restorePassword(
        req.body.token,
        req.body.password
    )
    .then(ok => onSuccess(res,ok,201))
    .catch(err => onError(res,err,403))
})

module.exports = router