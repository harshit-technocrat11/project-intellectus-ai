import { Database, FileText, X, Activity } from "lucide-react";

interface SourceSidebarProps {
  onClose: () => void;
}

export default function SourceSidebar({ onClose }: SourceSidebarProps) {
  return (
    <div className="w-80 bg-white border-l border-border-subtle flex flex-col h-full shrink-0 animate-in slide-in-from-right-8 duration-300">
      <div className="p-4 border-b border-border-subtle flex items-center justify-between bg-slate-50">
        <h3 className="font-semibold text-primary-navy flex items-center gap-2 text-sm">
          <Activity size={16} />
          Context & Trace
        </h3>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-slate-700 p-1 rounded-md hover:bg-slate-200 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
              Source 1
            </span>
            <span className="text-[10px] bg-accent-green-light text-accent-green px-2 py-0.5 rounded font-medium">
              98% Match
            </span>
          </div>
          <div className="bg-slate-50 border border-border-subtle rounded-md p-3">
            <div className="flex items-center gap-2 mb-2 text-sm font-medium text-primary-navy">
              <Database size={14} className="text-secondary-teal" />
              neon_db.q3_financials
            </div>
            <p className="text-xs text-slate-600 font-mono bg-white p-2 border border-slate-200 rounded leading-relaxed wrap-break-word">
              "SELECT SUM(revenue) FROM financials_record WHERE quarter = 'Q3
              25' AND status = 'finalized'..."
            </p>
            <p className="text-xs font-medium text-primary-navy mt-2">
              Result: $4,201,110.05 (USD)
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
              Source 2
            </span>
            <span className="text-[10px] bg-accent-green-light text-accent-green px-2 py-0.5 rounded font-medium">
              85% Match
            </span>
          </div>
          <div className="bg-slate-50 border border-border-subtle rounded-md p-3">
            <div className="flex items-center gap-2 mb-2 text-sm font-medium text-primary-navy">
              <FileText size={14} className="text-blue-500" />
              emea_contracts_archive.pdf
            </div>
            <p className="text-xs text-slate-600 italic leading-relaxed border-l-2 border-slate-300 pl-2">
              "...regional growth in EMEA exceeded fiscal year expectations by
              24% due to the expansion of 'Project Aurora' within the enterprise
              sector..."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
