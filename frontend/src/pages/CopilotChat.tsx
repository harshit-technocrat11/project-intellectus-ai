import { ChatArea } from "@/components/chat/ChatArea";
import { ChatHistory } from "@/components/chat/ChatHistory";
import SourceSidebar from "@/components/chat/SourceSidebar";
import { useState } from "react";

export default function CopilotChat() {
  const [isSourceOpen, setIsSourceOpen] = useState(false);

  return (
    // h-screen locks the height to the viewport. overflow-hidden prevents the body scroll.
    <div className="flex h-screen w-full bg-white overflow-hidden relative">
      <ChatHistory />

      {/* flex-1 and min-w-0 allow this pane to shrink/grow correctly */}
      <main className="flex-1 flex flex-col min-w-0 h-full relative z-10 border-r border-slate-100">
        <ChatArea onToggleSources={() => setIsSourceOpen(!isSourceOpen)} />
      </main>

      <aside
        className={`bg-white transition-[width,opacity] duration-300 ease-in-out shrink-0 overflow-hidden z-20 ${
          isSourceOpen
            ? "w-87.5 opacity-100 border-l border-slate-100"
            : "w-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-87.5 h-full">
          <SourceSidebar onClose={() => setIsSourceOpen(false)} />
        </div>
      </aside>
    </div>
  );
}
