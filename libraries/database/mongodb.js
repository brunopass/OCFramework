const {MongoClient} = require('mongodb')
const {config} = require('../../config')
const { serverDecrypt } = require('../security/aes256')
const uri = config.mongo_db
const client = new MongoClient(uri, { useUnifiedTopology: true })

const setDB = (__db, __collection) =>{
    return client.db(__db).collection(__collection)
}

const GET = (__query, __collection, __db) =>{
    return new Promise((resolve,reject)=>{
        client.connect(()=>{
            setDB(__db,__collection).find(__query).toArray((err,data)=>{
                try{
                    resolve(data)
                }catch{
                    reject(new Error(err))
                }
            })
        })
    })
}

const POST = (__path, __collection, __db) =>{
    return new Promise((resolve,reject)=>{
        client.connect(()=>{
            setDB(__db,__collection).insertOne(__path)
            .then(()=>{
                resolve('upload')
            })
            .catch(err => {
                reject(new Error(err))
            })
        })
    })
}

const PATCH = (__query,__path, __collection, __db) =>{
    return new Promise((resolve,reject)=>{
        client.connect(()=>{
            setDB(__db, __collection).findOneAndUpdate(__query,__path)
            .then(()=>{
                resolve('updated')
            })
            .catch(err =>{
                reject(new Error(err))
            })
        })
    })
}

const DELETE = (__query, __collection, __db) =>{
    return new Promise((resolve,reject)=>{
        setDB(__db,__collection).deleteOne(__query)
        .then(()=>{
            resolve('deleted')
        })
        .catch(err =>{
            reject(new Error(err))
        })
    })
}

const VALIDATE = _id =>{
    return new Promise((resolve,reject)=>{
        client.connect(()=>{
            const db = client.db('codex').collection('users')
            db.findOne({_id: _id}).then(user => {
                if(user._id == _id ){
                    resolve(user)
                } 
                else {
                    console.error('_id not found')
                    reject(new Error('_id not found'))
                }
            })
            .catch(err =>{
                console.error('_id not found')
                reject(new Error('_id not found'))
            })
        })
    })
}

module.exports = {
    GET,
    POST,
    PATCH,
    DELETE,
    VALIDATE
}