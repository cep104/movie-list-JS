class List{
    constructor(id, title, description, user, movies){
        this.id = id;
        this.title = title;
        this.description = description;
        this.user = user;
        this.movies = movies;
        
        
    }

    renderList(){
        let listDiv = document.getElementById('list-container')
        const div = document.createElement('div')
        const h3 = document.createElement('h3')
        const ul = document.createElement('ul')
        const h5 = document.createElement('h5')
        const button = document.createElement('button')
        button.setAttribute('data-list-id', this.id)
        div.setAttribute('data-id', this.id)
        button.innerHTML = 'Add Movie'
        h3.innerHTML = `${this.title}`
        listDiv.appendChild(div)
        div.appendChild(h3)
        div.appendChild(h5)
        div.appendChild(ul)
        div.appendChild(button)
        button.addEventListener('click', function(){
            console.log('it works')
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