/**  Updated on 07-08-2017 and talked with lead develloper.
 * 
 * Summary of the conversation:
 * - Keep it simple and only do the @TODO listings.
 * - Updated the boundary collisions.
 * - Mode some changes in movement speeds
 * - Eventually in time we can make it more difficult and add in some more options.
 * 
 * ALL THE @TODO's are done with the collisions, in a simple way. Now it is time to move on to next task?
 * 
 * Whenever the @TODO's are done i would like to know how to add score. My idea is to have a (home page) basically clickable text (so i guess in the HTML page)
 * The idea is to have 3 options:
 * - Instructions (Controls and different game modes explained, (keep it simple))
 * - PVP MODE (just 1v1, first at 5 points wins)
 * - COOP MODE (Both build up same score longer game goes on)
 * - EXTREME MODE (Every 5 seconds another ball will come in the game).
 * 
 * ENDGAME DEVELOPPING SKILLS:
 * - Give both the players a different color, after 10 ball hits give them their color ball. (Need to work out this idea more but this will follow.)

*/



/**
 *  CONFIG
 */
//get our drawwable canvas
const canvasEl = document.getElementById('canvas');
const context = canvasEl.getContext('2d');

//set some globals
const height = canvasEl.height;
const width = canvasEl.width;

//x and y
const gridSizeX = 41;
const gridSizeY = 31;
const backgroundColor = "#000000";



/**
 * /CONFIG
 */

/**
 * GAME VARIABLES
 */

//speed is in units per second, a unit is a square on the playfield
var ballSpeedX = 5;
var ballSpeedY = 2;
var ballSizeX = 1;
var ballSizeY = 1;
var ballColor = "#FFFFFF";
var ballPositionX = Math.round(gridSizeX * .5);
var ballPositionY = Math.round(gridSizeY * .5);

var batSpeedY = 10;
var batSizeX = 1;
var batSizeY = 5;
var batColor = "#FFFFFF";

var bat1PositionX = 1;
var bat1PositionY = Math.round((gridSizeY - batSizeY * .5) * .5);
var bat1movingUp = false
var bat1movingDown = false;
var bat2movingUp = false;
var bat2movingDown = false;

var bat2PositionX = gridSizeX - 1;
var bat2PositionY = Math.round((gridSizeY - batSizeY * .5) * .5);

/**
 * /GAME VARIABLES
 */

/**
 * RENDER FUNCTIONS
 */

/**
 * Draw a rectangle at given positon and given size with given color
 * @param {number} xPos 
 * @param {number} yPos 
 * @param {number} xWidth 
 * @param {number} yWidth 
 * @param {string} color example and default: "#FFFFFF"
 */
function drawRectangle(xPos, yPos, width, height, color = "#FFFFFF") {
    context.fillStyle = color;
    context.fillRect(Math.round(xPos), Math.round(yPos), width, height);
}

function drawGame() {
    //draw the background
    drawRectangle(0,0,width,height, backgroundColor);

    //draw player 1
    drawRectangle(bat1PositionX, bat1PositionY, batSizeX, batSizeY, batColor);

    //draw player 2
    drawRectangle(bat2PositionX, bat2PositionY, batSizeX, batSizeY, batColor);

    //draw ball
    drawRectangle(ballPositionX, ballPositionY, ballSizeX, ballSizeY, ballColor);
}

/**
 * /RENDER FUNCTIONS
 */


/**
 * GAMELOOP
 */
var deltaTime = 0;
var lastTime = performance.now();
var now = performance.now();

//update is called every frame
function update() {
    //calculate the time difference with last frame
    now = performance.now();
    deltaTime = (now - lastTime) * .001;
    lastTime = now;

    //move ball
    ballPositionX = ballPositionX + ballSpeedX * deltaTime;
    ballPositionY = ballPositionY + ballSpeedY * deltaTime;

    var roundedBallPositionX = Math.round(ballPositionX);
    var roundedBallPositionY = Math.round(ballPositionY);

    //check for ball colission with player 1
    if(roundedBallPositionX === bat1PositionX) { //check horizontaly with player 1
        if(
            roundedBallPositionY >= bat1PositionY &&
            roundedBallPositionY < bat1PositionY + batSizeY
        ) {
            //ball collided with player what do?
            ballSpeedX = ballSpeedX * -1.1;
        }
    }

    //@TODO: check for ball colission with player 2
        if (roundedBallPositionX === bat2PositionX) {
            if( roundedBallPositionY >= bat2PositionY &&
                roundedBallPositionY < bat2PositionY +batSizeY
            ) {
                ballSpeedX = ballSpeedX *-1.1;
            }
    
        }

    //@TODO: check the ball for boundary colission
    // De ball hoeft alleen te weerkaatsen op de X as. Als die op de Y as zit heeft de player hem niet kunnen raken, aldus gewonnen.
 
    //Checks ball right side.
        if (roundedBallPositionX >= gridSizeX) { 
            console.log("Ball out of bounds, start again");
        }
        
    //Checks Left side
        if (roundedBallPositionX < 0) {
            console.log("Ball out of bounds, start again");
        }

    //Checks Top side, so a collision with boundary what has to result in a bounce.
        if (roundedBallPositionY < 0) {
            ballSpeedX *= -1.1;
        }
    //Checks Bot side, same as topside, collision with boundary.
        if (roundedBallPositionY >= gridSizeY) {
            ballSpeedX *= 1.1;
        }
    }
        
}
  


    //@TODO: listen for player 1 input
    //move player 1 up
    if(bat1movingUp) {
        bat1PositionY = bat1PositionY - batSpeedY * deltaTime;
    } else if (bat1movingDown) {
       bat1PositionY = bat1PositionY + batSpeedY * deltaTime; 
    }

    if(bat2movingUp) {
        bat2PositionY = bat2PositionY - batSpeedY * deltaTime;
    } else if (bat2movingDown) {
        bat2PositionY = bat2PositionY + batSpeedY * deltaTime;
    }
    

    drawGame();
    window.requestAnimationFrame(update);


window.requestAnimationFrame(update);
/**
 * /GAMELOOP
 */

/**
 * INPUT
 */
document.addEventListener('keydown', function(e){
    switch(e.key) {
        case "w":
            bat1movingUp = true;
            break;
        case "s":
            bat1movingDown = true;
            break;
    }
});

document.addEventListener('keyup', function(e){
    switch(e.key) {
        case "w":
            bat1movingUp = false;
            break;
        case "s":
            bat1movingDown = false;
            break;
    }
});
/**
 * /INPUT
 */

// I would like to know how to put in the Arrow keys (This must be done in a different way.) 

 
document.addEventListener('keydown', function(e){
    switch(e.key) {
        case "8":
            bat2movingUp = true;
            break;
        case "2":
            bat2movingDown = true;
            break;
    }
});

document.addEventListener('keyup', function(e){
    switch(e.key) {
        case "8":
            bat2movingUp = false;
            break;
        case "2":
            bat2movingDown = false;
            break;
    }
});
