import { createUserAction } from "@/actions/user";
import { signUpSchema } from "@/lib/zod";
import { ZodError } from "zod";

export async function register(formData: FormData) {
    const unvalidatedEmail = formData.get("email")?.toString();
    const unvalidatedPassword = formData.get("password")?.toString();
    const unvalidatedClient = formData.get("client")?.toString();
    const unvalidatedName = formData.get("name")?.toString();

    try {
        const { email, password, name, client } = await signUpSchema.parseAsync({
            email: unvalidatedEmail,
            password: unvalidatedPassword,
            client: unvalidatedClient,
            name: unvalidatedName,
        })
    
        return createUserAction({ email, password, name, client });
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            throw new Error(error.errors[0].message)
        }

        throw new Error((error as any).message)
    }
}