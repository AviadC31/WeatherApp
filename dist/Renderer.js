class Renderer {
    renderData = function (data, obj, flag) {
        Handlebars.registerHelper('isExistInDB', () => flag)
        if (flag) $(`#${obj}Container`).empty() 
        const source = $(`#${obj}Template`).html()
        const template = Handlebars.compile(source)
        const dataHTML = template({ data })
        $(`#${obj}Container`).append(dataHTML)
    }
}
