const express = require('express')
const SignInWithEmailAndPassword = require('../services/user/SignInWithEmailAndPassword')
const { onSuccess, onError, onCookie } = require('../services/network/Responses')
const CreateUserWithEmailAndPassword = require('../services/user/CreateUserWithEmailAndPassword')
const sendRecoveryPassword = require('../services/user/sendRecoveryPassword')
const resendVerificationEmail = require('../services/user/resendVerificationEmail')
const createIncogniteWithIdAndPassword = require('../services/incognite/createIncogniteWithIdAndPassword')
const router = express.Router()

router.post('/signin', (req,res)=>{
    SignInWithEmailAndPassword(
        req.body.email,
        req.body.password
    )
    .then(jwt=> {
        onCookie(res,'user logged','token',jwt,{
            httpOnly:true
        })
    })
    .catch(err => onError(res,err,401))
})

router.post('/signup', (req,res)=>{
    CreateUserWithEmailAndPassword(
        req.body.email,
        req.body.password
    )
    .then(ok => onSuccess(res,ok,201))
    .catch(err => onError(res,err,400))
})

router.post('/resend', (req,res)=>{
    resendVerificationEmail(req.body.email)
    .then(ok => onSuccess(res,ok,200))
    .catch(err => onError(res,err,400))
})

router.post('/recover', (req,res)=>{
    sendRecoveryPassword(
        req.body.email
    )
    .then(ok => onSuccess(res,ok,200))
    .catch(err => onError(res,err,400))
})

router.post('/incognite/signup', (req,res)=>{
    createIncogniteWithIdAndPassword(
        req.body.id,
        req.body.password
    )
    .then(jwt=> {onCookie(res,'incognite created','token',jwt,{
        maxAge: 86_400_000,
        httpOnly:true,
        })
    })
    .catch(err => onError(res,err,400))
})

module.exports = router