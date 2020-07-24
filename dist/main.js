const renderer = new Renderer()
const manager = new ApiManager()

const loadPage = async function () {
    getCoords()
    await manager.getDataFromDB()
    manager.cityData.unshift(JSON.parse(localStorage.currentLocation))
    render(manager.cityData, 'cities', true)
}

const handleSearch = async function () {
    const input = $("#cityNameInput").val()
    const found = manager.cityData.find(c => c.name === firstCharToUpper(input))
    if (found == undefined) {
        const check = await manager.getCityData(input)
        if (check) render([cityObj()], 'cities')
    } else alert("this city is already displayed")
}

const citySave = async function (el) {
    const cityName = $(el).siblings(".name").text()
    manager.saveCity(cityName)
    $(el).parent()
        .append(`<button class="sdBtn" onclick=cityDelete(this)>
                        <img class="delIcon" src="https://flyclipart.com/thumb2/delete-icon-327000.png">
                      </button>`)
    $(el).remove()
}

const cityDelete = async function (el) {
    const cityName = $(el).siblings(".name").text()
    await manager.removeCity(cityName)
    $(el).parent().remove()
}

const updateCity = async function (el) {
    const cityName = $(el).siblings(".name").text()
    await manager.getCityData(cityName)
    manager.refreshCity(cityName)
    displayUpdated(el)
}

const backgroundSwitch = function (el) {
    for (let key in condition) {
        if (key == conditionUpdateCheck(el)) {
            appendNewBackground(condition[key])
            break
        }
    }
}


