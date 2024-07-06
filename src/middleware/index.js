const morgan = require('morgan')
const express = require('express')
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDoc = YAML.load('./swagger.yaml')
const openApiValidator = require('express-openapi-validator')
const cors = require('cors')

const applyMiddleware = (app)=>{
    app.use([morgan('dev'),cors(),express.json()])

    app.use('/docs', swaggerUI.serve,swaggerUI.setup(swaggerDoc))

    // app.use(openApiValidator.middleware({
    //     apiSpec:'./swagger.yaml',
    //     validateRequests:true,
    //     validateResponses:true
    // }))
}

module.exports = applyMiddleware