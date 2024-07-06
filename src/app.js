const express = require('express')
const app = express()
const router = require('./routes')
const applayMiddleware = require('./middleware')


applayMiddleware(app)

app.use(router)


app.get('/health',(_req,res)=>{
    res.status(200).json({message:'Health Ok'})
})

app.use((err,_req,res,_next)=>{
    // Format Error
    res.status(err.status||500).json({
        message:err.message,
        error:err.error
    })
})

module.exports = app