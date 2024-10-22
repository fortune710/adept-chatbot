import { getNonArchivedOpportunities } from '@/server/opportinities' // adjust import path as needed
import { Opportunity } from '@/lib/types' // assuming you're using Prisma

export async function GET(request: Request) {
  try {
    // Get the URL object from the request
    const { searchParams } = new URL(request.url)
    
    // Extract query parameters
    const naics = searchParams.get('naicsCode')
    const agency = searchParams.get('agency')

    // Fetch opportunities
    const opportunities = (await getNonArchivedOpportunities(naics, agency)) as Opportunity[]

    // Return the opportunities
    return Response.json({
        data: opportunities,
        message: "Gotten opportunities successfully",
        success: true
    })

  } catch (error) {
    console.error('Error fetching opportunities:', error)
    
    // Return appropriate error response
    return Response.json(
      { 
        error: 'Failed to fetch opportunities',
        data: null,
        success: false
      },
      { 
        status: 500 
      }
    )
  }
}

// Optionally add response type configuration
export const dynamic = 'force-dynamic' // Disable caching for this route