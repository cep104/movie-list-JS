document.addEventListener('DOMContentLoaded', () => {
    createListForm()
    fetchLists()
})
// defining base url and toggles **************

const BASE_URL = "http://localhost:3000"
let addList = false;
let editMovie = false;

// list functions **************

function fetchLists(){
    fetch(`${BASE_URL}/lists`)
    .then(resp => resp.json())
    .then(listData => {
        for (const list of listData){
            let l = new List(list)
            l.renderList();
        }
    })
   
}

function createListForm(){
    let listsForm = document.getElementById('lists-form')
    listsForm.innerHTML += 
    `
    <h2> Make a New List </h2>
    <form id="listForm">
    <label for="title">Title: </label><br>
    <input type="text" id="title"><br>
    <label for="description">Description: </label><br>
    <input  type="text" id="description"><br>
    <input type="submit" value="Create Movie List">
    </form>
    `
    listsForm.addEventListener('submit', listFormSubmission)
    let h2 = document.querySelector('h2')
    h2.addEventListener('click', listClick)
    
}

function listClick(){
    let listFormContainer = document.getElementById('listForm')

    addList = !addList;
              if (addList) {
                listFormContainer.style.display = "block";
              } else {
                listFormContainer.style.display = "none";
              }
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
    let l = new List(list)
    l.renderList()
    location.reload();
    
    
})
}

//  Movie functions **************

function fetchMovies(){
    fetch(`${BASE_URL}/movies`)
    .then(resp => resp.json())
    .then(movieData => {
        console.log(movieData)
        for (const movie of movieData){
            let m = new Movie(movie.id, movie.img_src, movie.title, movie.description, movie.rating, movie.list)
            m.renderMovie();
        }
    })
}

const renderMovie = (movie) => {
    const ul = document.querySelector(`div[data-id = '${movie.list_id}'] ol`)
    const li = document.createElement('li')
    const image = document.createElement('div')
    const button = document.createElement('button')
    const editButton = document.createElement('button')
    const editFormContainer = document.createElement('div')
    
    li.innerHTML = `
    <h3>${movie.title}</h3> 
    <p>Rating: ${movie.rating}/10 </p>
    <p>Description: ${movie.description}</p> `

    image.innerHTML = `<img class='movie-img' src=${movie.img_src}>`

    button.setAttribute('class', 'remove')
    button.setAttribute('data-movie-id', movie.id)
    editButton.setAttribute('data-movie-id', movie.id)
    editButton.setAttribute('class', 'editButton')

    button.innerHTML = 'Delete Movie'
    editButton.innerHTML = 'Edit Movie'
   
    
    editFormContainer.innerHTML = `
    <form id='editForm${movie.id}' class='edit-form' data-set=${movie.id}>
              <label for="title">Title: </label>
              <input type="text" id="title" ><br>
              <label for="description">Description: </label><br>
              <textarea name="description" rows="4" cols="20"></textarea><br>
              <label for="rating">Rating: </label>
              <input type="number" id="rating" placeholder="Scale of 1-10"><br>
              <label for="img_src">Image: </label>
              <input type="text" id="img_src" placeholder="Enter image URL"><br>
              <input type="submit" value="submit">
            </form>
    
    `
    li.appendChild(image)
    li.appendChild(button)
    li.appendChild(editButton)
    li.appendChild(editFormContainer)
    ul.appendChild(li)
    

    button.addEventListener('click', deleteMovie)
    editFormContainer.addEventListener('submit', editMovies)
    editButton.addEventListener('click', ()=>{
        let editFormContainer = document.getElementById(`editForm${movie.id}`)

    addList = !addList;
              if (addList) {
                editFormContainer.style.display = "block";
              } else {
                editFormContainer.style.display = "none";
              }
    })
    
    
 }
 

 const editMovies = (e) => {
    e.preventDefault()
    
    let title = e.target.title.value
    let description = e.target.description.value
    let rating = e.target.rating.value
    let img_src = e.target.img_src.value
    let listAttribute = e.target.parentElement.parentElement.parentElement
    let list_id = listAttribute.dataset.listId
   console.log(list_id)
    const configObj = {
        method:"PUT",
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
    fetch(`${BASE_URL}/movies/${e.target.dataset.set}`, configObj)
    .then(resp => resp.json())
    .then(json => {
    console.log(json)
    location.reload();
})
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
        document.getElementById("myForm").reset();
      }})
  }

  const deleteMovie = (e) => {
    e.preventDefault()
    let result = confirm(`Are you sure you want to delete the movie?`);
        if (result) {
            const configObj = {
                method:"DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
        
            }
            fetch(`${BASE_URL}/movies/${e.target.dataset.movieId}`, configObj)
                e.target.parentElement.remove()
    
    }
    
 }

 