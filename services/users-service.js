"use strict"

class UsersService extends ServicesBase 
{
    apiBaseUrl = "";
    token = sessionStorage.token;

    // This is needed combine the base URL (from extends ServicesBase) and the necessary resource
    constructor() {
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


    // GET
    async getCurrent(username) {
        const requestInfo = {
            headers : {
                "Authorization": `Bearer ${this.token}`
            }
        }


        return fetch(`${this.apiBaseUrl}/${username}`, requestInfo).then(response => response.json());
    }
}