"use strict"

let authService, usersService, postService;
let userData;
let userFullName, userBio, newPost;

document.addEventListener("DOMContentLoaded", ()=> {
    // Set variables
    authService = new AuthService();
    usersService = new UsersService();
    postService = new PostService();

    userFullName = document.getElementById("userFullName");
    userBio = document.getElementById("userBio");
    newPost = document.getElementById("newPost");

    const postItButton = document.getElementById("postItButton");

    // Register events
    postItButton.addEventListener("click", saveNewPost);

    // Call these functions when the page loaded
    displayUserInfo();
})

// function getCurrentUserId() {
//     // The following is needed to get the query string of the current page
//     // It will then check if it has the word "username"
//     const urlParam = new URLSearchParams(location.search);
//     let username = -1;
//     if (urlParam.has("username") == true) {
//         username = urlParam.get("username");

//         displayUserInfo(username);
//     }
// }

async function displayUserInfo() {
    const userName = sessionStorage.username;
    userData = await usersService.getCurrent(userName);
    
    userFullName.innerText = userData.fullName;
    userBio.innerText = userData.bio;
}

async function saveNewPost() {
    const postInfo = {
        text: newPost.value
    }

    const posted = await postService.add(postInfo);

    // Direct it to my-posts page
    location.href = `/my-posts-page/my-posts.html?username=${userData.username}`
}