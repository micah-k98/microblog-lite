"use strict"

class PostService extends ServicesBase
{
    apiBaseUrl = "";
    token = sessionStorage.token;

    // This is needed combine the base URL (from extends ServicesBase) and the necessary resource
    constructor()
    {
        super();
        this.apiBaseUrl = this.baseUrl + "api/posts"
    }

    
    // POST
    async add(postInfo) {
        const requestInfo = {
            method: "POST",
            body: JSON.stringify(postInfo),
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${this.token}`
            }
        }

        return fetch(this.apiBaseUrl, requestInfo).then(response => response.json());
    }

    // GET
    async getByUser(userName) {
        const requestInfo = {
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        }

        return fetch(`${this.apiBaseUrl}?limit=100&username=${userName}`, requestInfo).then(response => response.json())
    }

    // GET
    async getAll() {
        const requestInfo = {
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        }

        return fetch(`${this.apiBaseUrl}?limit=100`, requestInfo).then(response => response.json())
    }

    // DELETE
    async delete(id) {
        const requestInfo = {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        }

        return fetch(`${this.apiBaseUrl}/${id}`, requestInfo)
    }
}