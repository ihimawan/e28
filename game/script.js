document.onkeydown = checkKey;

// ascii characters
let boundaryChar = 'x';
let spaceChar = '_';
let snakeChar = 'o';
let foodChar = 'o';
let enemyChar = 'o';

// default settings
let xSize = 50;
let ySize = 25;
let howManyLeftDefault = 30;
let minutesLeftDefault = 3;
let enemyLength = 10;

// constants
let up = 'up';
let down = 'down';
let left = 'left';
let right = 'right';
let boundaryClassName = 'boundary';
let spaceClassName = 'space';
let snakeClassName = 'snake'
let enemyClassName = 'enemy'
let foodClassName = 'food'
let snakeHappyClassName = 'snakeHappy'
let snakeSadClassName = 'snakeSad'

// game state
let boundaryOccupy = new Set(); // static value once board init is done
let points;
let snakeOccupy = [];
let foodLoc;
let generateMoreFood;
let directionQueue = [];
let currentDirection // up down left right
let enemyOccupy = [];

// timers
let interval;
let timerInterval;
let enemyInterval;
let enemyFactoryInterval;

function startGame() {

    snakeSays("oh my god thank you! I just need to get " + howManyLeftDefault + " units longer, then Sssasha will finally like me!", snakeHappyClassName);
    let score = document.getElementById("score");
    score.innerHTML = howManyLeftDefault;

    let minutes = document.getElementById('minutes');
    minutes.innerHTML = minutesLeftDefault;
    let seconds = document.getElementById('seconds');
    seconds.innerHTML = '0';

    let startBtn = document.getElementById("startBtn");
    startBtn.disabled = true;

    let stopBtn = document.getElementById("stopBtn");
    stopBtn.innerHTML = "This is awful.. you're just gonna get nowhere. Just give up."
    stopBtn.onclick = loseGame.bind(this, "Oh the betrayal!!! ;(");

    clearBoard();

    // initialize values
    initializeGame();
    playingGame();
    timerStart();
}

function snakeSays(text, className) {
    let snakeSays = document.getElementById('snakeSays');
    snakeSays.innerHTML = text;
    snakeSays.className = className || snakeHappyClassName;
}

function initializeGame() {
    points = howManyLeftDefault;
    // initial size is 3
    snakeOccupy = [
        JSON.stringify({ x: 1, y: 1 }),
        JSON.stringify({ x: 2, y: 1 }),
        JSON.stringify({ x: 3, y: 1 })
    ];
    directionQueue = [right];
    enemyOccupy = [];
    generateMoreFood = true;
    foodLoc = null;
}

function clearBoard() {

    let coordinatesToClear = snakeOccupy.concat(enemyOccupy);

    if (foodLoc !== null) {
        coordinatesToClear = coordinatesToClear.concat(JSON.stringify(foodLoc))
    }

    if (coordinatesToClear.length === 0) return;
    coordinatesToClear.forEach(strCoor => {
        let snakeCoor = JSON.parse(strCoor);
        let snakeNode = document.getElementById(snakeCoor.x + '-' + snakeCoor.y);
        snakeNode.innerHTML = spaceChar;
        snakeNode.className = spaceClassName;
    });

}

function generateFoodLoc() {
    do {
        let randomX = Math.floor(Math.random() * (xSize - 1)) + 1;
        let randomY = Math.floor(Math.random() * (ySize - 1)) + 1;
        foodLoc = {
            x: randomX,
            y: randomY
        }
    }
    while (boundaryOccupy.has(JSON.stringify(foodLoc))
    || snakeOccupy.includes(JSON.stringify(foodLoc))
        || enemyOccupy.includes(JSON.stringify(foodLoc)));
}

function youUgly() {
    let snakeSays = document.getElementById("snakeSays");
    snakeSays.innerHTML = "that's so mean.. i grew this face myself. my mom says i'm great, ok?!"
    snakeSays.className = "snakeSad";
}

function timerStart() {
    timerInterval = setInterval(() => {
        let seconds = document.getElementById('seconds');
        let secondsAmt = parseInt(seconds.innerHTML);

        if (secondsAmt > 0) {
            secondsAmt--;
            seconds.innerHTML = secondsAmt;
        } else {
            let minutes = document.getElementById('minutes');
            let minutesAmt = parseInt(minutes.innerHTML);
            if (minutesAmt > 0) {
                secondsAmt = 59;
                seconds.innerHTML = secondsAmt;
                minutesAmt--;
                minutes.innerHTML = minutesAmt;
            } else {
                loseGame('BBC went home with Sssasha!! I feel like such a fool T_T');
            }
        }
    }, 1000);
}

function activateEnemyFactory() {
    enemyFactoryInterval = setInterval(() => {
        let enemyProbability = [true, true, true, false];
        let dispatchEnemyBool = enemyProbability[Math.floor(Math.random() * enemyProbability.length)];
        if (dispatchEnemyBool) {
            let [minSpeed, maxSpeed] = [50, 100];
            let randomSpeed = Math.floor(Math.random() * maxSpeed) + minSpeed;
            dispatchEnemy(randomDirection, randomSpeed);
        }
    }, 1000);
}

function dispatchEnemy(speed) {
    // create enemy in same Y value as food
    if (enemyOccupy.length > 0) return; // do not want to disturb existing enemy

    let directions = [down, up, right, left];
    let enemyDirection = directions[Math.floor(Math.random() * directions.length)];

    enemyOccupy = [];

    let newLoc;
    if (enemyDirection === up) {
        newLoc = {
            x: foodLoc.x,
            y: ySize - 2
        }
    } else if (enemyDirection === down) {
        newLoc = {
            x: foodLoc.x,
            y: 1
        }
    } else if (enemyDirection === left) {
        newLoc = {
            x: xSize - 2,
            y: foodLoc.y
        }
    } else if (enemyDirection === right) {
        newLoc = {
            x: 1,
            y: foodLoc.y
        }
    }

    enemyOccupy.push(JSON.stringify(newLoc));

    let node = document.getElementById(newLoc.x + '-' + newLoc.y);
    if (snakeOccupy.includes(JSON.stringify(newLoc))) {
        node.innerHTML = snakeChar;
        node.className = snakeClassName;
    } else {
        node.innerHTML = spaceChar;
        node.className = spaceClassName;
    }

    enemyInterval = setInterval(function () {

        if (enemyOccupy.length === 0) {
            clearInterval(enemyInterval);
            enemyInterval = null;
            return;
        }

        let lastTailLocationBeforeShift = JSON.parse(enemyOccupy[0]);

        //increment head location based on current direction
        let currentHeadLocation = JSON.parse(enemyOccupy[enemyOccupy.length - 1]);
        let newHeadLocation;

        if (enemyDirection === up) {
            newHeadLocation = {
                x: currentHeadLocation.x,
                y: currentHeadLocation.y - 1
            }
        } else if (enemyDirection === down) {
            newHeadLocation = {
                x: currentHeadLocation.x,
                y: currentHeadLocation.y + 1
            }
        } else if (enemyDirection === left) {
            newHeadLocation = {
                x: currentHeadLocation.x - 1,
                y: currentHeadLocation.y
            }
        } else if (enemyDirection === right) {
            newHeadLocation = {
                x: currentHeadLocation.x + 1,
                y: currentHeadLocation.y
            }
        }

        // if enemy eat food
        if (JSON.stringify(newHeadLocation) === JSON.stringify(foodLoc)) {
            generateMoreFood = true;
        }

        // re render the head and the last tail on the DOM
        // check if newHeadLocation crashes with any boundaries, do not rerender head
        if (!boundaryOccupy.has(JSON.stringify(newHeadLocation))) {
            if (enemyOccupy.length >= enemyLength) {
                enemyOccupy.shift();
            }
            enemyOccupy.push(JSON.stringify(newHeadLocation));
            let headNode = document.getElementById(newHeadLocation.x + '-' + newHeadLocation.y);
            headNode.innerHTML = snakeChar;
            headNode.className = enemyClassName;
        } else {
            enemyOccupy.shift();
        }

        let tailNode = document.getElementById(lastTailLocationBeforeShift.x + '-' + lastTailLocationBeforeShift.y);
        if (snakeOccupy.includes(JSON.stringify(lastTailLocationBeforeShift))) {
            tailNode.innerHTML = snakeChar;
            tailNode.className = snakeClassName;
        } else {
            tailNode.innerHTML = spaceChar;
            tailNode.className = spaceClassName;
        }

        // generate food
        if (generateMoreFood) {
            generateFoodLoc();
            let foodNode = document.getElementById(foodLoc.x + '-' + foodLoc.y);
            foodNode.innerHTML = foodChar;
            foodNode.className = foodClassName;
            generateMoreFood = false;
        }
    }, speed || 10);
}

function playingGame() {
    interval = setInterval(function () {

        let lastTailLocationBeforeShift = JSON.parse(snakeOccupy[0]);

        //increment head location based on current direction
        let currentHeadLocation = JSON.parse(snakeOccupy[snakeOccupy.length - 1]);
        let newHeadLocation;

        if (directionQueue.length > 0) {
            currentDirection = directionQueue[0];
            directionQueue.shift();
        }

        if (currentDirection === up) {
            newHeadLocation = {
                x: currentHeadLocation.x,
                y: currentHeadLocation.y - 1
            }
        } else if (currentDirection === down) {
            newHeadLocation = {
                x: currentHeadLocation.x,
                y: currentHeadLocation.y + 1
            }
        } else if (currentDirection === left) {
            newHeadLocation = {
                x: currentHeadLocation.x - 1,
                y: currentHeadLocation.y
            }
        } else if (currentDirection === right) {
            newHeadLocation = {
                x: currentHeadLocation.x + 1,
                y: currentHeadLocation.y
            }
        }

        // check if newHeadLocation crashes with any boundaries/tail
        if (boundaryOccupy.has(JSON.stringify(newHeadLocation))) {
            loseGame('Oh no... how did I hit a wall???');
            return;
        } else if (enemyOccupy.includes(JSON.stringify(newHeadLocation))) {
            loseGame('BBC BEAT ME UP!!!! NOOOOO! ;(');
            return;
        }

        // if snake eat food
        if (JSON.stringify(newHeadLocation) === JSON.stringify(foodLoc)) {
            points--;
            let pointsNode = document.getElementById('score');
            pointsNode.innerHTML = points;
            generateMoreFood = true;

            evaluatePoints();

        } else {
            // if not eating food, keep length as is and shift location
            snakeOccupy.shift();
        }

        // re render the head and the last tail on the DOM
        let headNode = document.getElementById(newHeadLocation.x + '-' + newHeadLocation.y);
        let tailNode = document.getElementById(lastTailLocationBeforeShift.x + '-' + lastTailLocationBeforeShift.y);
        headNode.innerHTML = snakeChar;
        headNode.className = snakeClassName;

        if (enemyOccupy.includes(JSON.stringify(lastTailLocationBeforeShift))) {
            tailNode.className = enemyClassName;
        } else if (JSON.stringify(lastTailLocationBeforeShift) === JSON.stringify(newHeadLocation)) {
            tailNode.className = snakeClassName;
        } else {
            tailNode.innerHTML = spaceChar;
            tailNode.className = spaceClassName;
        }


        // check if eating yourself
        if (snakeOccupy.includes(JSON.stringify(newHeadLocation))) {
            loseGame('What! I\'m not trying to eat myself!! How did I think that i was food T_T');
            return;
        }

        // otherwise, continue with new head location
        snakeOccupy.push(JSON.stringify(newHeadLocation));

        // generate food
        if (generateMoreFood) {
            generateFoodLoc();
            let foodNode = document.getElementById(foodLoc.x + '-' + foodLoc.y);
            foodNode.innerHTML = foodChar;
            foodNode.className = foodClassName;
            generateMoreFood = false;
        }
    }, 100);

    function evaluatePoints() {
        switch (points) {
            case 29:
                snakeSays('Yassssss! first virgin blood... i can feel the energy now..');
                break;
            case 25:
                snakeSays('We\'re really geting the hang of this ;)');
                break;
            case 22:
                snakeSays('Fantassssstic! Almost a third way there.');
                break;
            case 20:
                snakeSays('Ahh... delicious');
                setTimeout(function () {
                    dispatchEnemy(100);
                    snakeSays('Holy sssnakes!!! What is BBC doing here???', snakeSadClassName);
                }, 1500);
                setTimeout(function () {
                    snakeSays('And why is he taking our virgin blood?!?!?!', snakeSadClassName);
                }, 5000);
                break;
            case 18:
                setTimeout(function () {
                    dispatchEnemy(100);
                    snakeSays('There it is again! What the heck???', snakeSadClassName);
                }, 1500);
                break;
            case 17:
                activateEnemyFactory();
                snakeSays('Oh my anaconda... It\'s so dark in this club it\'s so hard to see!!', snakeSadClassName);

                setTimeout(function () {
                    snakeSays('He must have noticed what we were trying to do... and he\'s trying to get ahead of us..');
                }, 5000);
                break;
            case 15:
                snakeSays('No matter... we just have to get virgin blood before BBC gets to them...');
            case 12:
                snakeSays('Get outta the way, BBC!!! SSSASHA IS MINE!!!');
                break;
            case 10:
                snakeSays('Only 10 more!!!');
                break;
            case 5:
                snakeSays('So close... so CLOSE!');
                break;
            case 1:
                snakeSays('LAST ONE LAST ONE!!');
                break;
            case 0:
                winGame();
                break;
            default:
                break;
        }
    }
}

function winGame() {
    snakeSays('OH MY GOD I DID IT, I DID IT!!!! ahem.. I mean WE did it.. you are a life saver..', snakeHappyClassName);
    document.getElementById(buttonInputs);
    const startBtn = document.getElementById('startBtn');
    startBtn.innerHTML = "<strong>YEAHHH. NOW LET'S SEDUCE SSSASHA WITH YOUR LOOOOONG BODY, HOA.</strong>";
    startBtn.onclick = window.open.bind(this, 'https://tinyurl.com/2fcpre6');
    startBtn.disabled = false;
    const stopBtn = document.getElementById('stopBtn');
    stopBtn.disabled = true;
    let intervalCollection = [interval, timerInterval, enemyInterval, enemyFactoryInterval];
    intervalCollection.forEach(intv => clearInterval(intv));

}

function loseGame(message) {
    snakeSays(message, snakeSadClassName);
    let startBtn = document.getElementById("startBtn");
    startBtn.innerHTML = "Stop being such a whiney baby. Let's just try again then."
    startBtn.disabled = false;
    let intervalCollection = [interval, timerInterval, enemyInterval, enemyFactoryInterval];
    intervalCollection.forEach(intv => clearInterval(intv));
}

function checkKey(e) {
    e = e || window.event;
    let direction = directionQueue.length > 1 ? directionQueue[directionQueue.length - 1] : currentDirection;
    if (e.keyCode == '38') {
        if (direction !== down) {
            directionQueue.push(up);
        }
    } else if (e.keyCode == '40') {
        if (direction !== up) {
            directionQueue.push(down);
        }
    } else if (e.keyCode == '37') {
        if (direction !== right) {
            directionQueue.push(left);
        }
    } else if (e.keyCode == '39') {
        if (direction !== left) {
            directionQueue.push(right);
        }
    }
}

(function () {
    initializeGame();

    // generate board
    for (let i = 0; i < ySize; i++) {
        let ulNode;
        if (i === 0 || i === ySize - 1) {
            // create upper/bottom boundary
            ulNode = document.createElement('ul');
            for (let j = 0; j < xSize; j++) {
                let liNode = appendLi(j, i, boundaryChar, boundaryClassName);
                ulNode.appendChild(liNode);
                // store where the boundary is at
                boundaryOccupy.add(JSON.stringify({ x: j, y: i }));
            }
        } else {
            // then create the body of the board
            ulNode = document.createElement('ul');
            for (let j = 0; j < xSize; j++) {
                let liNode;
                if ((j === 0 || j === xSize - 1)) {
                    liNode = appendLi(j, i, boundaryChar, boundaryClassName);
                    // this is a boundary
                    boundaryOccupy.add(JSON.stringify({ x: j, y: i }));
                } else {
                    liNode = appendLi(j, i, spaceChar, spaceClassName);
                }

                ulNode.appendChild(liNode);
            }
        }
        board.appendChild(ulNode);
    }

    // initialize snake 
    snakeOccupy.forEach(snakeStr => {
        let snakeLoc = JSON.parse(snakeStr);
        let snakeNode = document.getElementById(snakeLoc.x + '-' + snakeLoc.y);
        snakeNode.className = snakeClassName;
    })

    function appendLi(xCoor, yCoor, char, className) {
        let liNode = document.createElement('li');
        let textNode = document.createTextNode(char);
        liNode.appendChild(textNode);
        liNode.setAttribute('id', xCoor + '-' + yCoor);
        liNode.setAttribute('class', className);
        return liNode;
    }
})();