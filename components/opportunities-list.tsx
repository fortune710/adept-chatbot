import Link from "next/link";
import { Opportunity } from "@/lib/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { cn } from "@/lib/utils";

interface OpportunitiesListProps {
  opportunities: Opportunity[];
}

export default function OpportunitiesList({
  opportunities
}: OpportunitiesListProps) {

  return (
    <>
      {opportunities?.map((opportunity, index) => (
        <Tooltip key={opportunity.title + index}>
          <TooltipTrigger asChild>
            <Link
              href={`/chat/${opportunity.noticeid}`}
              className={cn("mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:bg-accent hover:text-foreground", opportunity.type_op === "Justification" && "text-blue-900/80")}
            >
              {opportunity.title.length > 30 ? `${opportunity.title.slice(0, 30)}...` : opportunity.title}
            </Link>
          </TooltipTrigger>

          <TooltipContent>
            <p className="text-xs">{opportunity.title}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </>
  );
}
