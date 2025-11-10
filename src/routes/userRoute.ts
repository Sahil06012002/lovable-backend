import { Router } from "express";
import { addUsersController, getAllUsersController } from "../controller/userController.js";


const userRouter = Router()
userRouter.get("/",getAllUsersController)
userRouter.post("/",addUsersController)

export default userRouter