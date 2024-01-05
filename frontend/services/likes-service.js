"use strict"

class LikesService extends ServicesBase
{
    apiBaseUrl = "";

    // This is needed combine the base URL (from extends ServicesBase) and the necessary resource
    constructor()
    {
        super();
        this.apiBaseUrl = this.baseUrl + "api/likes"
    }

    
    // POST
    async liked(id, loginData) {
        const requestInfo = {
            method: "POST",
            body: JSON.stringify(id),
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                "Authorization": `Bearer ${loginData.token}`
            }
        }
        
        fetch(this.apiBaseUrl, requestInfo)
    }

    // DELETE
    async unliked(id, loginData) {
        const requestInfo = {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${loginData.token}`
            }
        }

        return fetch(`${this.apiBaseUrl}/${id}`, requestInfo)
    }
}