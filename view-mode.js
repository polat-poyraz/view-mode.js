function viewMode(data) {
    const { name, layers, startFunctionName, animation } = data
    const Content = {}

    function animationEnginer() {
        return `${animation.mode ? `${animation.time}` : null }`
    }

    Content[startFunctionName] = function() {
        setTimeout(() => {
            for (let index in layers) {
                const name = layers[index].name
                const css = layers[index].css
                const All = document.querySelectorAll(name)

                for (let i = 0; i < All.length; i++){
                    for (const prop in css) {
                        const key = prop
                        const cssValue = css[prop]
                        console.log(key, cssValue)

                        All[i].style[key] = cssValue
                        All[i].style.transition = animationEnginer()
                    }
                }
            }
        }, window.onload)
    }

    return Content
}