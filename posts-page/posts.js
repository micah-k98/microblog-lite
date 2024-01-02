let authService;
let postService;
let servicesBase;
let usersService;

document.addEventListener("DOMContentLoaded",()=>{
    authService = new AuthService();
    postService = new PostService();
    usersService = new UsersService();
})


function displayPosts() {
    // clone template html instead of building the card by hand
    const card = postsTemplate.content.cloneNode(true)

    // set all values
    card.getElementById("post-name").innerText = 
    card.getElementById("post-content").innerText = 
   
    postsContainer.appendChild(card)
}