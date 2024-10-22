import { prisma } from "@/lib/prisma";

export async function getClients() {
    const clients = await prisma.clients.findMany({
        where: { status: true }
    });

    return clients.map((client) => ({
        long_name: client.client_long_name,
        short_name: client.client_short_name,
        id: client.id,
    }))
}

export async function createClient({ long_name, short_name }: { short_name: string, long_name: string }) {
    const client = await prisma.clients.create({
        data: {
            client_long_name: long_name,
            client_short_name: short_name,
            status: true
        }
    })

    return client
}