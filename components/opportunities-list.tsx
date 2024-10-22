import Link from "next/link";
import { Opportunity } from "@/lib/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface OpportunitiesListProps {
  opportunities: Opportunity[];
}

export default function OpportunitiesList({
  opportunities
}: OpportunitiesListProps) {

  return (
    <>
      {opportunities?.map((opportunity) => (
        <Tooltip key={opportunity.title}>
          <TooltipTrigger asChild>
            <Link
              key={opportunity.title}
              href={`/chat/${opportunity.noticeid}`}
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:bg-accent hover:text-foreground"
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
