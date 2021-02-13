export class View {
    constructor(themes, created, id) {
        this.themes = themes
        this.created = created
        this.tempate = document.querySelector(id)

        this.setView(this.created)
    }

    setView(name) {
        const theme = this.themes[name]

        if (theme === undefined) {
            console.error('err')
            return
        }

        for (const [name, value] of Object.entries(theme)) {
            this.tempate.querySelectorAll(name).forEach(element => {
                element.style = value  
            })
        }
    }
}