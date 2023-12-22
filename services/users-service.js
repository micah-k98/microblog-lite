class UsersService {
    baserUrl = "http://localhost:5000/api/users"

    //Create a user before logging in
    async addUser(user) {
        // create a requestInfo object
        const requestUserInfo = {
            method: "POST",
            body: JSON.stringify(user),
            headers: {"Content-type": "application/json;charset=UTF-8"}
        }

        return fetch(this.baseUrl, requestUserInfo).then(response => response.json())
    }

}