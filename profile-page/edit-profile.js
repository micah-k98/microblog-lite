"use strict"

let authService, usersService;
let userName, userData;
let newUsername, newName, newBio, newPassword, updateButton, myModal;

document.addEventListener("DOMContentLoaded", ()=> {
    // Set variables
    authService = new AuthService();
    usersService = new UsersService();

    newUsername = document.getElementById("newUsername");
    newName = document.getElementById("newName");
    newBio = document.getElementById("newBio");
    newPassword = document.getElementById("newPassword");

    updateButton = document.getElementById("updateButton");
    myModal = bootstrap.Modal.getOrCreateInstance('#updatedMessage');

    // Register events
    updateButton.addEventListener("click", updateButtonClicked)

    // Call these functions when the page loaded
    loadCurrentData();
})

async function loadCurrentData() {
    userName = sessionStorage.username;
    userData = await usersService.getCurrent(userName);

    newUsername.value = userData.username;
    newName.value = userData.fullName;
    newBio.value = userData.bio;
}

async function updateButtonClicked(event) {
    event.preventDefault();

    const newData = {
        username: newUsername.value,
        fullName: newName.value,
        bio: newBio.value,
        password: newPassword.value
    }
    
    const updated = await usersService.updateInfo(userName, newData);

    if (updated.status >= 200 && updated.status < 300) {
        myModal.show();
    }
}

function closeMessage() {
    location.href = "profile.html";
}


// For logout
async function logoutButtonCliked() {
    await authService.logout();
    // sessionStorage.removeItem("username");
    // sessionStorage.removeItem("token");
    // location.href = "/index.html"
}