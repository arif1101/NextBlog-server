import { Request, Response } from "express";
import { userService } from "./user.service";


const createUser = async(req: Request, res: Response) => {
    try{
        const result = await userService.createUser(req.body)
        res.send(result)
    }catch(error){
        console.log(error)
    }
}


const getAllFromUser = async(req: Request, res: Response) => {
    try{
        const result  = await userService.getAllFromUser()
        res.send(result)
    }catch(error){
        console.log(error)
    }
}

const getUserById = async(req: Request, res: Response) => {
    try{
        const result = await userService.getUserById(Number(req.params.id))
        res.send(result)
    }catch(error){
        console.log(error)
    }
}

export const userController = {
    createUser,
    getAllFromUser,
    getUserById
}