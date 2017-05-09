/* Name: Pong
   Author: Robin Goyal
   Last Modified: May 9, 2017
   Usage: Run sketch.js and two clients must connect to localhost
*/

// Canvas parameters
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;

// Circle object parameters
var circle = {
    x: CANVAS_WIDTH/2,
    y: CANVAS_HEIGHT/2,
    diameter: 20,
    xSpeed: 0, 
    ySpeed: 0
};

// User Paddle object parameters
var user_paddle = {
    x: 10,
    y: CANVAS_HEIGHT/2,
    width: 10, 
    height: 50,
    ySpeed: 3
};

// Opponent Paddle object parameters
var opponent_paddle = {
    x: CANVAS_WIDTH - 10,
    y: CANVAS_HEIGHT/2,
    width: 10, 
    height: 50,
    ySpeed: 3
}


// Setup canvas and ball speed
function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    circle.xSpeed = random(-3, 3);
    circle.ySpeed = random(-3, 3);
}

// Draw function
function draw() {
    
    // Create white background
    background(0);
    
    // Modular functions
    drawPaddle();
    movePaddle();
    drawBall();
    bounceBall();
    moveBall();

}


function movePaddle() {
    
    if ((user_paddle.y) > CANVAS_HEIGHT) {
        user_paddle.ySpeed = 0;
    }
    
    else {
        if (keyIsDown(DOWN_ARROW)) {
            user_paddle.y += user_paddle.ySpeed;
        }
    
        else if (keyIsDown(UP_ARROW)) {
            user_paddle.y -= user_paddle.ySpeed;
        }   
    }
    
    if (keyIsDown(87)) {
        opponent_paddle.y += opponent_paddle.ySpeed;
    }
    
    else if (keyIsDown(83)) {
        opponent_paddle.y -= opponent_paddle.ySpeed;
    }
    
}

function drawPaddle() {
    fill(255);
    rectMode(CENTER);
    
    // User paddle
    rect(user_paddle.x, user_paddle.y, user_paddle.width, user_paddle.height);
    
    // Opponent paddle
    rect(opponent_paddle.x, opponent_paddle.y, 
         opponent_paddle.width, opponent_paddle.height);
}

// COMPLETED
function drawBall() {
    fill(255);
    stroke('black');
    ellipse(circle.x, circle.y, circle.diameter, circle.diameter);
}

// COMPLETED
function moveBall() {
    circle.x += circle.xSpeed;
    circle.y += circle.ySpeed;
}

// Ball bounce
function bounceBall() {
    
    // Check for horizontal 
    if (circle.x < (user_paddle.x + user_paddle.width/2 + circle.diameter/2) || 
            circle.x > (opponent_paddle.x - opponent_paddle.width + 
            circle.diameter/2)) { 
        
        hitPaddle();
    }
    
    if (circle.y < (0 + circle.diameter/2) || 
            circle.y > (CANVAS_HEIGHT - circle.diameter/2)) {
        circle.ySpeed = -circle.ySpeed;
    }
    
}

function hitPaddle() {
    
    // Bounce ball if hit user paddle
    if (circle.y < (user_paddle.y + user_paddle.height/2) &&
            circle.y > (user_paddle.y - user_paddle.height/2)) {
        circle.xSpeed = -circle.xSpeed;
    }
    
    // Bounce ball if hit opponent paddle
    if (circle.y < (opponent_paddle.y + opponent_paddle.height/2) &&
            circle.y > (opponent_paddle.y - opponent_paddle.height/2)) {
        circle.xSpeed = -circle.xSpeed;
    }
}

