import { getAgencies } from "@/server/opportinities"

export async function GET() {
    try {
      const agencies = await getAgencies();
      return Response.json({
        data: agencies,
        message: "Gotten agencies successfully",
        success: true
      })
    } catch (error) {
      console.error('Error fetching agencies:', error)
      return Response.json(
        { error: 'Failed to fetch agencies', data: null, success: false },
        { status: 500 }
      )
    }
}