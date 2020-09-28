const dropper = document.querySelector(".dropper")
const dropperHeight = dropper.style.bottom 

function dropCoin(){
    let height = dropperHeight.replace("px","")
    height = parseInt(height, 10) - 25
    dropper.style.bottom = `${height}px`
}

function dropCoinCounter() {
    setInterval(dropCoin, 100)
}
dropCoinCounter()   