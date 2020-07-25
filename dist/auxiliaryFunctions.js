const cityObj = () => manager.cityData[manager.cityData.length - 1]

const conditionUpdateCheck = (el) => $(el).find(".condition").text()

const appendNewBackground = (url) => $("body").css("background-image", url);

const render = (data, cities, bool) => renderer.renderData(data, cities, bool)

const firstCharToUpper = (input) => input.charAt(0).toUpperCase() + input.slice(1)

function displayUpdated(el){
    $(el).siblings(".temperature").text(cityObj().temperature + '°')
    $(el).siblings(".condition").text(cityObj().condition)
    $(el).siblings(".icon").attr("src", cityObj().conditionPic)
}

function getCoords() {
    navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        manager.getCityData("noCity", lat, lng)
    })
}

