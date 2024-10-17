interface OpportunityDetailsProps {
  details: {
    name: string;
    value: string;
    icon: any;
  }[];
}

export default function OpportunityDetails({
  details,
}: OpportunityDetailsProps) {
  return (
    <ul className="px-5 py-4 list-none space-y-3">
      {details.map((detail) => (
        <li key={detail.name}>
          <p className="font-semibold text-base">{detail.name}</p>
          <div className="grid grid-cols-[20px_auto] items-center gap-2">
            {detail.icon}
            <p className="text-sm flex-wrap">{detail.value}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
