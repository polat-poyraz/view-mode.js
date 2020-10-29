export default function viewMode(data) {
    const { name, layers, startFunctionName, animation } = data
    const Content = {}

    function cssEnginer(values) {
        let cssCodes = ''
        
        function caseMutation(item){
            let result = ''

            for (let i in item) {
                if (item[i] === item[i].toUpperCase())
                    result += `-${item[i].toLowerCase()}`
                else
                    result += item[i]
            }

            return result
        }

        for (const prop in values){
            cssCodes += `${caseMutation(prop)}: ${values[prop]}; `
        }
        
        return cssCodes
    }

    function animationEnginer() {
        return `${animation.mode ? `transition: ${animation.time};` : null }`
    }

    Content[startFunctionName] = function() {
        setTimeout(() => {
            for (let index in layers) {
                const name = layers[index].name
                const css = layers[index].css
                const All = document.querySelectorAll(name)

                for (let i = 0; i < All.length; i++){
                    All[i].style = `${animationEnginer()} ${cssEnginer(css)}`
                }
            }
        }, window.onload)
    }

    return Content
}