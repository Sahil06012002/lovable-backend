import { fetchAllUsers, insertUser } from "../db/users.js";
import type { LovUser } from "../models/db/user.js";

export async function getAllUsers(){
    const users = await fetchAllUsers();
    return users


}

export async function addUser(user : LovUser) {
    const res = await insertUser(user)
    return res
}