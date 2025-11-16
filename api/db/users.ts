import type { LovUser } from "../models/db/user.js"
import prisma from "./index.js"


export async function fetchAllUsers() {
const users = await prisma.lovUser.findMany()
console.log(users)
return users
}

export async function insertUser(userData : LovUser){
    const user = await prisma.lovUser.create({
        data : {
            email: userData.email,
            password : userData.password
        }
    })
    return user
}