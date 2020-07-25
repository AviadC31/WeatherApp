const express = require( 'express' )
const path = require( 'path' )
const bodyParser = require('body-parser')
const api = require( './server/routes/api' )
const app = express()
const mongoose = require('mongoose')
const Expense = require('./server/routes/model/City')

mongoose.set('useFindAndModify', false)
mongoose.connect("mongodb://localhost/WeatherApp")

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', api)

app.listen(3000, function () {
    console.log("Server up and running on port 3000")
  })
