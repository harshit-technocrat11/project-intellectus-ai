import {
  CloseRounded,
  AnalyticsRounded,
  StorageRounded,
  CheckCircleRounded,
  HistoryEduRounded,
} from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

export default function SourceSidebar({ onClose }: { onClose: () => void }) {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="h-15 px-4 border-b border-border-subtle flex items-center justify-between bg-white shrink-0">
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-primary-navy flex items-center gap-2">
          <AnalyticsRounded sx={{ fontSize: 16 }} /> Context Trace
        </h3>

        {/* Clean, minimalist Close button */}
        <Tooltip title="Close Trace">
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: "#94a3b8",
              "&:hover": { color: "#1E3A5F", bgcolor: "rgba(0,0,0,0.04)" },
            }}
          >
            <CloseRounded fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Retrieved Data
            </span>
            <div className="flex items-center gap-1 text-accent-green text-[10px] font-bold uppercase">
              <CheckCircleRounded sx={{ fontSize: 12 }} /> 98% Match
            </div>
          </div>
          <div className="bg-slate-50 border border-border-subtle rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-primary-navy">
              <StorageRounded sx={{ fontSize: 14, color: "#0D9488" }} />{" "}
              neon_db.q3_financials
            </div>
            <p className="text-[11px] text-slate-600 font-mono bg-white p-2 border border-slate-100 rounded leading-relaxed wrap-break-word">
              "SELECT sum(revenue) FROM records WHERE quarter = 'Q3' AND status
              = 'final'..."
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-slate-50">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <HistoryEduRounded sx={{ fontSize: 14 }} /> Reasoning Logic
          </span>
          <p className="text-xs text-slate-600 leading-relaxed italic px-2">
            "Cross-referenced SQL output with EMEA contracts PDF to identify
            growth drivers."
          </p>
        </div>
      </div>
    </div>
  );
}
