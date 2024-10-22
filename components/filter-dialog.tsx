import { PlusCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import FilterForm from "./filter/form"
import { getAgencies } from "@/server/opportinities"
import { Suspense } from "react"

export default async function FilterDialog() {
    const agencies = await getAgencies();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <PlusCircle className="h-4 w-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                
                <DialogHeader>
                    <DialogTitle>Filter Options</DialogTitle>
                </DialogHeader>

                <Suspense>
                    <FilterForm agencies={agencies} />
                </Suspense>

            </DialogContent>
        </Dialog>
    )
}