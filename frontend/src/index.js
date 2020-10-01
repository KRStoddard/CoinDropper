//global variables

const leaderboard = document.querySelector('.leaderboard')

//main executes functions that need triggering at start

function main(){
    createUserForm()
    populateLeaderboard()
    startButton.style.visibility = "hidden"
}

//populateLeaderboard returns information about top scoreres
//and triggers the function that info onto the dom in a leaderboard

function populateLeaderboard(){

    fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(users => appendUser(users))
        .catch(error => console.log(error))
}

//appendUser loads the the leader info onto the DOM

function appendUser(users){
    users.forEach(user => {
        let newItem = document.createElement('p')
        newItem.innerText = user
        leaderboard.append(newItem)
    })  
}

//createUserForm allows user to create a username or sign in
//it either pulls from or saves to database

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
        //once username is chosen the form resets
        //the form becomes invisible
        //and the start button appears
        form.reset()
        form.style.visibility = "hidden"
        startButton.style.visibility = "visible"
    })
    
}

//showUser will display the chosen username on the screen

function showUser(user) {
    userDiv = document.createElement('div')
    userDiv.innerText = `Welcome, ${user.username}`
    document.querySelector(".info").append(userDiv)
}

//executes starting functions

main()
