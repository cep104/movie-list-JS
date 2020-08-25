document.addEventListener('DOMContentLoaded', () => {
    
    
    createListForm()
    fetchLists()
    
    
    
})

const BASE_URL = "http://localhost:3000"

function fetchLists(){
    fetch(`${BASE_URL}/lists`)
    .then(resp => resp.json())
    .then(listData => {
        console.log(listData)
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
    let description = document.getElementById('description').value || 'hahahaha'
    
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
    })
}



const renderMovie = (movie) => {
    const ul = document.querySelector(`div[data-id = '${movie.list_id}'] ol`)
    const li = document.createElement('li')
    const image = document.createElement('div')
    const button = document.createElement('button')
    
    li.innerHTML = `${movie.title} ${movie.rating} `
    image.innerHTML = `<img src=${movie.img_src}>`
    button.setAttribute('class', 'remove')
    button.setAttribute('data-movie-id', movie.id)
    button.innerHTML = 'x'

    

    li.appendChild(button)
    ul.appendChild(li)
    li.appendChild(image)

    button.addEventListener('click', deleteMovie)
    
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




