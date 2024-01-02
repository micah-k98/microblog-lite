"use strict"

class LikesService extends ServicesBase
{
    apiBaseUrl = "";
    token = sessionStorage.token;

    constructor()
    {
        super();
        this.apiBaseUrl = this.baseUrl + "api/likes"
    }

    // POST
    async liked(id) {
        const requestInfo = {
            method: "POST",
            body: JSON.stringify(id),
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${this.token}`
            }
        }
        
        fetch(this.apiBaseUrl, requestInfo)
    }

    // DELETE
    async unliked(id) {
        const requestInfo = {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        }

        return fetch(`${this.apiBaseUrl}/${id}`, requestInfo)
    }
}