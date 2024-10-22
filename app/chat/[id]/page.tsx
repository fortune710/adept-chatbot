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
import DetailsSlide from "./details-slide";
import { Suspense } from "react";

export default async function ChatPage({
  params,
}: {
  params: { [x: string]: string };
}) {

  return (
    <>
      <main className="max-md:hidden flex flex-col gap-4 lg:gap-6">
        <ResizablePanelGroup className="w-full" direction="horizontal">
          <ResizablePanel minSize={35} defaultSize={45} maxSize={45}>
            <Suspense>
              <DetailsSlide noticeId={params.id} />
            </Suspense>
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
              <Suspense>
                <DetailsSlide noticeId={params.id} />
              </Suspense>
            </section>
          </DrawerContent>
        </Drawer>
      </main>
    </>
  );
}

