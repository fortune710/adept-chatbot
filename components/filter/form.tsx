"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useQueryState } from 'nuqs';
import { useOpportunities } from "@/hooks/use-opportunities"
import { cn } from "@/lib/utils"
import { useStoredOpportunities } from "@/hooks/use-stored-opportunities"
import { PlusCircle } from "lucide-react"

interface FilterFormProps {
    agencies: string[]
}

export default function FilterForm({ agencies }: FilterFormProps) {
    const [naicsCode, setNaicsCode] = useQueryState('naics_code');
    const [agency, setAgency] = useQueryState('agency');
    const { storeOpportunity, isStored } = useStoredOpportunities();

    const { data: opportunities, isLoading } = useOpportunities(naicsCode, agency)

    const applyFilter = (formData: FormData) => {
        setNaicsCode(formData.get("naics")?.toString() || null);
        setAgency(formData.get("agency")?.toString() || null)
    }

    const clearFilters = () => {
        setNaicsCode(null);
        setAgency(null);
    }

    return (
    <form action={applyFilter}>
        <div className={cn("grid gap-4 py-4", (agency || naicsCode) && "grid-cols-2")}>
            <div className="grid gap-2">
                <Label htmlFor="naics">
                    NAICS code
                </Label>
                <Input
                    id="naics"
                    name="naics"
                    className="col-span-3"
                    defaultValue={naicsCode || undefined}
                    placeholder="Enter NAICS code"
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="agency">
                    Agency
                </Label>
                <Select value={agency || undefined} name="agency">
                    <SelectTrigger>
                        <SelectValue placeholder="Select an agency"/>
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                        {
                            agencies?.map((agency: string) => (
                                <SelectItem key={agency} value={agency}>
                                    {agency} 
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </div>
        </div>
        {
            (agency || naicsCode) &&
            <ul className="max-h-[300px] mb-3 px-3 overflow-y-auto">
                {
                    isLoading ? <h2>Loading</h2> :
                    opportunities?.map((opportunity) => (
                        <li key={opportunity.title} className="mx-[-0.65rem] grid grid-cols-[auto_28px] items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:bg-accent hover:text-foreground">
                            {opportunity.title}
                            <Button 
                                disabled={isStored(opportunity.noticeid)}
                                onClick={() => storeOpportunity(opportunity)} 
                                variant="outline" 
                                className="w-7 h-7" 
                                size="icon"
                            >
                                <PlusCircle className="w-3 h-3"/>
                            </Button>
                        </li>
                    ))
                }
            </ul>
        }
        <DialogFooter>
            <DialogClose onClick={clearFilters} asChild>
                <Button 
                    type="button" 
                    variant="outline"
                >
                    Clear Filters
                </Button>
            </DialogClose>
            <Button type="submit">Apply Filters</Button>
        </DialogFooter>
    </form>
    )
}