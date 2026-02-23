import { LogOut } from "lucide-react";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Button variant="outline" className="ms-auto" asChild>
            <Link href="/logout">
              Cerrar sesión
              <LogOut />
            </Link>
          </Button>
        </header>
        <main className="container max-w-(--breakpoint-md) py-4">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
