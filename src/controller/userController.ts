import type { Request, Response } from "express";
import { addUser, getAllUsers } from "../service/userService.js";
import type { LovUser } from "../models/db/user.js";

export const getAllUsersController = async (req : Request, res : Response) => {
    const users = await getAllUsers()
    return res.json (
        {
        "users" : users
    }
    )
}

export const addUsersController = async (req : Request, res : Response) => {
    const {email , password} = req.body
    const user : LovUser = {
        email, password
    }
    const dbResponse = await addUser(user)

    return res.status(201).json(
        {
            "message" : "User added successfully",
            "data" : dbResponse
        }
    )

}