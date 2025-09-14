import { Prisma, User } from "@prisma/client"
import { prisma } from "../../config/db"

// (payload: Prisma.UserCreateInput): Promise<User> 
// Prisma providing us typeScript type 
const createUser = async(payload: Prisma.UserCreateInput): Promise<User> => {
    const createdUser = await prisma.user.create({
        data: payload
    })
    return createdUser
}

const getAllFromUser = async() => {
    const result = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            picture: true,
            createdAt: true,
            updatedAt: true,
            role: true,
            status: true,
            post: true
        },
        orderBy:{
            createdAt: "asc"
        }
    })
    return result
}


const getUserById = async(id: number) => {
    const result = await prisma.user.findUnique({
        where: {
            id
        },
        select:{
            id: true,
            name: true,
            email: true,
            phone: true,
            picture: true,
            createdAt: true,
            updatedAt: true,
            role: true,
            status: true,
            post: true
        }
    })
    return result
}

export const userService = {
    createUser,
    getAllFromUser,
    getUserById
}