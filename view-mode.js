export default function viewMode(data) {
    function cssEnginer(values) {
        console.log(values)
        let cssCodes = []

        for (const prop in values.css){
            cssCodes.push(`${prop}: ${values.css[prop]};`)
        }
    }
}