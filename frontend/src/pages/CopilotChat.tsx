// pages/CopilotChat.tsx
import { useState } from "react";
import { ChatHistory } from "@/components/chat/ChatHistory";
import { ChatArea } from "@/components/chat/ChatArea";
import SourceSidebar from "@/components/chat/SourceSidebar";

export default function CopilotChat() {
  const [isSourceOpen, setIsSourceOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      {/* Pane 1: Session History */}
      <ChatHistory />

      {/* Pane 2: Main Interaction Area */}
      <main className="flex-1 flex flex-col min-w-0 h-full relative z-10">
        <ChatArea onToggleSources={() => setIsSourceOpen(!isSourceOpen)} />
      </main>

      {/* Pane 3: Source Panel */}
      <aside
        className={`border-l border-slate-100 bg-white transition-[width,opacity] duration-300 ease-in-out shrink-0 overflow-hidden z-20 ${
          isSourceOpen
            ? "w-[350px] opacity-100"
            : "w-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-[350px] h-full">
          <SourceSidebar onClose={() => setIsSourceOpen(false)} />
        </div>
      </aside>
    </div>
  );
}
