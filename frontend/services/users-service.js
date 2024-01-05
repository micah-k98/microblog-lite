"use strict"

class UsersService extends ServicesBase 
{
    apiBaseUrl = "";

    // This is needed combine the base URL (from extends ServicesBase) and the necessary resource
    constructor() 
    {
        super();
        this.apiBaseUrl = this.baseUrl + "api/users";
    }

    
    // POST - Create a user before logging in
    async addUser(user) {
        // create a requestInfo object
        const requestUserInfo = {
            method: "POST",
            body: JSON.stringify(user),
            headers: {"Content-type": "application/json;charset=UTF-8"}
        }

        return fetch(this.apiBaseUrl, requestUserInfo).then(response => response.json())
    }

    // POST
    async changeLoginData(loginData)
    {
        // POST /auth/login
        const options = {
            method: "POST",
            headers: {
                // This header specifies the type of content we're sending.
                // This is required for endpoints expecting us to send
                // JSON data.
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        }

        return fetch("http://localhost:5000" + "/auth/login", options)
            .then(response => response.json())
            .then(loginData =>
            {
                sessionStorage.token = loginData.token
                sessionStorage.username = loginData.username

                window.localStorage.setItem("login-data", JSON.stringify(loginData))

                return loginData
            })
    }

    // GET
    async getCurrent(loginData) {
        const requestInfo = {
            headers : {
                "Authorization": `Bearer ${loginData.token}`
            }
        }

        return fetch(`${this.apiBaseUrl}/${loginData.username}`, requestInfo).then(response => response.json());
    }


    // PUT
    async updateInfo(loginData, newData) {
        const requestUserInfo = {
            method: "PUT",
            body: JSON.stringify(newData),
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${loginData.token}`
            }
        }

        return fetch(`${this.apiBaseUrl}/${loginData.username}`, requestUserInfo);
    }
}