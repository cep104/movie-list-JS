document.addEventListener('DOMContentLoaded', () => {
    
    createForm()
    createListForm()
    fetchUsers()
    userDelete()
    fetchLists()
    
    
    
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

function fetchLists(){
    fetch(`${BASE_URL}/lists`)
    .then(resp => resp.json())
    .then(listData => {
        console.log(listData)
        for (const list of listData){
            let l = new List(list.id, list.title, list.description, list.user, list.movies)
            l.renderList();
        }
        // do something with the data we fetch
    })
   
}

function createListForm(){
    let listsForm = document.getElementById('lists-form')

    listsForm.innerHTML += 
    `
    <form>
    <h2> List Form </h2>
    <label for="title">Title: </label>
    <input type="text" id="title"><br>
    <label for="description">Description: </label>
    <input type="text" id="description"><br>
    <input type="submit" value="Create Movie List">
    </form>
    `
    listsForm.addEventListener('submit', listFormSubmission)
}

function listFormSubmission(e){
    e.preventDefault()
    let title = document.getElementById('title').value
    let description = document.getElementById('description').value
    
    let list = {
        title: title,
        description: description
    }

    fetch(`${BASE_URL}/lists`,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(list)
}) 
.then(response => response.json() )
.then(list => {
    let l = new List(list.id, list.title, list.description, list.movies)
    l.renderList()
})
}



function fetchMovies(){
    fetch(`${BASE_URL}/movies`)
    .then(resp => resp.json())
    .then(movieData => {
        console.log(movieData)
        for (const movie of movieData){
            let m = new Movie(movie.id, movie.img_src, movie.title, movie.description, movie.rating, movie.list)
            m.renderMovie();
        }
        // do something with the data we fetch
    })
}



const renderMovie = (movie) => {
    const ul = document.querySelector(`div[data-id = '${movie.list_id}'] ol`)
    const li = document.createElement('li')
    const image = document.createElement('div')
    const button = document.createElement('button')
    
    li.innerHTML = `${movie.title} ${movie.rating}`
    image.innerHTML = `<img src=${movie.img_src}>`
    // button.setAttribute('class', 'release')
    // button.setAttribute('data-movie-id', movie.id)
    // button.innerHTML = 'Release'

    

    // li.appendChild(button)
    ul.appendChild(li)
    ul.appendChild(image)
 }

const createMovie = (e) => {
    e.preventDefault()
    
    let title = e.target.title.value
    let description = e.target.description.value
    let rating = e.target.rating.value
    let img_src = e.target.img_src.value
    let listAttribute = e.target.parentElement.attributes[1].value
    let list_id = parseInt(listAttribute)
    console.log(title)
    const configObj = {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            img_src: img_src,
            title: title,
            description: description,
            rating: rating,
            list_id: list_id
        })
    }
    fetch(`${BASE_URL}/movies`, configObj)
    .then(resp => resp.json())
    .then(json => {
      if (json.message){
        alert(json.message)
      } else {
        renderMovie(json)
      }})
  }




