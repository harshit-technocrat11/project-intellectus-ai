import { useState, useRef, useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";
import { Paperclip, Send, User, Sparkles, ShieldCheck } from "lucide-react";

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

  // Auto-scroll logic: Anchors view during real-time streaming [cite: 2936]
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "auto", 
      });
    }
  }, [activeChat?.messages]);

  const handleSend = async () => {
    if (!input.trim() || !activeChatId) return;

    const userQuery = input;
    setInput("");

    addMessage(activeChatId, { role: "user", content: userQuery });
    addMessage(activeChatId, { role: "assistant", content: "" });

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...(activeChat?.messages || []).map((m) => ({
              role: m.role,
              content: m.content,
            })),
            { role: "user", content: userQuery },
          ],
        }),
      });

      if (!response.body) return;
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        updateLastMessage(activeChatId, chunk); 
      }
    } catch (error) {
      console.error("Stream failed:", error);
      updateLastMessage(activeChatId, " [Error: Intellectus Node Disconnected]");
    }
  };

  if (!activeChat) return <EmptyState />;

  return (

    <div className="flex-1 flex flex-col bg-white h-full relative overflow-hidden">
      
 
      <header className="h-16 border-b border-slate-100 flex items-center justify-between px-8 shrink-0 bg-white/80 backdrop-blur-md z-10">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-800 tracking-tight">{activeChat.title}</h2>
            <ShieldCheck size={14} className="text-teal-500" />
          </div>
          <span className="text-[10px] text-teal-600 font-bold uppercase tracking-tighter flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-teal-500 animate-pulse" /> Active Session
          </span>
        </div>
        <div className="bg-slate-50 px-3 py-1 rounded text-[10px] font-bold text-slate-500 border border-slate-200 uppercase tracking-widest">
          Neon DB
        </div>
      </header>

      <div
        className="flex-1 overflow-y-auto p-8 space-y-10 no-scrollbar"
        ref={scrollRef}
      >
        {activeChat.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div className="shrink-0">
              {msg.role === "assistant" ? (
                <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                  <Sparkles size={18} />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                  <User size={18} className="text-slate-400" />
                </div>
              )}
            </div>

            <div className={`flex flex-col max-w-[75%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">
                {msg.role === "assistant" ? "Intellectus AI" : "Verified User"}
              </span>

              <div className={`p-4 rounded-2xl text-[14px] leading-relaxed shadow-sm border ${
                  msg.role === "user"
                    ? "bg-[#0F172A] text-white border-slate-800 rounded-tr-none"
                    : "bg-white text-slate-700 border-slate-100 rounded-tl-none"
                }`}
              >
                {msg.content || (msg.role === "assistant" && <TypingIndicator />)}
              </div>

              {msg.role === "assistant" && msg.content && (
                <button
                  onClick={() => { setActiveMessage(msg.id); onToggleSources(); }}
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

      {/* Input Area - Integrated Glassmorphism [cite: 2792, 2795, 2804] */}
      <div className="p-6 bg-linear-to-t from-white via-white/80 to-transparent shrink-0">
        <div className="max-w-3xl mx-auto relative group">
          <div className="relative flex items-center bg-white/40 border border-slate-200/60 rounded-2xl transition-all focus-within:border-teal-500/40 focus-within:ring-8 focus-within:ring-teal-500/5 shadow-sm backdrop-blur-xl">
            
        
            <button className="p-3 ml-2 text-slate-400 hover:text-teal-600 hover:bg-teal-500/5 rounded-xl transition-all active:scale-90">
              <Paperclip size={20} />
            </button>
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
              placeholder="Ask Intellectus anything..."
              className="w-full bg-transparent py-4 px-2 text-[14px] text-slate-700 placeholder:text-slate-400 focus:outline-none resize-none max-h-40"
            />

            {/* Glass Send Button */}
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className={`p-2.5 mr-3 rounded-xl transition-all duration-300 flex items-center justify-center ${
                input.trim()
                  ? "bg-teal-500/10 text-teal-600 border border-teal-500/20 shadow-lg shadow-teal-500/5 hover:bg-teal-500/20 active:scale-95"
                  : "bg-slate-100/50 text-slate-300 border border-slate-200/50 scale-90 opacity-50"
              }`}
            >
              <Send size={18} fill={input.trim() ? "currentColor" : "none"} className={input.trim() ? "opacity-20" : ""} />
            </button>
          </div>
          <p className="text-[10px] text-center text-slate-400 mt-3 tracking-widest font-bold uppercase">
             Intellectus AI v1.0 • Built for Dexter Corp
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
    <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm mb-6">
      <Sparkles className="text-teal-500 opacity-60" size={32} />
    </div>
    <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-2">Intellectus Node Active</h2>
    <p className="text-xs text-slate-400 font-medium tracking-tight">Select a session or initialize a new query.</p>
  </div>
);