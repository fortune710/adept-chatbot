import Link from "next/link";

interface OpportunityDetailsProps {
  details: {
    name: string;
    value: string;
    icon: any;
    isLink?: boolean;
  }[];
}

export default function OpportunityDetails({
  details,
}: OpportunityDetailsProps) {
  return (
    <ul className="px-5 py-4 list-none space-y-3 max-h-svh overflow-auto">
      {details.map((detail) => (
        <li key={detail.name}>
          <p className="font-semibold text-base">{detail.name}</p>
          <div className="grid grid-cols-[16px_auto] items-center gap-2">
            {detail.icon}
            {
              !detail.isLink ? <p className="text-sm flex-wrap">{detail.value}</p> :
              <Link className="text-sm flex-wrap hover:text-card-foreground" target="_blank" href={detail.value ?? ''}>
                {detail.value}
              </Link>
            }
          </div>
        </li>
      ))}
    </ul>
  );
}
