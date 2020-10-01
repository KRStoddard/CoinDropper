//global variables

const leaderboard = document.querySelector('.leaderboard')
const form = document.querySelector('form')
const buttons = document.querySelector('.buttons')
const logoutButton = document.querySelector('#logout-button')
const infoDiv = document.querySelector('.info')
//main executes functions that need triggering at start

const main = () => {
    createUserForm()
    populateLeaderboard()
    createLogOutListener()
    buttons.style.visibility = "hidden"
}

//populateLeaderboard returns information about top scoreres
//and triggers the function that info onto the dom in a leaderboard

const populateLeaderboard = () => {

    fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(users => appendUser(users))
        .catch(error => console.log(error))
}

//appendUser loads the the leader info onto the DOM

const appendUser = (users) => {
    users.forEach(user => {
        let newItem = document.createElement('p')
        newItem.innerText = user
        leaderboard.append(newItem)
    })  
}

//createUserForm allows user to create a username or sign in
//it either pulls from or saves to database

const createLogOutListener = () => {
    logoutButton.addEventListener('click', logOut)
}

function logOut(event){
    infoDiv.children[3].innerText = ""
    form.style.visibility = "visible"
    buttons.style.visibility = "hidden"
}

const createUserForm = () => {
    
    
    form.addEventListener('submit', function(event) {
        event.preventDefault()
        let username = event.target['username'].value

        if (username.length === 0){
            alert("Username cannot be blank!")
        } else {
            const reqObj = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
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
            buttons.style.visibility = "visible"
        }
    })
}


//showUser will display the chosen username on the screen

const showUser = (user) => {
    userDiv = document.createElement('div')
    userDiv.innerText = `Welcome, ${user.username}`
    document.querySelector(".info").append(userDiv)
}

//executes starting functions

main()
