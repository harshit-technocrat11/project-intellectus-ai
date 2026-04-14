import {
  AttachFileRounded,
  SendRounded,
  StorageRounded,
  ChevronRightRounded,
  FiberManualRecordRounded,
} from "@mui/icons-material";
import { useChatStore } from "../../store/chatStore";

export default function ChatArea({
  onToggleSources,
}: {
  onToggleSources: () => void;
}) {
  const { activeChatId, chats } = useChatStore();
  const activeSession = chats.find(
    (s: { id: string }) => s.id === activeChatId,
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-background relative">
      {/* Top Bar: Locked at 60px for alignment */}
      <header className="h-15 border-b border-border-subtle flex items-center justify-between px-6 bg-white shrink-0">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
            Active Analysis
          </span>
          <h2 className="text-sm font-semibold text-slate-800">
            {activeSession?.title || "New Chat"}
          </h2>
        </div>
        <div className="flex gap-1.5">
          <span className="flex items-center gap-1 text-[9px] uppercase tracking-widest font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded-full">
            <StorageRounded sx={{ fontSize: 12 }} /> Neon DB
          </span>
        </div>
      </header>

      {/* Messages: High Density interaction */}
      <main className="flex-1 overflow-y-auto p-8 space-y-8">
        {activeSession?.messages.map(
          (msg: { id: string; role: string; content: string }) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-2 px-1">
                {msg.role === "user" ? "Dexter Admin" : "Analytical Architect"}
              </span>
              <div
                className={`max-w-[80%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary-navy text-white"
                    : "bg-white border border-border-subtle text-slate-700"
                }`}
              >
                {msg.content}
                {msg.role === "ai" && (
                  <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FiberManualRecordRounded
                        className="text-emerald-500 animate-pulse"
                        sx={{ fontSize: 8 }}
                      />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Traceable • 1.2s
                      </span>
                    </div>
                    <button
                      onClick={onToggleSources}
                      className="text-[10px] font-bold text-secondary-teal hover:underline flex items-center"
                    >
                      View Trace <ChevronRightRounded sx={{ fontSize: 14 }} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ),
        )}
      </main>

      {/* Input: Sleek Floating Pill */}
      <footer className="p-6 bg-white border-t border-border-subtle">
        <div className="max-w-3xl mx-auto flex items-center gap-2 bg-slate-50/50 border border-border-subtle rounded-full p-1.5 focus-within:bg-white focus-within:ring-1 focus-within:ring-secondary-teal/20 transition-all">
          <button className="p-2 text-slate-400 hover:text-secondary-teal transition-colors">
            <AttachFileRounded sx={{ fontSize: 20 }} />
          </button>
          <input
            type="text"
            placeholder="Ask anything..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 outline-none font-medium"
          />
          <button className="p-2 bg-secondary-teal text-white rounded-full shadow-md hover:bg-teal-700 transition-all">
            <SendRounded sx={{ fontSize: 18 }} />
          </button>
        </div>
        <p className="text-center text-[9px] text-slate-400 mt-4 font-bold uppercase tracking-widest">
          Intellectus AI v1.0 • Built for Dexter Corp
        </p>
      </footer>
    </div>
  );
}
