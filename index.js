let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.style.border = '2px solid black';

// load all images
let bg = new Image();
bg.src = './images/bg.png';

let fg = new Image();
fg.src = './images/fg.png';

let bird = new Image();
bird.src = './images/bird.png'

let pipeNorth = new Image();
pipeNorth.src = './images/pipeNorth.png'

let pipeSouth = new Image();
pipeSouth.src = './images/pipeSouth.png'

let intervalId = 0;
let isGameOver = false;

//our array of pipe co-ordinates
let pipes = [
    {x: 200, y:0},
    {x: 400, y:-100},
]

let birdX = 50, birdY = 50
let birdClick = false;
let score = 0

function pipeMovements(){
       //loop over our pipe co-ordinates to draw multiple pipes
       for (let i = 0; i< pipes.length;i++){
        ctx.drawImage(pipeNorth, pipes[i].x, pipes[i].y)
        ctx.drawImage(pipeSouth, pipes[i].x, pipes[i].y + pipeNorth.height + 100)
        pipes[i].x = pipes[i].x - 1

        //if pipes go beyond canvas left hand side, load them again
        if (pipes[i].x + pipeNorth.width < 0){
            pipes[i] = {
                x: 400,
                y: -(Math.floor(Math.random() * pipeNorth.height ))
            }
        }
        // check if pipe has crossed the bird
        if (pipes[i].x == 0) {
            score++
        }
        //check if the pipe collides with the bird
        // if () {
        //     isGameOver = true
        // }
    } 
}

function birdLogic(){
    // check if bird hits the floor
    if (birdY + bird.height > canvas.height - 90) {
        isGameOver = true
    }

    // bird movements
    if (birdClick) {
        birdY = birdY - 10
    }
    else {
        birdY = birdY + 2
    }
}

// basic animation template
function draw(){
    ctx.drawImage(bg, 0, 0)
    ctx.drawImage(bird, birdX, birdY)
    pipeMovements()
    birdLogic();
    ctx.drawImage(fg, 0, canvas.height - 90)

    ctx.fillStyle = 'white'
    ctx.font = '64px Verdana'
    ctx.fillText(score, canvas.width/2 - 20, 100)
    
    if (isGameOver) {
        cancelAnimationFrame(intervalId)

    }
    else {
        intervalId = requestAnimationFrame(draw)
    }
    
}

window.addEventListener('load', () => {
    draw()

    document.addEventListener('mousedown', () => {
        birdClick = true;
    })
    document.addEventListener('mouseup', () => {
        birdClick = false;
    })

})
