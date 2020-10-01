
//global variables

const dropper1 = document.querySelector(".dropper1")
const dropper2 = document.querySelector(".dropper2")
let dropper3
const catcher = document.querySelector(".catcher")
const points = document.querySelector(".points")
const container = document.querySelector('.game-container')
const startButton = document.querySelector('#start-button')
const livesDiv = document.querySelector(".lives")
let gameId 
let timers = {}

//these assign random starting point for droppers

const dropperStartPoint = (dropper) => {
    dropper.style.left = `${Math.floor(Math.random()* 450)}px`
}

//listen for arrow keys to move catcher and startbutton to start the game
//listed here because it only needs to be declared once
//if put inside startGame then the effect builds on itself

const keyListener = () => {
    startButton.addEventListener('click', startGame);
    document.addEventListener('keydown', function(e) {
        if (e.key === "ArrowLeft") {
            moveCatcherLeft()  
        }
        else if (e.key === "ArrowRight") {
            moveCatcherRight()
        }
    })
}

keyListener()

//startGame is triggered when start button is pressed
//this function resets the game and starts the timers for droppers
//it triggers function to save a game instance to the database
//it also gets rid of the start button so it can't be pressed while game is running

function startGame(event){
    createGame() 
    livesDiv.innerText = `Lives: 3`
    points.innerText = `Points: 0`
    dropper1.style.bottom = "449px"
    dropper2.style.bottom = "449px"
    dropper2.style.visibility = "hidden"
    beginGame()
    startButton.style.visibility = 'hidden'
}

//createGame funtion creates a game with the foreign key linking the signed in user
//it saves this game instance to the database

const createGame = () => {
    let infoDiv = document.querySelector('.info')
    let userName = infoDiv.children[3].innerText.split(", ")[1]
    const reqObj = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"user": userName})
    }
    fetch('http://localhost:3000/games', reqObj)
    .then(resp => resp.json())
    .then(resp => {gameId = resp.id})
}

//beginGame starts the timers for droppers

const beginGame = () => {
    dropperStartPoint(dropper1)
    setTimer(dropper1, "one")
    dropperStartPoint(dropper2)
    secondDropper(dropper2)
}

//setTimer is the abstracted dynamic timer for the movement speed of droppers
//it utilizes the helper method dropperSpeed to determine what the speed should be

const setTimer = (dropper, timerNum) => {
    clearInterval(timers[timerNum])
    timers[timerNum] = setInterval(() => {dropCoin(dropper, timerNum)}, dropperSpeed())
}

//this causes a delay in the first instance of the second dropper to begin
//keeps the droppers from falling too closely together at the beginning of the game

const secondDropper = () => {
    setTimeout(() => {
        dropper2.style.visibility = ""
        setTimer(dropper2, "two")
    }, 7000)
}

//getSpeed creates a method produce a randomized number within a range

const getSpeed = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

//dropperSpeed is used to determine the range of how fast a dropper can move
//it is based on how many points have been earned to add difficulty throughout time

const dropperSpeed = () => {
    let speed
    let pointsData = parseInt(points.innerText.split(' ')[1])
    if (pointsData < 20){
        speed = 700
    } else if(pointsData >= 20 && pointsData < 50){
        speed = getSpeed(500, 700)
    } else if(pointsData >= 50 && pointsData < 75){
        speed = getSpeed(300, 700)
    } else {
        speed = getSpeed(200, 700)
    }
    return speed
}

//loseLife is a method that subtracts one from existing lives and returns result

const loseLife = () => {
    let lives = parseInt(livesDiv.innerText.split(' ')[1])
    lives = lives - 1
    livesDiv.innerText = `Lives: ${lives}`
    return lives
}

//dropCoin determines whether a dropper needs to keep dropping, has been caught, or was missed

const dropCoin = (dropper, timerNum) => {
    let height = parseInt((dropper.style.bottom.replace("px","")), 10)
    //if the height is above the catcher location, the dropper keeps going without consequence
    if (height > 24){ 
        keepDropping(height, dropper)
    }
    //if the height is at the catcher and the catcher is underneath it needs to respond to the catch
    else if (height === 24 && withinRange(dropper)) {
        //if the dropper is black you lose a life if you catch it
        if (dropper.style.background === "black") {
            let lives = loseLife()
            //lives being less than one causes a gameOver
            if (lives < 1) {
                gameOver(dropper)
            } else {
                //if the player catches a black coin but has at least one life left the game continues
                continueGame(timerNum, dropper)
            }
            //if the catcher is green it doubles points
        } else if (dropper.style.background === "green") {
            //but you only need to double points if points are above zero
            if ((parseInt(points.innerText.split(' ')[1]) > 0)){
            points.innerText = `Points: ${parseInt(points.innerText.split(' ')[1]) * 2 - 5}`
            }
            //then you continue the game
            continueGame(timerNum, dropper)
        } else {
            //if the dropper is a regular coin you get five points and the game continues
            points.innerText = `Points: ${parseInt(points.innerText.split(' ')[1]) + 5}`
            continueGame(timerNum, dropper) 
        }
    }
    else {
        //you only lose a life for missing a coin if it is a regular coin
        if (dropper.style.background != "black" && dropper.style.background != "green") {
            let lives = loseLife()
            //if lives is less than one it causes a gameOver
            if (lives < 1 ) {
                gameOver(dropper)
                //otherwise the game continues
            } else {
                continueGame(timerNum, dropper)
            }
            //if the dropper is green or black the game continues as normal if missed
        } else {
            continueGame(timerNum, dropper)
        }
    }
}

//keepDropping moves the dropper down by 25 pixels

const keepDropping = (height, dropper) => {
    dropper.style.bottom = `${height - 25}px`
}

//addDropper adds a third dropper

const addDropper = () => {
    setTimeout(() => {
    dropper3 = document.createElement('div')
    dropper3.className = "dropper3"
    dropper3.style.bottom = "449px"
    dropperStartPoint(dropper3)
    document.querySelector('.game-container').append(dropper3)
    setTimer(dropper3, "three")},
    2000)
}

//continue game clears the dropper's setInterval and resets it
//to drop again from the top of the gamescreen

const continueGame = (timerNum, dropper) => {
    clearInterval(timers[timerNum])
    dropperStartPoint(dropper)
    dropper.style.bottom = "449px" 
    dropper.style.background = randomDropper()
    setTimer(dropper, timerNum)
    //if you have reached 300 points, it will add a third dropper if it doesn't already exist
    if (parseInt(points.innerText.split(' ')[1]) > 300 && !dropper3) {
        addDropper()
    }
}

//gameOver triggers an update to the database with point earns
//it alerts you that you lost
//and then it resets the game

const gameOver = (dropper) => {
    updateGame()
    alert("Game Over...You Suck!");
    startButton.style.visibility = "visible"
    clearInterval(timers["one"]) 
    clearInterval(timers["two"]) 
    clearInterval(timers["three"])
    game = ""
    leaderboard.innerHTML = "<h3>Leaderboard</h3>"
    populateLeaderboard()
}

//updateGame is what updates the database with the points

const updateGame = () => {
    const totalPoints = parseInt(points.innerText.split(' ')[1])
    const reqObj = {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"points": totalPoints})
    }
    fetch(`http://localhost:3000/games/${gameId}`, reqObj)
}

//randomDropper determines whether a dropper will be regular, green, or black

const randomDropper = () => {
    let randomColor = Math.random()
    if (randomColor < .25) {
        return "black"
    }
    else if (randomColor > .25 && randomColor < .4) {
        return "green"
    }
    else {
        return "linear-gradient(45deg,  rgb(201, 179, 15) 0%,rgba(255,255,255,1) 56%,rgb(211, 174, 10) 96%)"
    }
}

//moveCatcher functions move the catcher left or right based on keypresses

const moveCatcherLeft = () => {
    var leftNumbers = catcher.style.left.replace('px', '');
    var left = parseInt(leftNumbers, 10)
    if (left > 0) {
      catcher.style.left = `${left - 20}px`
    }
}

const moveCatcherRight = () => {
    var leftNumbers = catcher.style.left.replace('px', '');
    var left = parseInt(leftNumbers, 10)
    if (left < 440) {
      catcher.style.left = `${left + 20}px`
    }
}

//withinRange determines if a dropper is relatively centered on top of catcher
//used to determine if the dropper was caught successfully

const withinRange = (dropper) => {
    let catcherLeft = parseInt((catcher.style.left.replace("px", "")), 10)
    let dropperLeft = parseInt((dropper.style.left.replace("px", "")), 10)
    let result
    let catcherLeftRange = []
    let dropperLeftRange = []
    for(let i = 0; i<61; i++) {
        catcherLeftRange.push(catcherLeft + i)
    }
    for (let i = 0; i < 51; i++) {
        dropperLeftRange.push(dropperLeft + i)
    }
    catcherLeftRange.slice(20, 40).forEach(num => {
        dropperLeftRange.forEach(number => {
            if (number === num) {
                result = true
            }
        })
    })
    return result
}


