var config= require('./src/Config/config.json')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var port = config.apiPort

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())
app.use('/server',require('./src/APIs/mainAPI.js'))


 app.listen(port, function (err) {
        if (err) {
            console.error('err:', err)
        } else {
            console.info(`===> api server is running at localhost:8080`)
        }
})