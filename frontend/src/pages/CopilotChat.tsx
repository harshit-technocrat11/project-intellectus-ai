import { useState } from "react";
import ChatHistory from "../components/chat/ChatHistory";
import ChatArea from "../components/chat/ChatArea";
import SourceSidebar from "../components/chat/SourceSidebar";

export default function CopilotChat() {
  const [isSourceOpen, setIsSourceOpen] = useState(false);

  return (
    <div className="flex h-full w-full bg-background overflow-hidden">
      <ChatHistory />

      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <ChatArea onToggleSources={() => setIsSourceOpen(!isSourceOpen)} />
      </div>

      {/* Right Panel: Cubic-Bezier Transition */}
      <aside
        className={`bg-white border-l border-border-subtle transition-all duration-500 ease-[0.32,0,0.67,0] overflow-hidden ${
          isSourceOpen ? "w-95 opacity-100 shadow-2xl" : "w-0 opacity-0"
        }`}
      >
        <div className="w-95 h-full">
          <SourceSidebar onClose={() => setIsSourceOpen(false)} />
        </div>
      </aside>
    </div>
  );
}
