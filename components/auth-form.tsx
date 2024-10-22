"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ClientList from "@/components/client-list";
import Link from "next/link";
import { login } from "@/auth/login";
import { register } from "@/auth/register";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


interface AuthForm {
    type: "login" | "sign-up"
}

export default function AuthForm({ type }: AuthForm) {
    const { toast } = useToast();
    const router = useRouter();

    const submitForm = async (formData: FormData) => {
        if (type === "login") {
            login(formData);
            toast({
                title: "Success",
                description: "You have successfully signed in"
            })
            return;
        }

        try {
            switch (type) {
                case "sign-up":
                    await register(formData);
                    break;
                default:
                    return;
            }

            toast({
                title: "Success",
                description: "Regisration was successful"
            })

            if (type === "sign-up") router.push("/login")
        } catch (err: any) {
            toast({
                title: "Error Occured",
                description: err.message,
                variant: "destructive"
            })
        }
    }

    return (
        <form action={submitForm} className="grid gap-4">
            {
                type === "sign-up" &&
                <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        required
                    />
                </div>
            }
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                />
            </div>
            <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                        href="#"
                        className="ml-auto inline-block text-sm underline"
                    >
                        Forgot your password?
                    </Link>
                </div>
                <Input name="password" id="password" type="password" required />
            </div>
            <ClientList/>
            <Button type="submit" className="w-full">
                Login
            </Button>
      </form>
    )
}