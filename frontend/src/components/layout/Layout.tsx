import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app-sidebar";
import Topbar from "./Topbar";

export default function Layout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="flex flex-col">
        <Topbar title={title} />

        <div className="flex-1 overflow-auto">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
