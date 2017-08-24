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
    batSpeedY,
    batSizeX,
    batSizeY,
    batColor,
    bat1,
    bat2,
    bat1movingUp,
    bat1movingDown,
    bat2movingUp,
    bat2movingDown,
    score1,
    score2,
    coopscore,
    ball;

/*
    //@TODO1:
    //Instead of ballSizeX, ballSizeY, ballColor, .. etc. you can use the "Ball" constructor function or "class" defined in ball.js.

    //Use it like so:
    var ball = new Ball();
    var bat1 = new Bat();
    var bat2 = new Bat();

    //To set a variable of ball do it like so:
    ball.position.x = 1;

    //Implement this method of working by removing variables above this green text, and resolving the undefined variables like bat1.position.x by using bat1.position.x;
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
    ball = new Ball();
    
  
    resetBall();
    resetBats(); 
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
        drawRectangle(bat1.position.x, bat1.position.y, bat1.size.x, bat1.size.y, bat1.color);
        
        //draw player 2
        drawRectangle(bat2.position.x, bat2.position.y, bat2.size.x, bat2.size.y, bat2.color);
        
        //draw ball
        drawRectangle(ball.position.x, ball.position.y, ball.size.x, ball.size.y, ball.color);
    }
}

//gameloop
{
    var deltaTime = 0;
    var lastTime = performance.now();
    var now = performance.now();
    
    function resetBallAndPlayerSpeed() {
         resetBats();
         resetBall();
        var directionModifier = Math.random() > .5 ? 1 : -1;
        ball.speed.x = ( Math.round( Math.random() * ( ball.maxballspeed.x - ball.minballspeed.x )) + ball.minballspeed.x ) * directionModifier; // generate a random ballSpeedX  
        ball.speed.y = ( Math.round( Math.random() * ( ball.maxballspeed.y - ball.minballspeed.y )) + ball.minballspeed.y ) * directionModifier; // generate a random ballSpeedY
    }

    function resetBats(){
        //bat Player 1
        bat1 = new Bat();
        bat1.position.x = 1;
        bat1.position.y = Math.round((gridSizeY - bat1.size.y * .5) * .5);
        console.log(bat1);
        bat1.movingUp = false
        bat1.movingDown = false;
        bat1.speed.y = 10;
        bat1.size.x = 1;
        bat1.size.y = 5;
        bat1.color = "#FFFFFF";
        
        //bat Player 2
        bat2 = new Bat();
        bat2.position.x = gridSizeX - 2;
        bat2.position.y = Math.round((gridSizeY - bat2.size.y * .5) * .5);
        bat2.movingUp = false
        bat2.movingDown = false;
        bat2.speed.y = 10;
        bat2.size.x = 1;
        bat2.size.y = 5;
        bat2.color = "#FFFFFF";

    }

    function resetBall(){
        ball.speed.x = 10;
        ball.speed.y = -5;
        // Numbers needed to make a random ballSpeed whenever a point is scored
        ball.maxballspeed.x = 12;
        ball.minballspeed.x = 6;
        ball.minballspeed.y = 10;
        ball.minballspeed.y = 5;
    
        ball.size.x = 1;
        ball.size.y = 1;
        ball.color = "#FFFFFF";
        ball.position.x = Math.round(gridSizeX * .5);
        ball.position.y = Math.round(gridSizeY * .5);
        ball.startPosition.x = ball.position.x;
        ball.startPosition.y = ball.position.y;
    
    }

    function bounceBallWithPlayer() {

        //@TODO2: make it so that where the ball hits the player matters for below modifier values.. 
        // so for example hitting a bit low would increase it's y value, but hitting it dead center
        // might make it go slower on the y...

        ball.speed.x = ball.speed.x * -1.1;
        bat.speed.y = bat.speed.y * 1.05; //added in batSpeed each time ball hits the bat.
    }

    //update is called every frame
    function update() {
       
        //calculate the time difference (deltaTime) with last frame
        now = performance.now();
        deltaTime = (now - lastTime) * .001;
        lastTime = now;
        //for colission checking we will use a rounded ball position so we can check if a ball is matching an exact round number
        var roundedBallPositionX = Math.round(ball.position.x);
        var roundedBallPositionY = Math.round(ball.position.y);

        function bounceBallWithPlayer(){
            //check for ball colission with player 1
            if(roundedBallPositionX === bat1.position.x) { //check if the ballposition is the same as the players x position
            if(
                    roundedBallPositionY >= bat1.position.y && //the rounded ballPosition is greater or equal to the position of the bat
                    roundedBallPositionY < bat1.position.y + batSizeY //the roudned ballPosition is smaller than the batPosition plus its size
                    //if both statements are true we are connecting vertically with the bat
                    ) {
                        //fix ball position
                        ball.position.x = bat1.position.x + 1;
                    }
                }
                
                //check for ball colission with player 2
                if (roundedBallPositionX === bat2.position.x) {
                    if( roundedBallPositionY >= bat2.position.y &&
                    roundedBallPositionY < bat2.position.y +batSizeY
                    ) {
                        //fix ball position
                        ball.position.x = bat2.position.x - 1;
                    }
                }
            }
        
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

                //check top side
                if (roundedBallPositionY < 0) {
                    ball.speed.y *= -1.01;
                }

                //Check Bot side, same as topside, collision with boundary.
                if (roundedBallPositionY >= gridSizeY) {
                    ball.speed.y *= -1.01;
                }

                //CHECK THE PLAYER COLLISION
                bounceBallWithPlayer();
                

            break;
            case "Coop":

                //Check ball right side.
                if (roundedBallPositionX >= gridSizeX) { 
                    coopScore.score = 0;
                    resetBallAndPlayerSpeed();
                   }
    
                //Check Left side
                if (roundedBallPositionX < 0) {
                   coopScore.score = 0;
                   resetBallAndPlayerSpeed();
                }
                //check top side
                if (roundedBallPositionY < 0) {
                    ball.speed.y *= -1.01;
                }
                //Check Bot side, same as topside, collision with boundary.
                if (roundedBallPositionY >= gridSizeY) {
                    ball.speed.y *= -1.01;
                }
                //Check the player collision
                bounceBallWithPlayer();


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
            ball.speed.y *= -1.01;
        }
        //Check Bot side, same as topside, collision with boundary.
        if (roundedBallPositionY >= gridSizeY) {
            ball.speedY *= -1.01;
        }

        //move ball
        ball.position.x = ball.position.x + ball.speed.x * deltaTime;
        ball.position.y = ball.position.y + ball.speed.y * deltaTime;
       
        //player colissions
        //@TODO3: currently player collissions work on exactly hitting the players pixels.. but what if the speed is to high and we skip the bat entirely?
        // think about the difference between continues movement and dot moving an amount units every update loop.
        // HINT: it has something to do with the values of the last frame as well
        
            

        
        //player movement
        {
            //player 1 movement  
            if(bat1movingUp && bat1.position.y > 0) {
                bat1.position.y = bat1.position.y - batSpeedY * deltaTime;
            } else if (bat1movingDown && bat1.position.y <= (gridSizeY - batSizeY)) {
                bat1.position.y = bat1.position.y + batSpeedY * deltaTime; 
            }
            
            //player 2 movement
            if(bat2movingUp && bat2.position.y > 0) {
                bat2.position.y = bat2.position.y - batSpeedY * deltaTime;
            } else if (bat2movingDown && bat2.position.y <= (gridSizeY - batSizeY)) {
                bat2.position.y = bat2.position.y + batSpeedY * deltaTime;
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
            case "w":
            bat1movingUp = false;
            break;
            case "s":
            bat1movingDown = false;
            break;
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
