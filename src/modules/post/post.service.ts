import { Post, Prisma } from "@prisma/client"
import { prisma } from "../../config/db"

const createPost = async(payload: Prisma.PostCreateInput): Promise<Post> => {
    const createdPost = await prisma.post.create({
        data: payload
    })
    return createdPost
}

const getSinglePost = async(id: number) => {
    const result = await prisma.post.findUnique({
        where: {
            id
        }
    })
    return result
}

const updatePost = async (id:number,data: Partial<Prisma.PostCreateInput>) => {
    return prisma.post.update({where: {id}, data})
};

const deletePost = async (id: number) => {
    return prisma.post.delete({ where: { id } });
};

export const PostService = {
    createPost,
    getSinglePost,
    updatePost,
    deletePost
}