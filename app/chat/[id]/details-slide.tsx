"use client"

import {
    Baseline,
    BookX,
    CalendarPlus,
    CalendarX2,
    IdCard,
    Link2,
    Mail,
    MapPin,
    User,
} from "lucide-react";
import OpportunityDetails from "./opportnity-details";
import { Opportunity } from "@/lib/types";
import { useOpportunities } from "@/hooks/use-opportunities";
import { useSearchParams } from "next/navigation";
  
export default function DetailsSlide({ noticeId }: { noticeId: string }) {
  const searchParams = useSearchParams();
  const naics = searchParams.get('naics_code') || null;
  const agency = searchParams.get('agency') || null;


  const { data: opportunities, isLoading } = useOpportunities(naics, agency);
  const selectedOpportunity = opportunities?.find(
      (opp: any) => opp.noticeid === noticeId,
  ) as Opportunity;

  const details = getOpportunityDetails(selectedOpportunity);

  if (isLoading) {
      return <h2>Loading...</h2>
  }

  
  return (
      <OpportunityDetails details={details} />
  )
}



function getOpportunityDetails(opportunity: Opportunity) {
    return [
      {
        name: "Ranking Score",
        value: String(opportunity?.score || 0),
        icon: <Baseline className="w-4 h-4" />
      },
      {
        name: "Type of Notice",
        value: opportunity?.type_op,
        icon: <Baseline className="w-4 h-4" />
      },
      {
        name: "Notice ID",
        value: opportunity?.noticeid,
        icon: <IdCard className="w-4 h-4" />,
      },
      {
        name: "Solitation Number",
        value: opportunity?.solicitationnumber,
        icon: <IdCard className="w-4 h-4" />,
      },
      {
        name: "Title",
        value: opportunity?.title,
        icon: <Baseline className="w-4 h-4" />,
      },
      {
        name: "Link",
        value: opportunity?.ulink,
        icon: <Link2 className="w-4 h-4" />,
        isLink: true
      },
      {
        name: "Organization Code",
        value: opportunity?.fullparentpathcode,
        icon: <Link2 className="w-4 h-4" />,
      },
      {
        name: "Organization (Parent)",
        value: opportunity?.fullparentpathname,
        icon: <Link2 className="w-4 h-4" />,
      },
      {
        name: "NAICS Code",
        value: opportunity?.naicscode,
        icon: <BookX className="w-4 h-4" />,
      },
      {
        name: "Other NAICS Code",
        value: opportunity?.naicscodes,
        icon: <BookX className="w-4 h-4" />,
      },
      {
        name: "PSC Code",
        value: opportunity?.classificationcode,
        icon: <BookX className="w-4 h-4" />,
      },
      {
        name: "Set Aside",
        value: opportunity?.typeofsetaside,
        icon: <BookX className="w-4 h-4" />,
      },
      {
        name: "Set Aside Description",
        value: opportunity?.typeofsetasidedescription || "N/A",
        icon: <BookX className="w-4 h-4" />,
      },
      {
        name: "Point of Contact Name",
        value: opportunity?.pointofcontactname,
        icon: <User className="w-4 h-4" />,
      },
      {
        name: "Point of Contact Email",
        value: opportunity?.pointofcontactemail,
        icon: <Mail className="w-4 h-4" />,
      },
      {
        name: "Point of Contact Phone",
        value: opportunity?.pointofcontactphone,
        icon: <Mail className="w-4 h-4" />,
      },
      {
        name: "City of Performamce",
        value: opportunity?.placeofperformancecity,
        icon: <MapPin className="w-4 h-4" />,
      },
      {
        name: "State of Performance",
        value: opportunity?.placeofperformancestate,
        icon: <MapPin className="w-4 h-4" />,
      },
      {
        name: "ZipCode of Performance",
        value: opportunity?.placeofperformancezip,
        icon: <MapPin className="w-4 h-4" />,
      },
      {
        name: "Country of Performance",
        value: opportunity?.placeofperformancecountry,
        icon: <MapPin className="w-4 h-4" />,
      },
      {
        name: "Posted Date",
        value: new Date(opportunity?.posteddate).toDateString(),
        icon: <CalendarPlus className="w-4 h-4" />,
      },
      {
        name: "Archive Date",
        value: new Date(opportunity?.archivedate).toDateString(),
        icon: <CalendarX2 className="w-4 h-4" />,
      },
    ];
  }
  