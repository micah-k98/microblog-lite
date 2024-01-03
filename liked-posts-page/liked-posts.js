"use strict"

let postService, likesService, authService;
let postTemplate, postsContainer, postSection;
let allPosts;

document.addEventListener("DOMContentLoaded", () => {
    // Set variables
    postService = new PostService();
    likesService = new LikesService();
    authService = new AuthService();

    postTemplate = document.getElementById("postTemplate");
    postsContainer = document.getElementById("postsContainer");

    const sortSelect = document.getElementById("sortSelect");

    // Register events
    sortSelect.addEventListener("change", getAllPosts);

    // Call these functions when the page loaded
    getAllPosts();
})

async function getAllPosts() {
    const userName = sessionStorage.username;
    allPosts = await postService.getAll();

    // Sorting
    sortPosts();

    postsContainer.innerText = "";
    let counter = 0;

    if (allPosts.length != 0) {
        allPosts.forEach(post => {
            post.likes.forEach(like => {
                if (like.username == sessionStorage.username) {
                    displayPosts(post);
                    counter++;
                }
            })
        });
    }
    
    if (allPosts.length == 0 || counter == 0) {
        document.getElementById("errorMessage").hidden = false;
    }    
}

function displayPosts(post) {
    let card = postTemplate.content.cloneNode(true);

    card.getElementById("userName").innerText = post.username;
    card.getElementById("timeStamp").innerText = getDate(post);
    card.getElementById("textPost").innerText = post.text;

    const likePostButton = card.getElementById("likePost");
    const likeId = isItLiked(post, likePostButton);

            likePostButton.addEventListener("click", async () => {
                // Call the api to like/unlike the post
                const liked = await likesService.unliked(likeId);

                // To reload all posts
                getAllPosts();
            })

    // To show the number of likes a post have
    if (post.likes.length != 0) card.getElementById("numOfLikes").innerText = post.likes.length;
    else card.getElementById("numOfLikes").innerText = "";

    postsContainer.appendChild(card);
}

// For the timestamp
function getDate(post) {
    const postDate = new Date(post.createdAt);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - postDate.getTime();
    const differenceInDays = (differenceInTime / (1000 * 3600 * 24));
    
    if (differenceInDays < 1) {
        const differenceInHours = (differenceInTime / (60*60*1000));

        if (differenceInHours < 1) return `${Math.floor(differenceInTime / (60*1000))}m ago`;
        else return `${Math.floor(differenceInTime / (60*60*1000))}h ago`;
    }
    else {
        return postDate.toLocaleDateString();
    }
}

// Will check if each post has been liked by the current logged-in user
function isItLiked(post, likePostButton) {
    let likeId;

    for (let i = 0; i < post.likes.length; i++) {
        if (post.likes[i].username == sessionStorage.username) {
            likePostButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/> </svg>`
                likeId = post.likes[i]._id;
                break;
        }
        else {
            likePostButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                </svg>`
        }
    }
    return likeId;
}

// For sorting
function sortPosts() {
    switch (sortSelect.value) {
        case "0":
        case "recent": // newest to oldest
            allPosts.sort((left, right) => {
                return new Date(right.createdAt) - new Date(left.createdAt)
            })
            break;
        case "user": // alphabetical order
            allPosts.sort((left, right) => {
                return left.username < right.username ? -1 : 1 
            })
            break;
        case "popularity": // most to least likes
            allPosts.sort((left, right) => {
                return right.likes.length - left.likes.length
            })
            break;
        default:
            break;
    }
}

// For logout
async function logoutButtonCliked() {
    await authService.logout();
    // sessionStorage.removeItem("username");
    // sessionStorage.removeItem("token");
    // location.href = "/index.html"
}