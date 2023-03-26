const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
const gameContainer = document.getElementById('game-container');


let secondPassed = 0;
let oldPassed = 0;
let isEndGame = false;
let counted = false;

const birdImg = new Image();
const pipeImg = new Image();
const pipeImg2 = new Image();
birdImg.src = 'assets/yellowbird-downflap.png';
pipeImg.src = 'assets/pipe-red.png';
pipeImg2.src = 'assets/pipe-red-2.png';

//Game Constans
const FLAP_SPEED = -5;
const BIRD_WIDTH = 40;
const BIRD_HEIGHT = 30;
const PIPE_WIDTH = 50;
const PIPE_HEIGHT = 600;

//Bird variables
let birdX = 50;
let birdY = 50;
let birdVelocity = 0;
let birdAcceleration = 10;

//Pipe variables      
let pipeX = 400;
let pipeY = canvas.height - 200;
let pipeSpeed = 100;

//Score variables
let scoreDiv = document.getElementById('score-display');
let score = 0;

window.onload = init;

document.body.onkeyup = function(e) {
    if(e.code == 'Space') {
        birdVelocity = FLAP_SPEED;
    }
}

window.addEventListener("touchend", function (event) {
    birdVelocity = FLAP_SPEED;
});

function init() {
    requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp) {
    secondPassed = (timeStamp - oldPassed) / 1000;
    oldPassed = timeStamp;
    if(!isEndGame) {
        update(secondPassed);

        collisionCheckCanvas();
        collisionCheckPipe();  
        increaseScore();

        
        context.clearRect(0, 0, canvas.width, canvas.height);

        drawBird();
        drawPipe();

        requestAnimationFrame(gameLoop);
    }else {
        alert('Game Over');
        console.log('Game Over');
    }
}

function drawBird() {
    context.drawImage(birdImg, birdX, birdY, BIRD_WIDTH, BIRD_HEIGHT);
}

function drawPipe() {
    context.drawImage(pipeImg, pipeX, pipeY, PIPE_WIDTH, PIPE_HEIGHT);
    context.drawImage(pipeImg2, pipeX, pipeY - 750, PIPE_WIDTH, PIPE_HEIGHT);
}

function update(secondPassed) {
    birdVelocity += secondPassed * birdAcceleration;
    birdY += birdVelocity;

    pipeX -= secondPassed * pipeSpeed;      
    if(pipeX < -50) {
        pipeX = 400;
        pipeY = Math.random() * (500 - 100) + 100;
        counted = false;
    } 
}

function increaseScore() {
    if(!counted) {
        if(birdX > pipeX + PIPE_WIDTH){
            score++;
            counted = true;
            scoreDiv.innerHTML = score;
        } 
    } 
}

function collisionCheckCanvas() {
    if(birdY < 0) {
        birdY = 0;
    }
    if(birdY > canvas.height) {
        isEndGame = true;
    }
}

function collisionCheckPipe() {
    if(birdX + BIRD_WIDTH >= pipeX && birdX <= pipeX + PIPE_WIDTH && birdY + BIRD_HEIGHT > pipeY ||
        birdX + BIRD_WIDTH >= pipeX && birdX <= pipeX + PIPE_WIDTH && birdY < pipeY - 150||
            birdX + BIRD_WIDTH > pipeX && birdX < pipeX + PIPE_WIDTH && birdY > pipeY ||
                birdX + BIRD_WIDTH > pipeX && birdX < pipeX + PIPE_WIDTH && birdY < pipeY - 150) {
        isEndGame = true;
    }
}



