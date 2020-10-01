const leaderboard = document.querySelector('.leaderboard')
function main(){
    createUserForm()
    startButton.style.visibility = "hidden"
}
function populateLeaderboard(){

    fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(users => appendUser(users))
        .catch(error => console.log(error))
}

function appendUser(users){
    users.forEach(user => {
        let newItem = document.createElement('p')
        newItem.innerText = user
        leaderboard.append(newItem)
    })
    
}

populateLeaderboard()

function createUserForm() {
    const form = document.querySelector('form')

    form.addEventListener('submit', function(event) {
        event.preventDefault()
        let username = event.target['username'].value
        
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username})
        } 

        fetch('http://localhost:3000/users', reqObj)
            .then(resp => resp.json())
            .then(user => showUser(user))
            .catch(error => console.log(error))
        
        form.reset()
        form.style.visibility = "hidden"
        startButton.style.visibility = "visible"
        
        
        })
    
}

function showUser(user) {
    userDiv = document.createElement('div')
    userDiv.innerText = `Welcome, ${user.username}`
    document.querySelector(".info").append(userDiv)
}



main()
