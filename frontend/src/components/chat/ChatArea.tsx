import { useState, useRef, useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";
import {
  MessageSquare,
  Paperclip,
  Send,
  User,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

interface ChatAreaProps {
  onToggleSources: () => void;
}

export const ChatArea = ({ onToggleSources }: ChatAreaProps) => {
  const {
    chats,
    activeChatId,
    addMessage,
    updateLastMessage,
    setActiveMessage,
  } = useChatStore();

  const [input, setInput] = useState("");
  const activeChat = chats.find((c) => c.id === activeChatId);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages or stream chunks
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [activeChat?.messages]);

  const handleSend = async () => {
    if (!input.trim() || !activeChatId) return;

    const userQuery = input;
    const currentChat = chats.find((c) => c.id === activeChatId);
    setInput("");

    // 1. Add User Message
    addMessage(activeChatId, { role: "user", content: userQuery });

    // 2. Add Placeholder Assistant Message
    addMessage(activeChatId, { role: "assistant", content: "" });

    try {
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...(currentChat?.messages || []),
            { role: "user", content: userQuery },
          ],
        }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          // 3. The "Pulse": Update the last message with the new chunk
          updateLastMessage(activeChatId, chunk);
        }
      }
    } catch (error) {
      console.error("Stream failed:", error);
      updateLastMessage(
        activeChatId,
        " [Error: Intellectus Node Disconnected]",
      );
    }
  };

  if (!activeChat) return <EmptyState />;

  return (
    <div className="flex-1 flex flex-col bg-white h-full relative overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b border-slate-100 flex items-center justify-between px-8 shrink-0 bg-white/80 backdrop-blur-md z-10">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-800">
              {activeChat.title}
            </h2>
            <ShieldCheck size={14} className="text-teal-500" />
          </div>
          <span className="text-[10px] text-teal-600 font-bold uppercase tracking-tighter flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-teal-500 animate-pulse" />{" "}
            Active Session
          </span>
        </div>
        <div className="bg-slate-50 px-3 py-1 rounded text-[10px] font-bold text-slate-500 border border-slate-200 uppercase tracking-widest">
          Neon DB
        </div>
      </header>

      {/* Messages List */}
      <div
        className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar"
        ref={scrollRef}
      >
        {activeChat.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {/* Avatar Logic */}
            <div className="shrink-0">
              {msg.role === "assistant" ? (
                <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/20 transition-transform hover:scale-105">
                  <Sparkles size={18} />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200">
                  <User size={18} />
                </div>
              )}
            </div>

            <div
              className={`flex flex-col max-w-[75%] ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              {/* Identity Tag */}
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">
                {msg.role === "assistant" ? "Intellectus AI" : "Verified User"}
              </span>

              {/* Message Bubble */}
              <div
                className={`p-4 rounded-2xl text-[14px] leading-relaxed shadow-sm border ${
                  msg.role === "user"
                    ? "bg-[#0F172A] text-white border-slate-800 rounded-tr-none"
                    : "bg-white text-slate-700 border-slate-100 rounded-tl-none"
                }`}
              >
                {msg.content ||
                  (msg.role === "assistant" && <TypingIndicator />)}
              </div>

              {/* Glassmorphism Trace Button */}
              {msg.role === "assistant" && msg.content && (
                <button
                  onClick={() => {
                    setActiveMessage(msg.id);
                    onToggleSources();
                  }}
                  className="mt-3 px-3 py-1.5 rounded-full border border-teal-500/20 bg-teal-500/5 backdrop-blur-md text-[10px] font-bold text-teal-600 uppercase tracking-widest hover:bg-teal-500/10 transition-all flex items-center gap-2 group"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                  View Trace
                  <span className="text-teal-300 opacity-50 group-hover:opacity-100 transition-opacity">
                    • {msg.traceData?.match || "98%"} Match
                  </span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modern Glassmorphism Input Area */}
      <div className="p-6 bg-gradient-to-t from-white via-white/80 to-transparent backdrop-blur-sm">
        <div className="max-w-3xl mx-auto relative group">
          <div className="relative flex items-center bg-white/40 border border-slate-200/60 rounded-2xl transition-all focus-within:border-teal-500/40 focus-within:ring-8 focus-within:ring-teal-500/5 shadow-sm backdrop-blur-xl">
            {/* Glass Attach Button */}
            <button className="p-3 ml-2 text-slate-400 hover:text-teal-600 hover:bg-teal-500/5 rounded-xl transition-all active:scale-90">
              <Paperclip size={20} />
            </button>

            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                !e.shiftKey &&
                (e.preventDefault(), handleSend())
              }
              placeholder="Message Intellectus..."
              className="w-full bg-transparent py-4 px-2 text-[14px] text-slate-700 placeholder:text-slate-400 focus:outline-none resize-none max-h-40"
            />

            {/* Glass Send Button */}
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className={`p-2.5 mr-3 rounded-xl transition-all duration-300 flex items-center justify-center ${
                input.trim()
                  ? "bg-teal-500/10 text-teal-600 border border-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.1)] hover:bg-teal-500/20 scale-100 active:scale-95"
                  : "bg-slate-100/50 text-slate-300 border border-slate-200/50 scale-90 opacity-50"
              }`}
            >
              <Send
                size={18}
                fill={input.trim() ? "currentColor" : "none"}
                className={input.trim() ? "opacity-20" : ""}
              />
            </button>
          </div>

          <p className="text-[10px] text-center text-slate-400 mt-3 tracking-wide flex items-center justify-center gap-1.5 font-medium">
            <span className="w-1 h-1 rounded-full bg-slate-200" />
            Intellectus AI • can make mistakes
          </p>
        </div>
      </div>
    </div>
  );
};

const TypingIndicator = () => (
  <div className="flex gap-1 items-center py-1">
    <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
    <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
    <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" />
  </div>
);

const EmptyState = () => (
  <div className="flex-1 flex flex-col items-center justify-center bg-slate-50/20 p-8">
    <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm mb-6 animate-float">
      <Sparkles className="text-teal-500 opacity-60" size={32} />
    </div>
    <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-2">
      Intellectus Node Active
    </h2>
    <p className="text-xs text-slate-400 font-medium">
      Select a session or initialize a new query.
    </p>
  </div>
);
