// creating a variable to get myCanvas id from canvas tag in HTML
const canv = document.getElementById('myCanvas');

// getContext returns a drawing context on the canvas, rendering in '2d'
const render = canv.getContext('2d');

// creating variables for starting location of ball, also connection to x, y variables to ball arc
let x = canv.width/2;
let y = canv.height-30;

// creating variables for movement for ball
let mx = 1
let my = -1

// creating a variable for ball radius
let ballRadius = 4;

// creating variable for paddle paddleX starting locations for paddle
const paddleHeight = 5;
const paddleWidth = 60;
let paddleX = (canv.width-paddleWidth)/2;

// creating variables for left and right key presses, is false because key are not pressed in the beginning
let rightKey = false;
let leftKey = false;

// variables for bricks
let brickRow = 3;
let brickColumn = 5;
const brickWidth = 40;
const brickHeight = 5;
const brickPadding = 10;
let brickOffsetTop = 10;
let brickOffsetLeft = 30;


// creates a new empty array, '[]', in bricks at position column and row
let bricks = [];
for (let column = 0; column < brickColumn; column++) {
    bricks[column] = [];
    for (let row = 0; row < brickRow; row++) {
        bricks[column][row] = {x:0, y:0};
    }
}

// adding event listeners for key presses
document.addEventListener('keydown', keyDown, false);
document.addEventListener('keyup', keyUp, false);

// create function to draw circle
function drawBall() {
    render.beginPath();
    render.arc(x, y, ballRadius, 0, Math.PI*2);
    render.fillStyle = 'blue';
    render.fill();
    render.closePath();
}

// drawing the paddle
function drawPaddle() {
    render.beginPath();
    render.rect(paddleX, canv.height-paddleHeight, paddleWidth, paddleHeight);
    render.fillStyle = 'blue';
    render.fill();
    render.closePath;
    
}

// function for drawing bricks, loops through all the bricks in the array
function drawBricks() {
    // loops for creating bricks
    for (let column = 0; column < brickColumn; column++) {
        for (let row = 0; row < brickRow; row++) {
            // brickX sets row location, brickY sets column location
            let brickX = (column*(brickWidth + brickPadding)) + brickOffsetLeft;
            let brickY = (row*(brickHeight + brickPadding)) + brickOffsetTop;
            bricks[column][row].x = brickX;
            bricks[column][row].y = brickY;
            render.beginPath();
            render.rect(brickX, brickY, brickWidth, brickHeight);
            render.fillStyle = 'blue';
            render.fill();
            render.closePath();
        }
    }
}

function draw() {
    render.clearRect(0, 0, canv.width, canv.height);
    drawBricks();
    drawBall();
    drawPaddle();
    
    // hit detection on walls
    if (y + my < ballRadius) {
        my = -my;
    } 
    if ( x + mx > canv.width-ballRadius || x + mx < ballRadius) {
        mx = -mx;
    }
    // hit detection for paddle
    else if(y + my > canv.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            my = -my;
        }
        // created game over scenario
        else {
            alert('GAME OVER');
            document.location.reload();
            clearInterval(interval);
        }
    }
    
    // paddle speed and keeping paddle within width
    if (rightKey) {
        paddleX += 7;
        if (paddleX + paddleWidth > canv.width) {
            paddleX = canv.width - paddleWidth;
        }
    }
    else if(leftKey) {
        paddleX -= 7;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }
    // added variables to move circle
    x += mx;
    y += my;
}

// creating functions for key down and key up
function keyDown(k) {
    if (k.key == 'Right' || k.key == 'ArrowRight') {
        rightKey = true;
    }
    else if (k.key == 'Left' || k.key == 'ArrowLeft') {
        leftKey = true;
    }
}

function keyUp(k) {
    if (k.key == 'Right' || k.key == 'ArrowRight') {
        rightKey = false;
    }
    else if(k.key = 'Left' || k.key == 'ArrowLeft') {
        leftKey = false;
    }
}

// moving ball variable
let interval = setInterval(draw, 10);


// need to create bricks
// removing blocks on hit detection







