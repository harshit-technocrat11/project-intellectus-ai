import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar collapsed={collapsed} />

      <div className="flex flex-1 flex-col">
        <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
