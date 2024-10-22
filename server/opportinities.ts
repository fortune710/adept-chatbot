import { prisma } from "@/lib/prisma";
import { Opportunity } from "@/lib/types";

export async function getNonArchivedOpportunities(
  naicsCode: string | null,
  agency: string | null,
  clientShortName: string = "AES") {
  try {

    const opportunities: Opportunity[] = await prisma.$queryRaw`
      SELECT o.*, r.score
      FROM oppstable o
      LEFT JOIN (
        SELECT DISTINCT ON (opps_id) *
        FROM oppsclientranking
        WHERE client_short_name = ${clientShortName}
      ) r ON o.noticeid = r.opps_id
      WHERE o.archivedate > CURRENT_DATE
      AND o.naicsCode LIKE ${"%" + (naicsCode || "") + "%"}
      AND o.fullparentpathname LIKE ${"%" + (agency || "") + "%"}
      LIMIT 10
    `;

    
    return opportunities;
  
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    throw error;
  } finally {
    //await prisma.$disconnect();
  }
}


export async function getAgencies() {
  const opportunities = await prisma.opportunity.findMany({
    select: {
      fullparentpathname: true
    },
    distinct: ['fullparentpathname'],
    where: {
      fullparentpathname: {
        not: null
      }
    }
  });

  return opportunities.map(({ fullparentpathname }) => fullparentpathname!)
}