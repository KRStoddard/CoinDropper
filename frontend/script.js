
const dropper = document.querySelector(".dropper")
const catcher = document.querySelector(".catcher")
const points = document.querySelector(".points")

let timerId = setInterval(dropCoin, 100)
dropper.style.left = `${Math.floor(Math.random()* 450)}px`

function dropCoin(){
    let height = dropper.style.bottom.replace("px","")
    height = parseInt(height, 10)
    if (height > 24){ 
        dropper.style.bottom = `${height - 25}px`
    }
    else if (height === 24 && withinRange()) {
        clearInterval(timerId)
        dropper.style.left = `${Math.floor(Math.random()* 450)}px`
        dropper.style.bottom = "449px"
        timerId = setInterval(dropCoin, 100)
        let pointsData = parseInt(points.innerText.split(' ')[1]) + 5
        points.innerText = `Points: ${pointsData}`
    }
    else {
        dropper.parentNode.innerHTML = "GAME OVER!"
        clearInterval(timerId) 
    }
}

function moveCatcherLeft() {
    var leftNumbers = catcher.style.left.replace('px', '');
    var left = parseInt(leftNumbers, 10)
    if (left > 0) {
      catcher.style.left = `${left - 25}px`
    }
}

function moveCatcherRight() {
    var leftNumbers = catcher.style.left.replace('px', '');
    var left = parseInt(leftNumbers, 10)
    if (left < 445) {
      catcher.style.left = `${left + 25}px`
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

function withinRange(){
    
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
    catcherLeftRange.forEach(num => {
        dropperLeftRange.forEach(number => {
            if (number === num) {
                result = true
            }
        })
    })
    return result 
    
}

dropCoin()