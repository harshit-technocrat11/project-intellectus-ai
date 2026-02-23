import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { Link } from "react-router-dom";

export function AppSidebar() {
  return (
    <Sidebar className="border-r bg-sidebar">
      {/* HEADER (Sticky) */}
      <SidebarHeader className="border-b px-4 py-3">
        <h2 className="text-lg font-semibold tracking-tight">Intellectus AI</h2>
        <p className="text-xs text-muted-foreground">
          Knowledge Intelligence Platform
        </p>
      </SidebarHeader>

      {/* CONTENT (Scrollable) */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:bg-muted rounded-md" asChild>
                <Link to="/">Dashboard</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="hover:bg-muted rounded-md" asChild>
                <Link to="/copilot">Copilot</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="hover:bg-muted rounded-md" asChild>
                <Link to="/logs">Logs</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:bg-muted rounded-md">
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER (Sticky) */}
      <SidebarFooter className="border-t px-4 py-3">
        <div className="flex flex-col">
          <span className="text-sm font-medium">harshitpacc</span>
          <span className="text-xs text-muted-foreground">Admin</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
