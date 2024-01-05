const postService = require('../db/post.service')

class PostController{

    async getPosts(req, res){

        let limit = parseInt(req.query.limit) || 100
        let skip =  parseInt(req.query.offset) || 0
        let username = req.query.username || undefined

        try {
            
            let allPosts = (username) 
                            ? await postService.getPostsByUser(username, limit, skip) 
                            : await postService.getPosts(limit, skip)
            
            // if(!req.query.username) allPosts = await postService.getPosts(limit, skip)
            // else allPosts = await postService.getPostsByUser(req.query.username, limit, skip)
            
            res.json(allPosts)
            
        } catch (error) {
            console.log("error getting all posts: " + error)
            
            res.status(400).json({
                message: "Error getting posts",
                statusCode: res.statusCode
            })

        }
    }
    
    async createPost(req, res){

        try {
            console.log(req.body)
            const postData = req.body;
            postData.username = req.user.username

            let newPost = await postService.addPost(postData)

            //return the newly created user
            res.status(201).json(newPost)
            
        } catch (error) {
            //handle errors creating user
            console.log("failed to create post: " + error)
            res.status(400).json({
                message: error.message,
                statusCode: res.statusCode
            })
        }

    }

    //method to get all users using async/await syntax
    async getPost(req, res){

        try {            
            const id = req.params.postId;
            
            const post = await postService.getById(id)

            if(!post){
                res.status(404).json({
                    message: `Post ${id} was not found`,
                    statusCode: res.statusCode
                })
            }
            
            res.json(post)
            
        } catch (error) {
            console.log("error getting post: " + error)
            
            res.status(400).json({
                message: "Error getting posts",
                statusCode: res.statusCode
            })

        }

    }

    async deletePost(req, res){

        try {
                       
            const id = req.params.postId;
            
            const post = await postService.getById(id)

            if(!post){
                res.status(404).json({
                    message: `Post ${id} was not found`,
                    statusCode: res.statusCode
                })
            }

            await postService.delete(id)

            res.status(204).json({
                message: `Post ${id} was deleted`,
                statusCode: res.statusCode
            })

            
        } catch (error) {
            console.log("failed to delete post: " + error)
            //if any code in the try block fails, send the user a HTTP status of 400 and a message stating we could not delete the post
            res.status(500).json({
                message: "There was an error deleting the post",
                statusCode: res.statusCode
            })

        }
    }

    //method to update a post
    async updatePost(req, res){

        try {
            //get the post id from the request params
            const id = req.params.postId;
            const post = await postService.getById(id)

                if(!post){
                    res.status(404).json({
                        message: `Post ${id} was not found`,
                        statusCode: res.statusCode
                    })
                }

            //store user data sent through the request
            const postData = req.body;

            await postService.update(id, postData)

            const newPost = await postService.getById(id)
            res.json(newPost)

        } catch (error) {
            console.log("error updating post: " + error)
            
            res.status(400).json({
                message: "Error updating posts",
                statusCode: res.statusCode
            })
        }   

    }
}

const postController = new PostController()

module.exports = postController;
