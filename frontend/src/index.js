function main(){
    createUserForm()
}
function populateLeaderboard(){

    fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(users => appendUser(users))
        .catch(error => console.log(error))
}

function appendUser(users){
    const leaderboard = document.querySelector('.leaderboard')
    users.forEach(user => {
        let newItem = document.createElement('p')
        newItem.innerText = user
        leaderboard.append(newItem)
    })
    
}

populateLeaderboard()

function createUserForm() {
    const form = document.querySelector('form')

    form.addEventListener('submit', function (event) {
        event.preventDefault()

        const username = {
            username: event.target['username'].value
        }
        form.reset()

        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(username)
        }

        fetch('http://localhost:3000/users', reqObj)
            .then(resp => resp.json())
            .then(user => console.log(user))
            .catch(error => console.log(error))
    })
}