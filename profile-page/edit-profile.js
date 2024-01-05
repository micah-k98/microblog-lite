"use strict"

let authService, usersService;
let loginData, userData;
let profileIconColor, newUsername, newName, newBio, currentPassword, newPassword, updateButton, myModal;

document.addEventListener("DOMContentLoaded", ()=> {
    // Set variables
    authService = new AuthService();
    usersService = new UsersService();

    // Check if the use is currently logged in; if not, direct them to the index page
    const loggedIn = authService.isLoggedIn();
    if (loggedIn == false) {
        const myModal = bootstrap.Modal.getOrCreateInstance('#signInFirst');
        myModal.show();
    }
    

    profileIconColor = document.getElementById("profileIconColor");
    newUsername = document.getElementById("newUsername");
    newName = document.getElementById("newName");
    newBio = document.getElementById("newBio");
    currentPassword = document.getElementById("currentPassword");
    newPassword = document.getElementById("newPassword");

    updateButton = document.getElementById("updateButton");
    // myModal = bootstrap.Modal.getOrCreateInstance('#updatedMessage');

    // Register events
    updateButton.addEventListener("click", updateButtonClicked)
    profileIconColor.addEventListener("change", getIconColor)

    // Call these functions when the page loaded
    loadCurrentData();
})

async function loadCurrentData() {
    loginData = await authService.getLoginData();
    userData = await usersService.getCurrent(loginData);

    if (userData.icon == null || userData.icon == "") {
        profileIconColor.value = "blueWhite";
    }
    else profileIconColor.value = userData.icon;
    newUsername.value = userData.username;
    newName.value = userData.fullName;
    newBio.value = userData.bio;

    getIconColor();
}

async function updateButtonClicked(event) {
    event.preventDefault();

    if (newPassword.value == "") {
        alert("New password can't be blank.");
    }
    else {
        const newData = {
            username: newUsername.value,
            fullName: newName.value,
            bio: newBio.value,
            icon: profileIconColor.value,
            currentPassword: currentPassword.value,
            password: newPassword.value
        }
        
        const updated = await usersService.updateInfo(loginData, newData);
    
        if (updated.status >= 200 && updated.status < 300) {
            const userLogin = {
                "username": newData.username,
                "password": newData.password
            }
            await usersService.changeLoginData(userLogin);
    
            document.getElementById("forModal").innerHTML = `<div class="modal fade" id="updatedMessage" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
                                                                <div class="modal-dialog">
                                                                    <div class="modal-content">
                                                                        <div class="modal-header">
                                                                            <h1 class="modal-title fs-5">User info has been successfully updated!</h1>
                                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="closeMessage()"></button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>`
            myModal = bootstrap.Modal.getOrCreateInstance('#updatedMessage');
            myModal.show();
        }
        else {
            console.log(updated);
            alert("Please enter the correct password");
        }
    }
    
}

function getIconColor() {
    const selectedColor = profileIconColor.value;
    const icon = document.querySelector(".bi-person-circle");

    icon.setAttribute("id", selectedColor);
}

function closeMessage() {
    location.href = "profile.html";
}


// For logout
async function logoutButtonCliked() {
    await authService.logout();
    // localStorage.removeItem("login-data");
    // location.href = "/index.html"
}

// For modal sign-in message
function closeModal() {
    location.href = "/index.html";
}