const likeService = require('../db/like.service')


class LikeController {

    async createLike(req, res){

        try {
            const likeData = req.body;
            likeData.username = req.user.username

            let existingLike = await likeService.findExisting(likeData)

            if(existingLike){
                res.status(400).json({
                    message: "You are only allowed 1 like per post",
                    status: res.statusCode
                })
            }
            else {
                let newLike = await likeService.addLike(likeData)

                res.status(201).json(newLike)
            }
            
        } catch (error) {
            console.log("failed to create like: " + error)
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })
        }

    }
    
    async deleteLike(req, res){

        try {
            const id = req.params.likeId;
            
            let like = await likeService.getById(id)

            if(like){
                await likeService.delete(id)

                res.status(204).send({ message: "Like deleted", statusCode: res.statusCode });
            }else{
                res.status(404).send({
                    status: res.statusCode,
                    message: "Like Not Found!"
                })
            }
            
        } catch (error) {
            console.log("failed to delete like: " + error)
            
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })

        }
    }

    async getLikes(request, response){

        let limit = parseInt(request.query.limit) || 100
        let skip =  parseInt(request.query.offset) || 0

        //using a try/catch since we are using asyn/await and want to catch any errors if the code in the try block fails
        try {
            
            let allLikes = await likeService.getLikes(limit, skip)
            response.json(allLikes)
            
        } catch (error) {
            console.log("error getting all users: " + error)
            //if any code in the try block fails, send the user a HTTP status of 400 and a message stating we could not find any users
            response.status(400).json({
                message: error.message,
                statusCode: response.statusCode
            })
        }
    }
}

const likeController = new LikeController()

module.exports = likeController;
