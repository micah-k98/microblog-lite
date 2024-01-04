"use strict"

class PostService extends ServicesBase
{
    apiBaseUrl = "";

    // This is needed combine the base URL (from extends ServicesBase) and the necessary resource
    constructor()
{
        super();
        this.apiBaseUrl = this.baseUrl + "api/posts"
    }

    
    // POST
    async add(postInfo, loginData) {
        const requestInfo = {
            method: "POST",
            body: JSON.stringify(postInfo),
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${loginData.token}`
            }
        }

        return fetch(this.apiBaseUrl, requestInfo).then(response => response.json());
    }

    // GET
    async getByUser(loginData) {
        const requestInfo = {
            headers: {
                "Authorization": `Bearer ${loginData.token}`
            }
        }

        return fetch(`${this.apiBaseUrl}?limit=100&username=${loginData.username}`, requestInfo).then(response => response.json())
    }

    // GET
    async getAll(loginData) {
        const requestInfo = {
            headers: {
                "Authorization": `Bearer ${loginData.token}`
            }
        }

        return fetch(`${this.apiBaseUrl}?limit=100`, requestInfo).then(response => response.json())
    }

    // PUT
    async updatePost(id, loginData, newData) {
        const requestInfo = {
            method: "PUT",
            body: JSON.stringify(newData),
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${loginData.token}`
            }
        }

        return fetch(`${this.apiBaseUrl}/${id}`, requestInfo);
    }

    // DELETE
    async delete(id, loginData) {
        const requestInfo = {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${loginData.token}`
            }
        }

        return fetch(`${this.apiBaseUrl}/${id}`, requestInfo)
    }
}