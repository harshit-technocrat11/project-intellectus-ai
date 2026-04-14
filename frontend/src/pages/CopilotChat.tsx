import { useState } from "react";
import ChatHistory from "../components/chat/ChatHistory";
import ChatArea from "../components/chat/ChatArea";
import SourceSidebar from "../components/chat/SourceSidebar";

export default function CopilotChat() {
  const [isSourceOpen, setIsSourceOpen] = useState(false);

  return (
    <div className="flex h-full w-full bg-background overflow-hidden relative">
      {/* Pane 1: Chat Sessions History */}
      <ChatHistory />

      {/* Pane 2: Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full transition-all duration-300 ease-in-out z-10 border-r border-border-subtle">
        <ChatArea onToggleSources={() => setIsSourceOpen(!isSourceOpen)} />
      </div>

      {/* Pane 3: Source Panel (Anti-lag fixed width trick) */}
      <aside
        className={`bg-white shadow-2xl transition-[width,opacity] duration-300 ease-in-out shrink-0 overflow-hidden z-20 ${
          isSourceOpen
            ? "w-87.5 opacity-100"
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
