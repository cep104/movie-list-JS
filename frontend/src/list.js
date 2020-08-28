class List{
    constructor({ id, title, description, movies }){
        this.id = id;
        this.title = title;
        this.description = description;
        this.movies = movies;
    }

    renderList(){

        // creating/setting elements ***********

        let addMovie = false;
        const listDiv = document.getElementById('list-container')
        const div = document.createElement('div')
        const h3 = document.createElement('h3')
        const ul = document.createElement('ol')
        const deleteBtn = document.createElement('button')
        const movieFormContainer = document.createElement('div')
        const button = document.createElement('button')
        const p = document.createElement('p')

        // setting attributes ***********
          let addList = false
          deleteBtn.setAttribute('data-id', this.id)
          deleteBtn.setAttribute('class', 'delete-btn')
          div.setAttribute('class', 'lists-container')
          div.setAttribute('class', 'ind-list')
          movieFormContainer.setAttribute('id', 'movieFormContainer')
          movieFormContainer.setAttribute('data_id', this.id)
          movieFormContainer.style.display = "none";
          button.setAttribute('data-list-id', this.id)
          ul.setAttribute('data-list-id', this.id)
          div.setAttribute('data-id', this.id)
          h3.setAttribute('id', `list-title${this.id}`)
          h3.setAttribute('class', 'movie-title')
          

          // setting innerHTML ***********

          deleteBtn.innerHTML = 'Delete List'
          button.innerHTML = 'Add Movie'
          h3.innerHTML = `${this.title}`
          p.innerHTML = `${this.description}`
          movieFormContainer.innerHTML = `
            <form id='myForm'>
              <label for="title">Title: </label><br>
              <input type="text" id="title" ><br>
              <label for="description">Description: </label><br>
              <textarea name="description" rows="4" cols="20"></textarea><br>
              <label for="rating">Rating: </label><br>
              <input type="number" id="rating" placeholder="Scale of 1-10"><br>
              <label for="img_src">Image: </label><br>
              <input type="text" id="img_src" placeholder="Enter image URL"><br>
              <input type="submit" value="submit">
            </form>
        `

            // appending to document ***********

        listDiv.appendChild(div)
        div.appendChild(h3)
        div.appendChild(p)
        div.appendChild(ul)
        div.appendChild(button)
        div.appendChild(deleteBtn)
        div.appendChild(movieFormContainer)
        
            // adding event listeners ***********
        
        this.movies.forEach(movie => renderMovie(movie))  

        movieFormContainer.addEventListener('submit', createMovie)

        button.addEventListener('click', () => {
            addMovie = !addMovie;
              if (addMovie) {
                movieFormContainer.style.display = "block";
              } else {
                movieFormContainer.style.display = "none";
              }
        })

        h3.addEventListener('click', ()=>{
          addList = !addList;
              if (addList) {
                ul.style.display = "inline-block";
              } else {
                ul.style.display = "none";
              }
        })
        
        deleteBtn.addEventListener('click', (e) => {
          
          let result = confirm(`Want to delete The ${this.title}?`);
        if (result) {
          fetch(`${BASE_URL}/lists/${e.target.dataset.id}`, {
            method:'DELETE'
          })
          .then(response => {
            e.target.parentElement.remove()
          })
        }
        })
         
        
         
    }
     
}

