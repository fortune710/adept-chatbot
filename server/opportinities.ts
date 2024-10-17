import { prisma } from "@/lib/prisma";

export async function getNonArchivedOpportunities() {
  try {
    const currentDate = new Date();

    const opportunities = await prisma.opportunity.findMany({
      where: {
        archivedate: { gt: currentDate },
      },
    });

    return opportunities;
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    throw error;
  } finally {
    //await prisma.$disconnect();
  }
}
