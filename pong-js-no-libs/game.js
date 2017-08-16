//define config variables
var canvasEl,
    context,
    height,
    width,
    gridSizeX,
    gridSizeY,
    backgroundColor,
    score1Display,
    score2Display,
    cscoreDisplay,
    modeSelect,
    mode,
    ballSpeedX,
    ballSpeedY,
    maxBallSpeedX,
    minBallSpeedX,
    maxBallSpeedY,
    minBallSpeedY,
    ballSizeX,
    ballSizeY,
    ballColor,
    ballPositionX,
    ballPositionY,
    startBallPositionX,
    startBallPositionY,
    batSpeedY,
    batSizeX,
    batSizeY,
    batColor,
    bat1PositionX,
    bat1PositionY,
    bat1movingUp,
    bat1movingDown,
    bat2PositionX,
    bat2PositionY,
    bat2movingUp,
    bat2movingDown,
    score1,
    score2,
    coopscore;

/*
    //@TODO1:
    //Instead of ballSizeX, ballSizeY, ballColor, .. etc. you can use the "Ball" constructor function or "class" defined in ball.js.

    //Use it like so:
    var ball = new Ball();
    var bat1 = new Bat();
    var bat2 = new Bat();

    //To set a variable of ball do it like so:
    ball.position.x = 1;

    //Implement this method of working by removing variables above this green text, and resolving the undefined variables like bat1PositionX by using bat1.position.x;
*/

function setConfig() {
    //get our drawwable canvas
    canvasEl = document.getElementById('canvas');
    context = canvasEl.getContext('2d');

    //set some globals
    height = canvasEl.height;
    width = canvasEl.width;

    //x and y
    gridSizeX = 41;
    gridSizeY = 31;
    backgroundColor = "#000000";

    //get a reference to the html score element for both player 1 and 2

    score1 = new ScoreDisplay();
    score1.htmlElement = document.getElementById('score1-display');
    score2 = new ScoreDisplay();
    score2.htmlElement = document.getElementById('score2-display');
    coopScore = new ScoreDisplay();
    coopScore.htmlElement = document.getElementById("cscore-display");

    //get a reference to the html mode select element
    modeSelect = document.getElementById('mode-select');
    mode = modeSelect.options[modeSelect.selectedIndex].value;
    document.body.className = mode;
}

function setGameplayValues() {

    //@TODO: Implement the new Ball(), .. etc. logic

    //speed is in units per second, a unit is a square on the playfield
    ballSpeedX = 10;
    ballSpeedY = -5;
    
    // Numbers needed to make a random ballSpeed whenever a point is scored
    maxBallSpeedX = 12;
    minBallSpeedX = 6;
    maxBallSpeedY = 10;
    minBallSpeedY = 5;

    ballSizeX = 1;
    ballSizeY = 1;
    ballColor = "#FFFFFF";
    ballPositionX = Math.round(gridSizeX * .5);
    ballPositionY = Math.round(gridSizeY * .5);
    startBallPositionX = ballPositionX;
    startBallPositionY = ballPositionY;

    batSpeedY = 10;
    batSizeX = 1;
    batSizeY = 5;
    batColor = "#FFFFFF";

    //bat Player 1
    bat1PositionX = 1;
    bat1PositionY = Math.round((gridSizeY - batSizeY * .5) * .5);
    bat1movingUp = false
    bat1movingDown = false;
    
    //bat Player 2
    bat2PositionX = gridSizeX - 2;
    bat2PositionY = Math.round((gridSizeY - batSizeY * .5) * .5);
    bat2movingUp = false
    bat2movingDown = false;

}

function initialize() {
    //set config
    setConfig();

    //set gameplay values
    setGameplayValues();

    //start the update loop
    window.requestAnimationFrame(update);
}

//render functions
{
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
}

//gameloop
{
    var deltaTime = 0;
    var lastTime = performance.now();
    var now = performance.now();
    
    function resetBallAndPlayerSpeed() {
        batSpeedY = 10;
        ballPositionX = startBallPositionX;
        ballPositionY = startBallPositionY;
        var directionModifier = Math.random() > .5 ? 1 : -1;
        ballSpeedX = ( Math.round( Math.random() * ( maxBallSpeedX - minBallSpeedX )) + minBallSpeedX ) * directionModifier; // generate a random ballSpeedX  
        ballSpeedY = ( Math.round( Math.random() * ( maxBallSpeedY - minBallSpeedY )) + minBallSpeedY ) * directionModifier; // generate a random ballSpeedY
    }

    function bounceBallWithPlayer() {

        //@TODO2: make it so that where the ball hits the player matters for below modifier values.. 
        // so for example hitting a bit low would increase it's y value, but hitting it dead center
        // might make it go slower on the y...

        ballSpeedX = ballSpeedX * -1.1;
        batSpeedY = batSpeedY * 1.05; //added in batSpeed each time ball hits the bat.
    }

    //update is called every frame
    function update() {
       
        //calculate the time difference (deltaTime) with last frame
        now = performance.now();
        deltaTime = (now - lastTime) * .001;
        lastTime = now;
        coopscore.score++; // dit ook naar switch coop mode
        coopscore.updateScore(); // dit moet dus naar de switch COOP mode

        //for colission checking we will use a rounded ball position so we can check if a ball is matching an exact round number
        var roundedBallPositionX = Math.round(ballPositionX);
        var roundedBallPositionY = Math.round(ballPositionY);
        
        switch(mode) {
            case "PVP":
                //Check ball right side.
                if (roundedBallPositionX >= gridSizeX) {
                    score1.score++;
                    score1.updateScore();
                    resetBallAndPlayerSpeed();
                }
                
                //Check Left side
                if (roundedBallPositionX < 0) {
                    score2.score++;
                    score2.updateScore();
                    resetBallAndPlayerSpeed();
                }

            break;
            case "Coop":

                //Check ball right side.
                if (roundedBallPositionX >= gridSizeX) { 
                    coopScore.score = 0;
                    batSpeedY = 10;
                    ballPositionX = startBallPositionX;
                    ballPositionY = startBallPositionY;
                    ballSpeedX = Math.round( (Math.random() - 0.5) * 2 *  ( maxBallSpeedX - minBallSpeedX )) + maxBallSpeedX*.5; // generate a random ballSpeedX
                    if (ballSpeedX === 3) {
                        ballSpeedX =  maxBallSpeedX;
                    }
                    
    
                    ballSpeedY = Math.round( (Math.random() - 0.5) * 2 *  ( maxBallSpeedY - minBallSpeedY )) + maxBallSpeedY*.5; // generate a random ballSpeedY
                    if (ballSpeedY === 0) {
                        ballSpeedY = maxBallSpeedY;
                    }
                
                }
    
                //Check Left side
                if (roundedBallPositionX < 0) {
                    coopscore.score = 0; // coop switch? ...
                    batSpeedY = 10;
                }
            break;
        
            case "Extreme":
                    // Extreme mode mode komt hier, eerst wil ik weten hoe de PVP en coop functioneren.

                    // @TODO4: so now we have a "Ball" class, and we have a variable ball, ball = new Ball();
                    // But what if we made an array, like so var balls = [];
                    // and then do: ball.push(new Ball());
                    // and later in the game again: ball.push(new Ball());
                    // change the update loop so it can draw an array of balls
            break;
        }

        //Check Top side, so a collision with boundary what has to result in a bounce.
        if (roundedBallPositionY < 0) {
            ballSpeedY *= -1.01;
        }
        //Check Bot side, same as topside, collision with boundary.
        if (roundedBallPositionY >= gridSizeY) {
            ballSpeedY *= -1.01;
        }

        //move ball
        ballPositionX = ballPositionX + ballSpeedX * deltaTime;
        ballPositionY = ballPositionY + ballSpeedY * deltaTime;
       
        //player colissions
        //@TODO3: currently player collissions work on exactly hitting the players pixels.. but what if the speed is to high and we skip the bat entirely?
        // think about the difference between continues movement and dot moving an amount units every update loop.
        // HINT: it has something to do with the values of the last frame as well
        {
            //check for ball colission with player 1
            if(roundedBallPositionX === bat1PositionX) { //check if the ballposition is the same as the players x position
                if(
                roundedBallPositionY >= bat1PositionY && //the rounded ballPosition is greater or equal to the position of the bat
                roundedBallPositionY < bat1PositionY + batSizeY //the roudned ballPosition is smaller than the batPosition plus its size
                //if both statements are true we are connecting vertically with the bat
                ) {
                    bounceBallWithPlayer();

                    //fix ball position
                    ballPositionX = bat1PositionX + 1;
                }
            }
            
            //check for ball colission with player 2
            if (roundedBallPositionX === bat2PositionX) {
                if( roundedBallPositionY >= bat2PositionY &&
                roundedBallPositionY < bat2PositionY +batSizeY
                ) {
                    bounceBallWithPlayer();

                    //fix ball position
                    ballPositionX = bat2PositionX - 1;
                }
            }
        }
        
        //player movement
        {
            //player 1 movement  
            if(bat1movingUp && bat1PositionY > 0) {
                bat1PositionY = bat1PositionY - batSpeedY * deltaTime;
            } else if (bat1movingDown && bat1PositionY <= (gridSizeY - batSizeY)) {
                bat1PositionY = bat1PositionY + batSpeedY * deltaTime; 
            }
            
            //player 2 movement
            if(bat2movingUp && bat2PositionY > 0) {
                bat2PositionY = bat2PositionY - batSpeedY * deltaTime;
            } else if (bat2movingDown && bat2PositionY <= (gridSizeY - batSizeY)) {
                bat2PositionY = bat2PositionY + batSpeedY * deltaTime;
            }
        }
        
        //call the drawGame functions so that we actually draw the game after all variable changes inside the gameloop are done
        drawGame();
        
        //request an animation from the browser to start the next update loop
        window.requestAnimationFrame(update);
    }
}


//input handling
{
    //player 1 input
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
    
    //player 2 input   
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
}

//game starting
var startGameButton = document.getElementById('start-button');
startGameButton.addEventListener('click', initialize);
