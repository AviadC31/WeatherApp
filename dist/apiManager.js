class ApiManager {

    constructor() {
        this.cityData = []
    }
    indexFinder = cityName => this.cityData.findIndex(c => c.name === cityName)

    saveCity = cityName => $.post(`/city`, this.cityData[this.indexFinder(cityName)]) 

    removeCity = cityName => this.ajaxReq(cityName, "DELETE") 

    refreshCity = cityName => this.ajaxReq(cityName, "PUT") 

    async getDataFromDB() {
        const cities = await $.get('/cities')
        this.cityData = [...cities]
    }

    async getCityData(input, lat, lng) {
        if (input === "noCity") {
            const currentLocation = await $.get(`/city/${input}?lat=${lat}&lon=${lng}`)
            console.log(currentLocation)
            localStorage.clear()
            localStorage.currentLocation = JSON.stringify(currentLocation)
        } else {
            const city = await $.get(`/city/${input}`)
            if (city.name !== 'Error') {
                this.cityData.push(city)
                return true
            }
        }
    }

    async ajaxReq(cityName, method) {
        const city = await $.ajax({
            url: `/city/${cityName}`,
            method: method,
            data: this.cityData[this.cityData.length - 1],
            success: function (response) {
                console.log(`${method} complete`)
            }
        })
        if (city.name !== 'Error') {
            this.cityData.splice(this.indexFinder(cityName), 1)
        }
    }
}