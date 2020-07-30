document.addEventListener('DOMContentLoaded', () => {
    
    createForm()
    fetchUsers()
    userDelete()
    
})

// read - fetch users index 
const BASE_URL = "http://localhost:3000"

function fetchUsers(){
    fetch(`${BASE_URL}/users`)
    .then(resp => resp.json())
    .then(userData => {
        for (const user of userData){
            let u = new User(user.id, user.name, user.username, user.email)
            u.renderUser();
        }
        // do something with the data we fetch
    })
}
// create - create a new user 
function createForm(){
    let usersForm = document.getElementById('users-form')

    usersForm.innerHTML += 
    `
    <form>
    <h2> User Form </h2>
    <label for="name">Name: </label>
    <input type="text" id="name"><br>
    <label for="username">Username: </label>
    <input type="text" id="username"><br>
    <label for="email">Email:</label>
    <input type="text" id="email"><br>
    <input type="submit" value="Create User">
    </form>
    `
    usersForm.addEventListener('submit', userFormSubmission)
}

function userFormSubmission(e){
    e.preventDefault()
    let name = document.getElementById('name').value
    let username = document.getElementById('username').value
    let email = document.getElementById('email').value
    let user = {
        name: name,
        username: username,
        email: email
    }
    fetch(`${BASE_URL}/users`,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
}) 
.then(response => response.json() )
.then(user => {
    let u = new User(user.id, user.name, user.username, user.email)
    u.renderUser()
})
}

function userDelete(){
   userDiv = document.getElementById('users-container')
    userDiv.addEventListener('click',(e)=>{
        if (e.target.className === "delete-btn"){
          fetch(`${BASE_URL}/users/${e.target.dataset.id}`, {
            method:'DELETE'
          })
          .then(response => {
            e.target.parentElement.remove()
          })
        }
      })
}
