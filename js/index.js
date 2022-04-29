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
let ballRadius = 5;

// creating variable for paddle paddleX starting locations for paddle
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canv.width-paddleWidth)/2;

// creating variables for left and right key presses, is false because key are not pressed in the beginning
let rightKey = false;
let leftKey = false;

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

function drawPaddle() {
    render.beginPath();
    render.rect(paddleX, canv.height-paddleHeight, paddleWidth, paddleHeight);
    render.fillStyle = 'blue';
    render.fill();
    render.closePath;
   
}

function draw() {
    render.clearRect(0, 0, canv.width, canv.height);
    drawBall();
    drawPaddle();
    // hit detection on walls
    if (y + my > canv.height-ballRadius || y + my < ballRadius) {
        my = -my;
    }
    if ( x + mx > canv.width-ballRadius || x + mx < ballRadius) {
        mx = -mx;
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

setInterval(draw, 10);

// need to cread bottom paddle
// need to create bricks
// need to create movement for bottom paddle
// removing blocks on hit detection







