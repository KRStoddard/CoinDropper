
const dropper1 = document.querySelector(".dropper1")
const dropper2 = document.querySelector(".dropper2")
let dropper3
const catcher = document.querySelector(".catcher")
const points = document.querySelector(".points")
const container = document.querySelector('.game-container')
const startButton = document.querySelector('#start-button')

function startGame(event){
    if (event.target.innerText === 'Start'){
        dropper1.style.bottom = "449px"
        dropper2.style.bottom = "449px"
        dropper2.style.visibility = "hidden"
      main()
        startButton.style.visibility = 'hidden'
    }
}

let timers = {}
dropper1.style.left = `${Math.floor(Math.random()* 450)}px`
dropper2.style.left = `${Math.floor(Math.random()* 450)}px`

function main() {
    setTimer(dropper1, "one")
    secondDropper(dropper2)
    keyListener()
}
function getSpeed(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
function dropperSpeed(){
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

function setTimer(dropper, timerNum){
    clearInterval(timers[timerNum])
    timers[timerNum] = setInterval(function(){dropCoin(dropper, timerNum)}, dropperSpeed())
}

function secondDropper() {
    setTimeout(function(){
        dropper2.style.visibility = ""
        setTimer(dropper2, "two")
    }, 7000)
}

function dropCoin(dropper, timerNum){
    let height = parseInt((dropper.style.bottom.replace("px","")), 10)
    if (height > 24){ 
        keepDropping(height, dropper)
    }
    else if (height === 24 && withinRange(dropper)) {
        if (dropper.style.background === "black") {
            gameOver(dropper)
        } else if (dropper.style.background === "green") {
            points.innerText = `Points: ${parseInt(points.innerText.split(' ')[1]) * 2 - 5}`
            continueGame(timerNum, dropper)
        } else {
            continueGame(timerNum, dropper) 
        }
    }
    else {
        if (dropper.style.background != "black") {
            gameOver(dropper)
        } else {
            continueGame(timerNum, dropper)
        }
    }
}

function keepDropping(height, dropper) {
    dropper.style.bottom = `${height - 25}px`
}

function addDropper() {
    dropper3 = document.createElement('div')
    dropper3.innerText = "$"
    dropper3.className = "dropper3"
    dropper3.style.bottom = "449px"
    dropper3.style.left = `${Math.floor(Math.random()* 450)}px`
    document.querySelector('.game-container').append(dropper3)
    setTimer(dropper3, "three")
}
function continueGame(timerNum, dropper) {
    clearInterval(timers[timerNum])
    dropper.style.left = `${Math.floor(Math.random()* 450)}px`
    dropper.style.bottom = "449px" 
    dropper.style.background = randomDropper()
    points.innerText = `Points: ${parseInt(points.innerText.split(' ')[1]) + 5}`
    setTimer(dropper, timerNum)
    if (parseInt(points.innerText.split(' ')[1]) > 300 && !dropper3) {
        addDropper()
    }
}

function gameOver(dropper) {
    alert("Game Over...You Suck!");
    startButton.style.visibility = 'visible'
    clearInterval(timers["one"]) 
    clearInterval(timers["two"]) 
    clearInterval(timers["three"])
}

function randomDropper() {
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

function keyListener() {
    document.addEventListener('keydown', function(e) {
        if (e.key === "ArrowLeft") {
            moveCatcherLeft()  
        }
        else if (e.key === "ArrowRight") {
            moveCatcherRight()
        }
    })
}
function moveCatcherLeft() {
    var leftNumbers = catcher.style.left.replace('px', '');
    var left = parseInt(leftNumbers, 10)
    if (left > 0) {
      catcher.style.left = `${left - 20}px`
    }
}

function moveCatcherRight() {
    var leftNumbers = catcher.style.left.replace('px', '');
    var left = parseInt(leftNumbers, 10)
    if (left < 440) {
      catcher.style.left = `${left + 20}px`
    }
}

function withinRange(dropper){
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
startButton.addEventListener('click', startGame);

