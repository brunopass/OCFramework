const express = require('express')
const router = express.Router()
const { onSuccess } = require('../services/network/Responses')

router.get('/version', (req,res)=>{
    onSuccess(res, 'V: 0.0.1', 200)
})

module.exports = router