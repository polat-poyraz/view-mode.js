export default function viewMode(data) {
    const { name, layers, startFunctionName } = data
    const Content = {}

    function cssEnginer(values) {
        let cssCodes = ''

        for (const prop in values){
            cssCodes += `${prop}: ${values[prop]}; `
        }
        
        return cssCodes
    }

    Content[startFunctionName] = function() {
        setTimeout(() => {
            for (let index in layers) {
                const name = layers[index].name
                const css = layers[index].css
                
                document.querySelector(name).style = cssEnginer(css)
            }
        }, window.onload)
    }

    return Content
}