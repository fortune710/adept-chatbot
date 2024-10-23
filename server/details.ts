import { prisma } from "@/lib/prisma";

export async function getOppsInfo() {
    const details = await prisma.opportunityTableInfo.findMany();
    return details;
}