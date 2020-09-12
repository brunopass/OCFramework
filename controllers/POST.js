const express = require('express')
const { onSuccess, onError, onCookie, onAuthCookie } = require('../services/network/Responses')
const createIncogniteWithIdAndPassword = require('../services/incognite/createIncogniteWithIdAndPassword')
const { User, Auth }= require('../services/user/User')
const router = express.Router()

router.post('/signin', (req,res)=>{
    new User(req.body.email,req.body.password)
    .SignIn()
    .then(jwt=> {
        onCookie(res,'2fa sent','auth',jwt,{
            httpOnly:true
        })
    })
    .catch(err => onError(res,err,401))
})

router.post('/2fa', (req,res)=>{
    new Auth(undefined,req.body.auth)
    .SignInWithToken(req.body.code)
        .then(jwt => {
            onAuthCookie(res,'user logged', 'token', jwt,{
                httpOnly:true
            })
        })
        .catch(err => onError(res,err,401))

})

router.post('/signup', (req,res)=>{
    new User(req.body.email,req.body.password)
    .CreateUser()
    .then(ok => onSuccess(res,ok,201))
    .catch(err => onError(res,err,400))
})

router.post('/resend', (req,res)=>{
    new User(req.body.email)
    .ResendVerificationEmail()
    .then(ok => onSuccess(res,ok,200))
    .catch(err => onError(res,err,400))
})

router.post('/recover', (req,res)=>{
    new User(req.body.email)
    .SendRecoveryPassword()
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