const onSuccess = (res,data,status = 200) =>{
    res.status(status).send(data)
}

const onError = (res,error,status = 400) =>{
    res.status(status).send(error.message)
}

const onCookie = (res,data,name,value,options = {}) =>{
    res.cookie(name,value,options).send(data)
}

module.exports = {
    onSuccess,
    onError,
    onCookie
}