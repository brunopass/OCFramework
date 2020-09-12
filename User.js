'use strict'
const CreateUserWithEmailAndPassword = require("./CreateUserWithEmailAndPassword");
const resendVerificationEmail = require("./resendVerificationEmail");
const restorePassword = require("./restorePassword");
const sendAuthVerification = require("./sendAuthVerification");
const sendRecoveryPassword = require("./sendRecoveryPassword");
const SignInWithEmailAndPassword = require("./SignInWithEmailAndPassword");
const signInWithToken = require("./signInWithToken");

class User{
    constructor(email,password){
        this.email = email
        this.password = password
    }

    CreateUser(){
        return CreateUserWithEmailAndPassword(this.email, this.password)
    }

    SignIn(){
        return SignInWithEmailAndPassword(this.email, this.password)
    }

    ResendVerificationEmail(){
        return resendVerificationEmail(this.email)
    }

    SendAuthVerification(){
        return sendAuthVerification(this.email)
    }

    SendRecoveryPassword(){
        return sendRecoveryPassword(this.email)
    }
}

class Auth{
    constructor(password,token){
        this.password = password
        this.token = token
    }

    RestorePassword(){
        return restorePassword(this.token, this.password)
    }   

    SignInWithToken(access){
        return signInWithToken(this.token,access)
    }
}

module.exports = {
    User,
    Auth
}