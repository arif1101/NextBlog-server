import { Post, Prisma } from "@prisma/client"
import { prisma } from "../../config/db"





const createPost = async(payload: Prisma.PostCreateInput): Promise<Post> => {
    const createdPost = await prisma.post.create({
        data: payload
    })
    return createdPost
}


export const PostService = {
    createPost
}