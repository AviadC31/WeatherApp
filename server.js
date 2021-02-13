const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const api = require('./server/routes/api')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const port = process.env.PORT || 6060

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/WeatherApp',
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true 
    }
)

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', api)

app.listen(port, () => console.log("Server up and running on port " + port))
