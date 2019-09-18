document.onkeydown = checkKey;

// ascii characters
let boundaryChar = 'x';
let spaceChar = '_';
let snakeChar = 'o';
let foodChar = 'o';

// default settings
let xSize = 50;
let ySize = 25;
let howManyLeftDefault = 30;
let minutesLeftDefault = 3;

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
let currentDirection; // up down left right


let interval;
let timerInterval;

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
    snakeOccupy = [];
    // initial size is 3
    snakeOccupy.push(JSON.stringify({ x: 1, y: 1 }));
    snakeOccupy.push(JSON.stringify({ x: 2, y: 1 }));
    snakeOccupy.push(JSON.stringify({ x: 3, y: 1 }));
    currentDirection = right;
    generateMoreFood = true;
    foodLoc = null;
}

function clearBoard() {

    let coordinatesToClear = snakeOccupy;

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
        let randomX = Math.floor(Math.random() * xSize);
        let randomY = Math.floor(Math.random() * ySize);
        foodLoc = {
            x: randomX,
            y: randomY
        }
    }
    while (boundaryOccupy.has(JSON.stringify(foodLoc))
        || snakeOccupy.includes(JSON.stringify(foodLoc)));
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

function playingGame() {
    interval = setInterval(function () {
        // obtain last tail of snake
        let lastTailLocation = JSON.parse(snakeOccupy[0]);

        //increment head location based on current direction
        let currentHeadLocation = JSON.parse(snakeOccupy[snakeOccupy.length - 1]);
        let newHeadLocation;

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
        }

        // if snake eat food
        if (JSON.stringify(newHeadLocation) === JSON.stringify(foodLoc)) {
            points--;
            let pointsNode = document.getElementById('score');
            pointsNode.innerHTML = points;

            evaluatePoints();

            generateMoreFood = true;
        } else {
            snakeOccupy.shift();
            if ((snakeOccupy.length !== 1 && snakeOccupy.includes(JSON.stringify(newHeadLocation)))) {
                loseGame('What! I\'m not trying to eat myself!! How did I think that i was food T_T');
                return;
            }
        }

        // otherwise, continue with new head location
        snakeOccupy.push(JSON.stringify(newHeadLocation));

        // re render the head and the last tail on the DOM
        let headNode = document.getElementById(newHeadLocation.x + '-' + newHeadLocation.y);
        let tailNode = document.getElementById(lastTailLocation.x + '-' + lastTailLocation.y);
        headNode.innerHTML = snakeChar;
        headNode.className = snakeClassName;
        tailNode.innerHTML = spaceChar;
        tailNode.className = spaceClassName;

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
            case 0:
                winGame();
                break;
            default:
        }
    }
}

function winGame() {
    snakeSays('OH MY GOD I DID IT, I DID IT!!!! ahem.. I mean WE did it..', snakeHappyClassName);
    clearInterval(interval);
    clearInterval(timerInterval);
}

function loseGame(message) {
    snakeSays(message, snakeSadClassName);
    let startBtn = document.getElementById("startBtn");
    startBtn.innerHTML = "Stop being such a whiney baby. Let's just try again then."
    startBtn.disabled = false;
    clearInterval(interval);
    clearInterval(timerInterval);
}

function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
        if (currentDirection !== down) {
            currentDirection = up;
        }
    } else if (e.keyCode == '40') {
        if (currentDirection !== up) {
            currentDirection = down;
        }
    } else if (e.keyCode == '37') {
        if (currentDirection !== right) {
            currentDirection = left;
        }
    } else if (e.keyCode == '39') {
        if (currentDirection !== left) {
            currentDirection = right;
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