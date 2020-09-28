const dropper = document.querySelector(".dropper")

function dropCoin(){
    let height = dropper.style.bottom.replace("px","");
    height = parseInt(height, 10);
    if (height > 70) {
        dropper.style.bottom = `${height - 25}px`
    } else {
        dropper.parentNode.innerHTML = "GAME OVER"
    }
}

function dropCoinCounter() {
    setInterval(dropCoin, 100)
}
dropCoinCounter()   