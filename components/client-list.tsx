import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";

export default function ClientList() {

    const [clients, setClients] = useState<any[]>([]);

    //Change this to use react query later on
    useEffect(() => {
        fetch('/api/clients')
        .then((res) => res.json())
        .then((data) => setClients(data.data))
    }, [])

    return (
        <div className="grid gap-2">
            <Label htmlFor="client">Client Name</Label>

            <Select required name="client">
                <SelectTrigger>
                    <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                    {
                        clients.map((client) => (
                            <SelectItem key={client.id} value={client.short_name}>
                                {client.long_name}
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
        </div>
    )
}