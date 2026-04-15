import React from "react";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-[#0f172a] overflow-hidden">
      {/* Sidebar - Pinned Left */}
      <Sidebar />

      {/* Main Viewport - This is where your pages load */}
      <main className="flex-1 relative flex flex-col bg-slate-50 overflow-hidden shadow-[-20px_0_50px_rgba(0,0,0,0.2)] rounded-tl-[2.5rem] mt-2 mb-2 mr-2">
        {/* The children prop is vital—it renders the actual page content */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
