"use server"
import { signIn } from "@/auth";
import { signInSchema } from "@/lib/zod";
import { ZodError } from "zod";

export async function login(formData: FormData) {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const client = formData.get("client")?.toString();

    return await signIn("credentials", { 
        email: email, 
        password: password, 
        client: client, 
        redirect: true, 
        redirectTo: "/chat" 
    });
    try {
        /*
        const { email, password, client } = await signInSchema.parseAsync({
            email: unvalidatedEmail, 
            password: unvalidatedPassword, 
            client: unvalidatedClient 
        })*/
    
    
    } catch (error: unknown) {
        const err = error as any;
        if (err instanceof ZodError) {
            throw new Error(err.errors[0].message) 
        }

        throw new Error(err.message)
    }


}