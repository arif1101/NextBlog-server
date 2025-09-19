import { Request, Response } from "express";
import { PostService } from "./post.service";
import { prisma } from "../../config/db";



const createPost = async(req: Request, res: Response) => {
    try{
        const result = await PostService.createPost(req.body)
        res.send(result)
    }catch(error){
        console.log(error)
    }
}


const getAllPost = async(req: Request, res: Response) => {
    try{
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) ||10;
        const search = (req.query.search as string) || "";
        const isFeatured = req.query.isFeatured ? req.query.isFeatured==="true" : undefined;
        const tags = req.query.tags? (req.query.tags as string).split(","):[]
        
        const query: { page: number; limit: number; search: string; isFeatured?: boolean; tags: string[] } = { page, limit, search, tags };

        if (isFeatured !== undefined) {
            query.isFeatured = isFeatured;
        }
        
        const result = await PostService.getAllPosts(query)
        res.send(result)
    }catch(error){
        console.log(error)
    }
}

const getSinglePost = async(req: Request, res: Response) => {
    try{
        const result = await PostService.getSinglePost(Number(req.params.id))
        res.send(result)
    }catch(error){
        console.log(error)
    }
}

const updatePost = async(req: Request, res: Response) => {
    const result = await PostService.updatePost(Number(req.params.id),req.body)
    res.send(result)
}

const deletePost = async (req: Request, res: Response) => {
    await PostService.deletePost(Number(req.params.id));
    res.json({ message: "Post deleted" });
};

export const PostController = {
    createPost,
    getAllPost,
    getSinglePost,
    updatePost,
    deletePost
}