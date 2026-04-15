import { Terminal, ChevronRight } from "lucide-react";

export default function AllLogs() {
  return (
    <div className="h-full flex flex-col bg-[#0F172A]">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <Terminal size={18} className="text-teal-400" />
        <h1 className="text-sm font-bold text-white uppercase tracking-widest">
          System Logs
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 font-mono text-[11px] space-y-2">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="flex items-start gap-4 p-2 hover:bg-white/5 rounded transition-colors group"
          >
            <span className="text-slate-500 shrink-0">
              [{new Date().toLocaleTimeString()}]
            </span>
            <span className="text-teal-400">INFO</span>
            <span className="text-slate-300 flex-1">
              Executing SQL Trace for active_session_ID:{" "}
              <span className="text-purple-400">"9822-AX"</span>. Matches found
              in 1.2s.
            </span>
            <ChevronRight
              size={14}
              className="text-slate-600 opacity-0 group-hover:opacity-100"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
