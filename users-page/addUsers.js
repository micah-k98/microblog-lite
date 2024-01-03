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

async function saveNewUser(event) {
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

    try {
        // Attempt to log in
        await authService.login(userLogin);
        // If successful, you can redirect or perform other actions
        console.log("Login successful");
    } catch (error) {
        // Handle authentication errors
        console.error("Login failed:", error.message);

        // Display a message to the user indicating that the login failed
        alert("Incorrect username or password. Please try again.");

        // Optionally, you can clear the input fields for the user to retry
        document.getElementById("userNameLogin").value = "";
        document.getElementById("passwordLogin").value = "";
    }

}