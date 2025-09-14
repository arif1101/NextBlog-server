import { Router } from "express";
import { userController } from "./user.controller";



const router = Router()

router.post(
    "/",
    userController.createUser
)

router.get("/", userController.getAllFromUser)
router.get("/:id", userController.getUserById)

export const userRouter = router

