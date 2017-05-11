/* Name: Pong
   Author: Robin Goyal
   Last Modified: May 11, 2017
   Purpose: Pong game from scratch to learn about p5.js
   Usage: Run sketch.js and two clients must connect to localhost
   Notes: Occasionally buggy
*/

// Canvas parameters
var canvas;
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;

// Score variables;
var userScore = 0;
var opponentScore = 0;

// Object parameters for ball
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
    canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.position(250, 150);
    // Randomly choose ball speeds
    circle.xSpeed = random(-4, 4);
    circle.ySpeed = random(-2, 2);
}

// Draw function
function draw() {
    // Create white background
    background(0);
    
    // Call functions
    drawPaddle();
    movePaddle();
    showBall();
    bounceBall();
    console.log("Ball: " + (circle.y + circle.diameter/2) + "\nPaddle: " + opponent_paddle.y);
}

// NOT COMPLETED
function movePaddle() {
    
    if ((user_paddle.y) > (CANVAS_HEIGHT - user_paddle.height/2)) {
        user_paddle.ySpeed = 0;
    }
    
    if (keyIsDown(DOWN_ARROW)) {
        user_paddle.y += user_paddle.ySpeed;
    }

    else if (keyIsDown(UP_ARROW)) {
        user_paddle.y -= user_paddle.ySpeed;
    }   
    
    if (keyIsDown(87)) {
        opponent_paddle.y -= opponent_paddle.ySpeed;
    }
    
    else if (keyIsDown(83)) {
        opponent_paddle.y += opponent_paddle.ySpeed;
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
function showBall() {
    // Draw ball
    fill(255);
    stroke('black');
    ellipse(circle.x, circle.y, circle.diameter, circle.diameter);
    
    // Update ball location
    circle.x += circle.xSpeed;
    circle.y += circle.ySpeed;
}

// COMPLETED
function hitPaddle() {
    
    // Bounce ball if hit user paddle
    if ((circle.y - circle.diameter/2) < (user_paddle.y + user_paddle.height/2) &&
            (circle.y + circle.diameter/2) > (user_paddle.y - user_paddle.height/2)) {
        return true;
    }
    else {
        opponentScore += 1;
        return false
    }
    
    // Bounce ball if hit opponent paddle
    if ((circle.y - circle.diameter/2) < (opponent_paddle.y + opponent_paddle.height/2) &&
            (circle.y + circle.diameter/2) > (opponent_paddle.y - opponent_paddle.height/2)) {
        return true;
    }
    else {
        userScore += 1;
        return false;
    }
}

//
function bounceBall() {
    
    // Horizontal conditions
    if (circle.x < (user_paddle.x + user_paddle.width/2 + circle.diameter/2) || 
            circle.x > (opponent_paddle.x - opponent_paddle.width/2 -
            circle.diameter/2)) { 
        
        if (hitPaddle()) {
            circle.xSpeed = -circle.xSpeed;
        }
        else {
            pause();
        }

    }
    
    // Vertical conditions
    if (circle.y < (0 + circle.diameter/2) || 
            circle.y > (CANVAS_HEIGHT - circle.diameter/2)) {
        circle.ySpeed = -circle.ySpeed;
    }
    
}

function pause() {
    circle.x = CANVAS_WIDTH/2;
    circle.y = CANVAS_HEIGHT/2;
    circle.xSpeed = random(-4, 4);
    circle.ySpeed = random(-2, 2);
    redraw();
}


