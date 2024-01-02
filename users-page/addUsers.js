let userService

document.addEventListener("DOMContentLoaded", () => {
    userService = new UsersService()

    const signUpButton = document.getElementById("signUpButton")
    signUpButton.addEventListener("click", saveNewUser)

})

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