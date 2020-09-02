const express = require('express')
const SignInWithEmailAndPassword = require('../services/user/SignInWithEmailAndPassword')
const { onSuccess, onError, onCookie, onAuthCookie } = require('../services/network/Responses')
const CreateUserWithEmailAndPassword = require('../services/user/CreateUserWithEmailAndPassword')
const sendRecoveryPassword = require('../services/user/sendRecoveryPassword')
const resendVerificationEmail = require('../services/user/resendVerificationEmail')
const createIncogniteWithIdAndPassword = require('../services/incognite/createIncogniteWithIdAndPassword')
const signInWithToken = require('../services/user/signInWithToken')
const { verifyJWT } = require('../libraries/security/jsonwebtoken')
const router = express.Router()

router.post('/signin', (req,res)=>{
    SignInWithEmailAndPassword(
        req.body.email,
        req.body.password
    )
    .then(jwt=> {
        onCookie(res,'2fa sent','auth',jwt,{
            httpOnly:true
        })
    })
    .catch(err => onError(res,err,401))
})

router.post('/2fa', (req,res)=>{
        signInWithToken(
            req.body.auth,
            req.body.code
        )
        .then(jwt => {
            onAuthCookie(res,'user logged', 'token', jwt,{
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