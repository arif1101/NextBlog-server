import { Post, Prisma } from "@prisma/client"
import { prisma } from "../../config/db"

const createPost = async(payload: Prisma.PostCreateInput): Promise<Post> => {
    const createdPost = await prisma.post.create({
        data: payload
    })
    return createdPost
}

const getAllPosts = async ({
    page = 1,
    limit = 10,
    search,
    isFeatured,
    tags
}: {
    page?: number,
    limit?: number,
    search?: string,
    isFeatured?: boolean,
    tags?: string[]
}) => {
    const skip = (page - 1) * limit;

    const where: any = {
        AND: [
            search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { content: { contains: search, mode: 'insensitive' } }
                ]

            },
            typeof isFeatured === "boolean" && { isFeatured },
            (tags && tags.length > 0) && { tags: { hasEvery: tags } }
        ].filter(Boolean)
    }

    const result = await prisma.post.findMany({
        skip,
        take: limit,
        where,
        include: {
            author: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const total = await prisma.post.count({ where })

    return {
        data: result,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
};

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
    deletePost,
    getAllPosts
}