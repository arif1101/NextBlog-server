import { Request, Response } from "express";
import { PostService } from "./post.service";



const createPost = async(req: Request, res: Response) => {
    try{
        const result = await PostService.createPost(req.body)
        res.send(result)
    }catch(error){
        console.log(error)
    }
}

const PostController = {
    createPost
}