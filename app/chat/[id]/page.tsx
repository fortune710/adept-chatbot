import ChatSessionMesssages from "@/components/chat-session-messages";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Opportunity } from "@/lib/types";
import { getNonArchivedOpportunities } from "@/server/opportinities";
import {
  Baseline,
  BookX,
  CalendarPlus,
  CalendarX2,
  FileBadge,
  Hash,
  IdCard,
  Link,
  Link2,
  Mail,
  MapPin,
  User,
} from "lucide-react";
import OpportunityDetails from "./opportnity-details";

export default async function ChatPage({
  params,
}: {
  params: { [x: string]: string };
}) {
  const opportunities = await getNonArchivedOpportunities();
  const selectedOpportunity = opportunities.find(
    (opp) => opp.noticeid === params.id,
  ) as Opportunity;

  const details = getOpportunityDetails(selectedOpportunity);

  return (
    <>
      <main className="max-md:hidden flex flex-col gap-4 lg:gap-6">
        <ResizablePanelGroup className="w-full" direction="horizontal">
          <ResizablePanel minSize={35} defaultSize={45} maxSize={45}>
            <OpportunityDetails details={details} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            className="px-3"
            minSize={55}
            defaultSize={55}
            maxSize={65}
          >
            <ChatSessionMesssages />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>

      <main className="md:hidden flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <ChatSessionMesssages className="max-sm:h-[58%]" />

        <Drawer>
          <DrawerTrigger asChild>
            <Button>View Opportunitiy Details</Button>
          </DrawerTrigger>

          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Opportunity Details</DrawerTitle>
            </DrawerHeader>

            <section>
              <OpportunityDetails details={details} />
            </section>
          </DrawerContent>
        </Drawer>
      </main>
    </>
  );
}

function getOpportunityDetails(opportunity: Opportunity) {
  return [
    {
      name: "Title",
      value: opportunity.title,
      icon: <Baseline className="w-5 h-5" />,
    },
    {
      name: "Description",
      value: opportunity.description,
      icon: <Link className="w-5 h-5" />,
    },
    {
      name: "Posted Date",
      value: opportunity.posteddate.toDateString(),
      icon: <CalendarPlus className="w-4 h-4" />,
    },
    {
      name: "Archive Date",
      value: opportunity.archivedate.toDateString(),
      icon: <CalendarX2 className="w-4 h-4" />,
    },
    {
      name: "NAICS Code",
      value: opportunity.naicscode,
      icon: <BookX className="w-5 h-5" />,
    },
    {
      name: "Notice ID",
      value: opportunity.naicscode,
      icon: <IdCard className="w-5 h-5" />,
    },
    {
      name: "Link",
      value: opportunity.ulink,
      icon: <Link2 className="w-5 h-5" />,
    },
    {
      name: "Point of Contact Name",
      value: opportunity.pointofcontactname,
      icon: <User className="w-5 h-5" />,
    },
    {
      name: "Point of Contact Email",
      value: opportunity.pointofcontactemail,
      icon: <Mail className="w-5 h-5" />,
    },
    {
      name: "Location",
      value: `${opportunity.placeofperformancestate}, ${opportunity.placeofperformancecountry}`,
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      name: "Parent",
      value: opportunity.fullparentpathname,
      icon: <FileBadge className="w-5 h-5" />,
    },
    {
      name: "Solicitation Number",
      value: opportunity.solicitationnumber,
      icon: <Hash className="w-5 h-5" />,
    },
  ];
}
