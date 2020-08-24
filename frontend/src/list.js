class List{
    constructor({ id, title, description, movies }){
        this.id = id;
        this.title = title;
        this.description = description || 'best movie ever';
        this.movies = movies;
        
        
    }

    renderList(){
        let addMovie = false;
        let listDiv = document.getElementById('list-container')
        const div = document.createElement('div')
        const h3 = document.createElement('h3')
        const ul = document.createElement('ol')
        const h5 = document.createElement('h5')
        const deleteBtn = document.createElement('button')
        const movieFormContainer = document.createElement('div')
        const button = document.createElement('button')
        deleteBtn.setAttribute('data-id', this.id)
        deleteBtn.setAttribute('class', 'delete-btn')
        div.setAttribute('class', 'lists-container')
        movieFormContainer.setAttribute('id', 'movieFormContainer')
        movieFormContainer.setAttribute('data_id', this.id)
        movieFormContainer.style.display = "none";
        button.setAttribute('data-list-id', this.id)
        ul.setAttribute('data-list-id', this.id)
        div.setAttribute('data-id', this.id)
        deleteBtn.innerHTML = 'Delete List'
        button.innerHTML = 'Add Movie'
        h3.innerHTML = `${this.title}`
        movieFormContainer.innerHTML = `
        <form>
        <label for="title">Title: </label>
        <input type="text" id="title" ><br>
        <label for="description">Description: </label>
        <input type="text" id="description"><br>
        <label for="rating">Rating: </label>
        <input type="number" id="rating" placeholder="Scale of 1-10"><br>
        <label for="img_src">Image: </label>
        <input type="file" id="img_src" placeholder="Enter image URL"><br>
        <input type="submit" value="submit">
        </form>
        `
        movieFormContainer.addEventListener('submit', createMovie)
        listDiv.appendChild(div)
        div.appendChild(h3)
        div.appendChild(h5)
        div.appendChild(ul)
        div.appendChild(button)
        div.appendChild(deleteBtn)
        div.appendChild(movieFormContainer)
        
       

        button.addEventListener('click', () => {
             addMovie = !addMovie;
            if (addMovie) {
                movieFormContainer.style.display = "block";
            } else {
                movieFormContainer.style.display = "none";
              }
        })

        
      deleteBtn.addEventListener('click', (e) => {
        console.log(e.target.dataset.id)
        fetch(`${BASE_URL}/lists/${e.target.dataset.id}`, {
          method:'DELETE'
        })
        .then(response => {
          e.target.parentElement.remove()
        })
      })
         
        
        this.movies.forEach(movie => renderMovie(movie))
        // this.movies.forEach(movie => {
        //     const li = document.createElement('li')
        //     ul.appendChild(li)
        //     li.innerHTML = `${movie.title}`
        //     console.log(movie.title)
        // })
        // let movieTime = this.movies.map(function (movie) {
        //     return movie.title
        //   });
        //   console.log(movieTime)
        // listDiv.innerHTML += 
        // `
        
        // <h3>${this.title}</h3>
        // <p> Description: ${this.description}</p>
        // <ul>
        // <li></li>
        // </ul>
        // <h5> Created By: ${this.user.username}</h5>
        // <button class="delete-btn" data-id=${this.id}>Delete List</button>
        // `
        
        
    }
     
}

/* <li>${this.movies[0].title}</li>
        <li>${this.movies[1].title}</li> */