import { useState, useRef } from "react";
import { useChatStore } from "@/store/useChatStore";
import { MessageSquare, Paperclip, Send, User, Sparkles } from "lucide-react";

interface ChatAreaProps {
  onToggleSources: () => void;
}

export const ChatArea = ({ onToggleSources }: ChatAreaProps) => {
  const { chats, activeChatId, addMessage, setActiveMessage } = useChatStore();
  const [input, setInput] = useState("");
  const activeChat = chats.find((c) => c.id === activeChatId);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim() || !activeChatId) return;

    // 1. Add User Message
    addMessage(activeChatId, { role: "user", content: input });
    setInput("");

    // 2. Mock AI Response (Simulating your logic)
    setTimeout(() => {
      addMessage(activeChatId, {
        role: "assistant",
        content: "Based on the Q3 data, revenue reached $4.2M.",
        traceData: { query: "SELECT...", match: "98%" },
      });
    }, 1000);
  };

  const handleViewTrace = (msgId: string) => {
    setActiveMessage(msgId);
    onToggleSources(); // Opens the sidebar you built
  };

  if (!activeChat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-slate-50/30">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <MessageSquare size={32} className="opacity-20" />
        </div>
        <p className="text-sm font-medium">
          Select or start a new conversation
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white h-full">
      {/* Header */}
      <header className="h-16 border-b border-slate-100 flex items-center justify-between px-8 shrink-0">
        <div className="flex flex-col">
          <h2 className="text-sm font-bold text-slate-800">
            {activeChat.title}
          </h2>
          <span className="text-[10px] text-teal-600 font-medium uppercase tracking-tighter">
            Active Session
          </span>
        </div>
        <div className="bg-slate-50 px-3 py-1 rounded text-[10px] font-bold text-slate-500 border border-slate-200 uppercase">
          Neon DB
        </div>
      </header>

      {/* Messages List */}
      <div
        className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar"
        ref={scrollRef}
      >
        {activeChat.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                <Sparkles size={16} />
              </div>
            )}

            <div className={`max-w-[70%] space-y-2`}>
              <div
                className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#0F172A] text-white rounded-tr-none"
                    : "bg-slate-50 border border-slate-100 text-slate-700 rounded-tl-none"
                }`}
              >
                {msg.content}
              </div>

              {msg.role === "assistant" && msg.traceData && (
                <button
                  onClick={() => handleViewTrace(msg.id)}
                  className="text-[10px] font-bold text-teal-600 uppercase tracking-widest hover:underline flex items-center gap-1"
                >
                  View Trace <span className="text-slate-300">•</span>{" "}
                  {msg.traceData.match} Match
                </button>
              )}
            </div>

            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                <User size={16} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Area (GPT Style) */}
      <div className="p-6 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-teal-600 transition-colors">
              <Paperclip size={20} />
            </button>
          </div>

          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              !e.shiftKey &&
              (e.preventDefault(), handleSend())
            }
            placeholder="Ask Intellectus..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-14 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all resize-none"
          />

          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-[#0F172A] text-white rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition-all"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-400 mt-3">
          Intellectus AI can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
};
