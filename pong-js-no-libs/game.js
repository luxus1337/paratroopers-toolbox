/**Sorry loekoe maar ik denk dat ik het helemaal verK heb. Screen is white zodra ik het spel laad. 
 * Ik heb mijn gedachte gang bij elk stuk code gezet, heb veel op internet gezocht maar kom dan hele andere dingen tegen dan dat ik daadwerkelijk wil/zoek.
 * Ik merk dat deze opdracht voor mij "moeilijk" is en weet ook niet of dat een slecht teken is. De dingen die ik in codecademy heb gezien en gedaan is compleet anders dan dit.
 * Hopelijk heb je een mooie vakantie gehad man, ik heb uren lopen kloten met deze game whahaha. Echt nachtmerries krijg ik ervan. 
 * 
 * Summary:
 * - Omdat ik het lastig vind graag uitleg op elke TODO: Maar geef aub de correcte code niet want ik wil het zelf oplossen.
 * - De boundary collisions vind ik lastig (goede uitleg nodig), zat zelf te denken om de keyboard event uit te schakelen als die bij de X as is. 
 * - Ball boundary uitleg.
 * 
 * http://blog.mailson.org/2013/02/simple-pong-game-using-html5-and-canvas/ Kijk deze pong ik snap wel redelijk hoe het werk allemaal. Maar om het zelf te typen is hele andere koek.
 * 
 * 
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
var ballSpeedX = -3;
var ballSpeedY = .25;
var ballSizeX = 1;
var ballSizeY = 1;
var ballColor = "#FFFFFF";
var ballPositionX = Math.round(gridSizeX * .5);
var ballPositionY = Math.round(gridSizeY * .5);

var batSpeedY = 10;
var batSizeX = 1;
var batSizeY = 5;
var batColor = "#FFFFFF";

var bat1PositionX = 3;
var bat1PositionY = Math.round((gridSizeY - batSizeY * .5) * .5);
var bat1movingUp = false
var bat1movingDown = false;
var bat2movingUp = false;
var bat2movingDown = false;

var bat2PositionX = gridSizeX - 3;
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
            ballSpeedX = ballSpeedX * -3;
        }
    }

    //@TODO: check for ball colission with player 2
        if (roundedBallPositionX === bat2PositionX) {
            if( roundedBallPositionY >= bat2PositionY &&
                roundedBallPositionY < bat2PositionY +batSizeY
            ) {
                ballSpeedX = ballSizeX *-3;
            }
    
        }

    //@TODO: check the ball for boundary colission
    // De ball hoeft alleen te weerkaatsen op de X as. Als die op de Y as zit heeft de player hem niet kunnen raken, aldus gewonnen.
        if (ballPositionX  === gridSizeX) {
             if(roundedBallPositionY === gridSizeX)     

               { 
                   ballSpeedX = ballSizeX *-3;
               }
        }
        
        
    // Ball goes behind player and basically scoars a point. Kan me niet voorstellen dat het zo hoort maar kan me niks anders bedenken :$
        if (ballPositionX && ballPositionY === gridSizeY) {
            console.log("You score a point, congratulations!");
        }


    //@TODO Check Bat1 & bat2 collision with boundary, lijkt mij meest logische om de keyboard event uit te zetten zodra je de X as hebt berijkt?
    // Ik heb geen idee of het zo moet hoor
        var cancelKeypress = true;
        cancelKeypress = e.key;
            document.addEventListener = "keydown", "keyup", function(e){
                if (gridSizeX === bat1PositionY && gridSizeX === bat2PositionY) {
                 return true;
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
        bat2PositionY = bat2PositionY + batSpeedY * deltatime;
    }
    

    drawGame();
    window.requestAnimationFrame(update);
}

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

 //DE GAME STOPT ERMEE ALS JE DE "2" INKLIKT. GEEN IDEE WAAROM. DE "8" DOET HET WEL
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
