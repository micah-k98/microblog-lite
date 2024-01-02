let userService
let authService

document.addEventListener("DOMContentLoaded", () => {
    userService = new UsersService()
    authService = new AuthService()

    const signUpButton = document.getElementById("signUpButton")
    signUpButton.addEventListener("click", saveNewUser)

    const loginButton = document.getElementById("loginButton")
    loginButton.addEventListener("click", userLogin)

})

// This function saves the new user registered
async function saveNewUser(event)
{
    event.preventDefault()

    // save new user to the API
    // build a user object
    const username = document.getElementById("userNameRegister").value
    const fullName = document.getElementById("fullNameRegister").value
    const password = document.getElementById("passwordRegister").value

    const user = {
        "username": username,
        "fullName": fullName,
        "password": password
    }

    console.log(user);
    const newUser = await userService.addUser(user)
    console.log(newUser);
    
    // go back to the home page
    location.href = "/index.html"
}

// This function lets the user log in with their credentials
async function userLogin(event) {
    event.preventDefault()

    const username = document.getElementById("userNameLogin").value
    const password = document.getElementById("passwordLogin").value

    const userLogin = {
        "username": username,
        "password": password

    }

    await authService.login(userLogin)

}