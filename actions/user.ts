"use server"

import { CreateUser } from "@/lib/types";
import { hashPassword } from "@/server/helpers";
import { createUser, getUserForAuth } from "@/server/users";

export async function createUserAction(data: CreateUser): Promise<void> {


    try {
        const user = await getUserForAuth(data.email);
        if (user) {
            throw new Error("Email already in use.");
        }
        
        const hashedPassword = hashPassword(data.password!);
    
        await createUser({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            client: data.client
        })
    } catch {
        throw new Error("Error occured while creating user");
    }

}