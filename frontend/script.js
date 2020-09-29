
const dropper1 = document.querySelector(".dropper1")
const dropper2 = document.querySelector(".dropper2")
const catcher = document.querySelector(".catcher")
const points = document.querySelector(".points")

function dropperSpeed(){
    let speed
    let pointsData = parseInt(points.innerText.split(' ')[1])
    if (pointsData < 25){
        speed = 750
    } else if(pointsData >= 25 && pointsData < 50){
        speed = 500
    } else if(pointsData >= 50 && pointsData < 75){
        speed = 250
    } else {
        speed = 100
    }
    return speed
}

let timers = {}
let timerId2 

function setTimer(dropper, timerNum){
    clearInterval(timers[timerNum])
    // timers[timerNum] = setInterval(function(){dropCoin(dropper, timerNum)}, dropperSpeed())
}

setTimer(dropper1, "one")

setTimeout(function(){
    setTimer(dropper2, "two")
}, 5000)

dropper1.style.left = `${Math.floor(Math.random()* 450)}px`
dropper2.style.left = `${Math.floor(Math.random()* 450)}px`

function dropCoin(dropper, timerNum){
    let height = dropper.style.bottom.replace("px","")
    height = parseInt(height, 10)
    if (height > 24){ 
        dropper.style.bottom = `${height - 25}px`
    }
    else if (height === 24 && withinRange(dropper)) {
        clearInterval(timers[timerNum])
        dropper.style.left = `${Math.floor(Math.random()* 450)}px`
        dropper.style.bottom = "449px"
        let pointsData = parseInt(points.innerText.split(' ')[1]) + 5
        points.innerText = `Points: ${pointsData}`
        setTimer(dropper, timerNum)
    }
    else {
        dropper.parentNode.innerHTML = "GAME OVER!"
        clearInterval(timers["one"]) 
        clearInterval(timers["two"]) 
    }
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

  document.addEventListener('keydown', function(e) {
    if (e.key === "ArrowLeft") {
      moveCatcherLeft()  
    }
    else if (e.key === "ArrowRight") {
        moveCatcherRight()
    }
})

function withinRange(dropper){
    
    let catcherLeft = catcher.style.left.replace("px", "")
    catcherLeft = parseInt(catcherLeft, 10)
    let dropperLeft = dropper.style.left.replace("px", "")
    dropperLeft = parseInt(dropperLeft, 10)
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
