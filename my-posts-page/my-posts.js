"use strict"

let postService, likesService;
let postTemplate, postsContainer, postSection;

document.addEventListener("DOMContentLoaded", () => {
    // Set variables
    postService = new PostService();
    likesService = new LikesService();

    postTemplate = document.getElementById("postTemplate");
    postsContainer = document.getElementById("postsContainer");

    // Register events
    

    // Call these functions when the page loaded
    getAllPosts();
})

async function getAllPosts() {
    const userName = sessionStorage.username;
    const allPosts = await postService.getByUser(userName);

    // Will sort date from the most current to oldest post
    allPosts.sort((left, right) => {
        return new Date(right.createdAt) - new Date(left.createdAt)
    })

    postsContainer.innerText = "";

    if (allPosts.length != 0) {
        allPosts.forEach(post => {
            displayPosts(post);
        });
        document.getElementById("errorMessage").hidden = true;
    }
    else {
        document.getElementById("errorMessage").hidden = false;
    }    
}

function displayPosts(post) {
    let card = postTemplate.content.cloneNode(true);

    card.getElementById("userName").innerText = post.username;
    card.getElementById("timeStamp").innerText = getDate(post);
    card.getElementById("textPost").innerText = post.text;

    
    postsContainer.appendChild(card);
}

function closeMessage() {
    window.location.reload();
}

