let userService

document.addEventListener("DOMContentLoaded", () => {
    userService = new UsersService()

    const signUpButton = document.getElementById("signUp")
    signUp.addEventListener("click", saveNewUser)

})

async function saveNewUser(event)
{
    event.preventDefault()

    // save new user to the API
    // build a user object
    const username = document.getElementById("userName").value
    const fullName = document.getElementById("fullName").value
    const password = document.getElementById("password").value

    const user = {
        "username": username,
        "fullName": fullName,
        "password": password
    }

    console.log(user);
    const newUser = await userService.add(user)
    console.log(newUser);
    
    // go back to the home page
    location.href = "/index.html"
}