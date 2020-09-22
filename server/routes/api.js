const express = require('express')
const City = require('./model/City')
const axios = require('axios')
const router = express.Router()

router.get('/city/:cityName', function (req, res) {
    const { cityName } = req.params
    const { lat, lon } = req.query
    if(cityName === "noCity"){
         queryBy = `lat=${lat}&lon=${lon}`
    } else {
        queryBy = `q=${cityName}`
    }
    axios.get(`https://api.openweathermap.org/data/2.5/weather?${queryBy}&appid=${process.env.API_ID}`)
        .then(function (response) {
            const info = response.data
            const cityDetails = {
                name: info.name,
                temperature: Math.round(info.main.temp - 273),
                condition: info.weather[0].description,
                conditionPic: 'https://download.spinetix.com/content/widgets/icons/weather/' 
                + info.weather[0].icon + '.png'
            }
            res.send(cityDetails)
        })
        .catch(function (err) { res.send(err) })
})

router.get('/cities', function (req, res) {
    City.find({}).exec(function (err, cities) { res.send(cities) })
})

router.post('/city', function (req, res) {
    const city = new City(req.body)
    city.save()
        .then(function (city) { console.log(`${city.name}'s data has saved in DB`) })
    res.end()
})

router.delete('/city/:cityName', function (req, res) {
    const { cityName } = req.params
    City.deleteOne({ name: cityName })
        .then(results => res.end())
})

router.put('/city/:cityName', function (req, res) {
    const { cityName } = req.params
    city = new City(req.body)
    City.findOneAndUpdate({ "name": cityName },
        {
            "$set": {
                "temperature": city.temperature,
                "condition": city.condition,
                "conditionPic": city.conditionPic
            }
        }).exec(function (err, city) {
            if (err) {
                res.send(err)
            } else {
                res.send(city)
            }
        })
})

module.exports = router





