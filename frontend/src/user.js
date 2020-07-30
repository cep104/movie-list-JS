class User{
    constructor(id, name, username, email){
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
    }

    renderUser(){
        let userDiv = document.getElementById('users-container')

        userDiv.innerHTML += 
        `
        <ul>
        <h3>Username: ${this.username}</h3>
        <li> Name: ${this.name} - Email: ${this.email}</li>
        </ul>
        <button class="delete-btn" data-id=${this.id}>Delete User</button>
        `
    }
    // instance method that renders object to dom
}