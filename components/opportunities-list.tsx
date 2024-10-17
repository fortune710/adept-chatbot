import Link from "next/link";
import { Opportunity } from "@/lib/types";

interface OpportunitiesListProps {
  opportunities: Opportunity[];
}

export default function OpportunitiesList({
  opportunities,
}: OpportunitiesListProps) {
  return (
    <>
      <h3 className="text-semibold text-lg mb-2">Chats</h3>
      {opportunities.map((opportunity) => (
        <Link
          key={opportunity.title}
          href={`/chat/${opportunity.noticeid}`}
          className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          {opportunity.title.slice(0, 30) + "..."}
        </Link>
      ))}
    </>
  );
}
