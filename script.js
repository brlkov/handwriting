document.querySelector("#example-button").addEventListener('click', () => {
    if (document.querySelector("#example-input").value.length >= 10 && document.querySelector("#example-input").value.length <= 30) {
        document.querySelector(".example").style.display = "none"
        document.querySelector("#example-text").innerHTML = "Контрольная фраза: " + document.querySelector("#example-input").value
        document.querySelector(".text").style.display = "flex"

        listen();
        document.querySelector("#text-input").oninput = () =>  {
            if (document.querySelector("#text-input").value === document.querySelector("#example-input").value) {
                document.querySelector(".results").style.display = "flex"
                document.querySelector(".card").style.height = "115px"
        }}

        document.querySelector("#result-button").addEventListener('click', () => {
            document.querySelector("#canvas").style.display = "none"
            document.querySelector("#result").style.display = "flex"
            document.querySelector("body").style.height = "80vh"
            document.querySelector(".card").style.height = "200px"
            let str = `<table> <tr><td>KeyCode</td>${arr.map(el => `<td>${el.key}</td>`)}</tr> <tr><td>Delta</td>${arr.map(el => `<td>${el.delta}</td>`)}</tr> <tr><td>Between</td>${arr.map(el => `<td>${el.between}</td>`)}</tr> </table>`
            str = str.replace(/,/g, '')
            document.querySelector("#result").innerHTML = str
        })

        document.querySelector("#graphic-button").addEventListener('click', () => {
            let height = 320
            let width = 40
            arr.forEach(element => {
                width = width + element.between/5
            })
            if (width < 1000) width = 1000
            document.querySelector(".card").style.height = "440px"
            document.querySelector("body").style.height = "90vh"
            document.querySelector("#canvas").style.display = "flex"
            document.querySelector("#result").style.display = "none"

            let x = 10
            let y = height

            const canvas = document.querySelector("#canvas")
            canvas.height = height
            canvas.width = width

            const context = canvas.getContext("2d")
            context.moveTo(0,0)
            context.lineTo(0, height)
            context.lineTo(width, height)
            context.stroke()

            arr.forEach(element => {
                x = x + element.between/5
                y = y - 10
                context.moveTo(x,y)
                context.lineTo(x + element.delta/5, y)
                context.fillText(element.key, x, y - 5)
                context.stroke()
            })
        })

        document.querySelector("#again-button").addEventListener('click', () => {
            document.querySelector(".results").style.display = "none"
            document.querySelector("#canvas").style.display = "none"
            document.querySelector("#result").style.display = "none"
            document.querySelector("body").style.height = "80vh"
            document.querySelector(".card").style.height = ""
            document.querySelector("#text-input").value = ""
            arr = []
        })
    }
})


let arr = []
let keycodes = []

function handler(event) {
    switch(event.type) {
        case 'keydown':
            keycodes[event.keyCode] = arr.length;
            arr.push({
                id: arr.length,
                key: event.keyCode,
                timestart: (new Date()).getTime()
            })
            break;
        case 'keyup':
            const key = arr.find(element => element.id === keycodes[event.keyCode])
            const time = (new Date()).getTime()
            const delta = time - key.timestart
            let between = 0
            if (arr.length > 1 && key.id !== 0) {
                between = key.timestart - arr[key.id - 1].timestart
            }
            Object.assign(key, {delta: delta, between: between})
            delete keycodes[event.keyCode];
            console.log(arr);
            break;
        default:
            break;
    }
}

function listen() {
    window.addEventListener("keydown", handler);
    window.addEventListener("keyup", handler);
}
