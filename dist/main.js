const renderer = new Renderer()
const manager = new ApiManager()

const cityObj = () => manager.cityData[manager.cityData.length - 1]

const conditionUpdateCheck = (el) => $(el).find(".condition").text()

const appendNewBackground = (url) => $("body").css("background-image", url);

const loadPage = async function () {
    await manager.getDataFromDB()
    renderer.renderData(manager.cityData, 'cities', true)
}

const handleSearch = async function () {
    const input = $("#cityNameInput").val()
    const check = await manager.getCityData(input)
    if(check) renderer.renderData([cityObj()], 'cities')
}

const citySave = async function (el) {
    const cityName = $(el).siblings(".name").text()
    manager.saveCity(cityName)
    $(el).parent()
            .append( `<button class="sdBtn" onclick=cityDelete(this)>
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
    $(el).siblings(".temperature").text(cityObj().temperature + '°')
    $(el).siblings(".condition").text(cityObj().condition)
    $(el).siblings(".icon").attr("src", cityObj().conditionPic)
}

const backgroundSwitch = function (el) {
    for (let key in condition) {
        if (key == conditionUpdateCheck(el)) {
            appendNewBackground(condition[key])
            break
        }
    }
}


