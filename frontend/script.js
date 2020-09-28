
const dropper = document.querySelector(".dropper")
const catcher = document.querySelector(".catcher")

let timerId = setInterval(dropCoin, 700)
dropper.style.left = `${Math.floor(Math.random()* 450)}px`

function dropCoin(){
    let height = dropper.style.bottom.replace("px","")
    height = parseInt(height, 10)
    if (height > 22 && catcher.style.left != dropper.style.left){ 
        height = height - 25
        dropper.style.bottom = `${height}px`
    }
    else if (height < 22){
        dropper.parentNode.innerHTML = "GAME OVER!"
        clearInterval(timerId) 
    }
    else if (height === 24 && withinRange()){
        clearInterval(timerId)
        dropper.style.left = `${Math.floor(Math.random()* 450)}px`
        dropper.style.bottom = "449px"
        timerId = setInterval(dropCoin, 700)
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

    catcherLeft <= dropperLeft + 7 && catcherLeft >= dropperLeft - 7
}

dropCoin()