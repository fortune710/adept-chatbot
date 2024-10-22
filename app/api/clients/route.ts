import { getClients } from "@/server/clients";

export async function GET() {
    try {
        const clients = await getClients();
        return Response.json({ 
            data: clients, 
            message: "Retrived Clients successfully",
            success: true 
        }, { status: 200 })
    } catch (e: any) {
        return Response.json({ 
            message: e.message, 
            success: false,
            data: null 
        }, { status: 500 })
    }
}