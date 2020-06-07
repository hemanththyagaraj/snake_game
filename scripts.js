const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
const boxSize = 30;
const canvaWidth = canvas.width
const canvasHeight = canvas.height
const columns = Math.floor(canvaWidth / boxSize)
const rows = Math.floor(canvasHeight / boxSize)
const snake = []
const fruit = {
    x: Math.floor(Math.random() * columns) * boxSize,
    y : Math.floor(Math.random() * rows) * boxSize
}
let direction = null

snake[0] = {
    x: 0,
    y: 9 * boxSize
}

const drawBoxes = () => {

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            ctx.fillStyle = (i + j) % 2 ? '#28cc59' : '#26b651'
            ctx.fillRect(j * boxSize, i * boxSize, boxSize, boxSize)
        }
    }
}

const reDrawFruit = () => {
    fruit.x = Math.floor(Math.random() * columns) * boxSize
    fruit.y = Math.floor(Math.random() * rows) * boxSize
}

const handleDirection = (event) => {
    const { keyCode } = event
    if (keyCode === 37) direction = 'LEFT'
    if (keyCode === 38) direction = 'UP'
    if (keyCode === 39) direction = 'RIGHT'
    if (keyCode === 40) direction = 'DOWN'
}

const consume = () => {
    if (snake[0].x === fruit.x && snake[0].y === fruit.y) {
        return true
    }
    return false
}

const detectWallCollision = (snake) => {
    if ((snake.x === canvaWidth || snake.x < 0  || snake.y < 0 || snake.y === canvasHeight) && direction) {
        clearInterval(interval)
    }
}

const selfBitten = () => {

}

const draw = () => {
    drawBoxes()
    ctx.fillStyle = 'red'
    ctx.fillRect(fruit.x, fruit.y, boxSize, boxSize)
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'white' : 'yellow'
        ctx.fillRect(snake[i].x, snake[i].y, boxSize, boxSize)
    }

    
    let snakeX = snake[0].x
    let snakeY = snake[0].y
    
    if (direction === 'LEFT') snakeX-= boxSize
    if (direction === 'RIGHT') snakeX+= boxSize
    if (direction === 'UP') snakeY-= boxSize
    if (direction === 'DOWN') snakeY+= boxSize

    const newHead = {
        x: snakeX,
        y: snakeY
    }
    
    if (consume()) {
        reDrawFruit()
    } else {
        snake.pop()
    }

    snake.unshift(newHead)
    detectWallCollision(snake[0])
}

drawBoxes()
draw()
document.addEventListener('keydown', handleDirection)
const interval = setInterval(draw, 100)