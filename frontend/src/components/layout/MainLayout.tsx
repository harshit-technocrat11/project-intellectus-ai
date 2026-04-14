import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans text-foreground">
      <Sidebar />

      <main className="flex-1 h-full overflow-hidden relative flex flex-col bg-background">
        <Outlet />
      </main>
    </div>
  );
}
