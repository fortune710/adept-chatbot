import { prisma } from "@/lib/prisma";
import { CreateUser } from "@/lib/types";

export async function getUserForAuth(email: string) {
    const user = await prisma.user.findUnique({
        where: { email }
    })

    return user;
}

export async function getUserForEmail(email: string) {
    return await prisma.user.findUnique({
        where: { email },
        select: {
            email: true,
            id: true,
            name: true,
            client: true,
            image: true,
        }
    })
}

export async function createUser(data: CreateUser) {
    return await prisma.user.create({
        data: {
            ...data,
            emailVerified: new Date(),
        }
    })
}