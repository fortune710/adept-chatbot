import Link from "next/link";
import { Bell, Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import Opportunities from "./opportunities";
import FilterDialog from "@/components/filter-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";
//import { getOppsInfo } from "@/server/details";

export default async function ChatLayout({
  children,
  //searchParams,
}: {
  children: React.ReactNode;
  //searchParams: Promise<{ [key: string]: string | string[] | undefined }>

}) {
  //const headersList = headers()
  //const fullUrl = headersList.get('referer') || ''

  //const details = await getOppsInfo();
  //writeFileSync("data.json", JSON.stringify(details))

  const session = await auth();


  return (
    <div className="grid h-dvh w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] overflow-hidden">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 py-3.5">
            <Link href="/" className="flex items-center gap-3 font-semibold">
              <Image
                src="/adept-logo-big-1.png"
                alt="Adept Logo"
                width={40}
                height={40}
              />
              <span className="">Adept Engineering</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between px-2 lg:px-4">
              <h3 className="font-semibold text-lg mb-2">Opportunities</h3>
              <FilterDialog />
            </div>
            <Opportunities />
          </div>

        </div>
      </div>
      <div className="flex flex-col overflow-hidden">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 py-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <div className="flex-1">
                <div className="flex items-center justify-between px-2 lg:px-4">
                  <h3 className="font-semibold text-lg mb-2">Opportunities</h3>
                  <FilterDialog />
                </div>
                <Opportunities />
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarFallback>{session?.user?.name?.at(0) || "A"}</AvatarFallback>
                <AvatarImage
                  src={session?.user?.image || undefined}
                />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        {children}
      </div>
    </div>
  );
}
