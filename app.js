const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#60EFF0', '#ff9393', '#f2ff3c', '#ffffff', '#470CF7', '#E00105', '#F7A60C', '#8AED0C', '#F0A273', '#F7390C', '#E00004', '#F70CAD', '#C20CED']

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

let time = 0

timeList.addEventListener('click', () => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

let score = 0

board.addEventListener('click', () => {
    if(event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`
    timeEl.parentNode.classList.add('hide')
}

function createRandomCircle(event) {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width-size)
    const y = getRandomNumber(0, height-size)
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.addEventListener('click', setColor)
    circle.style.background = setColor(circle)


    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max-min) + min)
}

function setColor(circle) {
    const color = getRandomColor()
    circle.style.background = color
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}