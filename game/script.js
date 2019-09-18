document.onkeydown = checkKey;

// outputs
let board = document.getElementById('board');

// ascii characters
let boundaryChar = 'x';
let spaceChar = '_';
let snakeChar = 'o';
let foodChar = 'o';

// default settings
let xSize = 50;
let ySize = 25;
let howManyLeftDefault = 30;

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

// game state
let boundaryOccupy = new Set(); // static value once board init is done
let points;
let snakeOccupy = [];
let foodLoc;
let generateMoreFood;
let currentDirection; // up down left right


let interval;

function startGame() {
    clearBoard();

    // initialize values
    initializeGame();
    playingGame();
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
            loseGame('you hit wall');
            return;
        }

        // if snake eat food
        if (JSON.stringify(newHeadLocation) === JSON.stringify(foodLoc)) {
            points--;
            let pointsNode = document.getElementById('score');
            pointsNode.innerHTML = points;
            generateMoreFood = true;
        } else {
            snakeOccupy.shift();
            if ((snakeOccupy.length !== 1 && snakeOccupy.includes(JSON.stringify(newHeadLocation)))) {
                loseGame('you hurt yourself');
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
}

function loseGame(message) {
    alert('you lose because ' + message + ' now hoa the boa is heart broken :(');
    clearInterval(interval);
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

    boundaryOccupy.clear();

    initializeGame();

    // reset existing board
    board.innerHTML = '';

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

    function appendLi(xCoor, yCoor, char, className) {
        let liNode = document.createElement('li');
        let textNode = document.createTextNode(char);
        liNode.appendChild(textNode);
        liNode.setAttribute('id', xCoor + '-' + yCoor);
        liNode.setAttribute('class', className);
        return liNode;
    }
})();