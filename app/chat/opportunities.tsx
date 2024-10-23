"use client"
import OpportunitiesList from "@/components/opportunities-list";
import { Skeleton } from "@/components/ui/skeleton";
import { useOpportunities } from "@/hooks/use-opportunities";
import { useSearchParams } from "next/navigation";
//import { useSession } from "next-auth/react"

export default function Opportunities() {
    //const { data: session } = useSession();
    const searchParams = useSearchParams();
    const naics = searchParams.get('naics_code') || null;
    const agency = searchParams.get('agency') || null;
    const { data: opportunities, isLoading } = useOpportunities(naics, agency);
    
    
    if (isLoading) {
        return (
            <div className="space-y-3 mt-4">
                <Skeleton className="w-[95%] mx-auto flex items-center gap-4 rounded-lg px-3 h-7 py-5 text-muted-foreground hover:bg-accent hover:text-foreground" />
                <Skeleton className="w-[95%] mx-auto flex items-center gap-4 rounded-lg px-3 h-7 py-5 text-muted-foreground hover:bg-accent hover:text-foreground" />
                <Skeleton className="w-[95%] mx-auto flex items-center gap-4 rounded-lg px-3 h-7 py-5 text-muted-foreground hover:bg-accent hover:text-foreground" />
                <Skeleton className="w-[95%] mx-auto flex items-center gap-4 rounded-lg px-3 h-7 py-5 text-muted-foreground hover:bg-accent hover:text-foreground" />
                <Skeleton className="w-[95%] mx-auto flex items-center gap-4 rounded-lg px-3 h-7 py-5 text-muted-foreground hover:bg-accent hover:text-foreground" />
                <Skeleton className="w-[95%] mx-auto flex items-center gap-4 rounded-lg px-3 h-7 py-5 text-muted-foreground hover:bg-accent hover:text-foreground" />
                <Skeleton className="w-[95%] mx-auto flex items-center gap-4 rounded-lg px-3 h-7 py-5 text-muted-foreground hover:bg-accent hover:text-foreground" />
                <Skeleton className="w-[95%] mx-auto flex items-center gap-4 rounded-lg px-3 h-7 py-5 text-muted-foreground hover:bg-accent hover:text-foreground" />            
            </div>
        )
    }
    
    return (
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 max-h-svh overflow-auto mt-2">
            <OpportunitiesList 
                opportunities={opportunities!} 
            />
        </nav>
    )
}