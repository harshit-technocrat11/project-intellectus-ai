import {
  AttachFileRounded,
  ArrowUpwardRounded,
  AutoAwesomeRounded,
  StorageRounded,
  ChevronRightRounded,
  PersonRounded,
} from "@mui/icons-material";
import { Avatar, IconButton, Tooltip, Chip, Button } from "@mui/material";

export default function ChatArea({
  onToggleSources,
}: {
  onToggleSources: () => void;
}) {
  return (
    <div className="flex-1 flex flex-col h-full bg-background relative overflow-hidden">
      {/* Header */}
      <div className="h-[60px] border-b border-border-subtle flex items-center justify-between px-6 bg-white shrink-0">
        <h2 className="font-semibold text-slate-800 text-sm">
          Q3 Revenue Deep Dive
        </h2>
        <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded font-bold uppercase tracking-widest">
          Neon DB
        </span>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* User Message */}
        <div className="flex justify-end gap-3 max-w-4xl mx-auto w-full">
          <div className="flex flex-col items-end gap-1 max-w-[70%]">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              You
            </span>
            <div className="bg-white border border-slate-200 text-slate-800 rounded-2xl rounded-tr-sm px-5 py-3.5 shadow-sm text-sm">
              Analyze the revenue performance for Q3 compared to our initial
              projections.
            </div>
          </div>
          <Avatar sx={{ bgcolor: "#1E3A5F", width: 36, height: 36, mt: 4 }}>
            <PersonRounded fontSize="small" />
          </Avatar>
        </div>

        {/* AI Response */}
        <div className="flex justify-start gap-3 max-w-4xl mx-auto w-full">
          <Avatar sx={{ bgcolor: "#0D9488", width: 36, height: 36, mt: 4 }}>
            <AutoAwesomeRounded fontSize="small" />
          </Avatar>

          <div className="flex flex-col items-start gap-1 max-w-[80%]">
            <span className="text-[10px] font-bold text-secondary-teal uppercase tracking-widest">
              Intellectus AI
            </span>
            <div className="bg-white border border-border-subtle rounded-2xl rounded-tl-sm shadow-sm overflow-hidden">
              <div className="p-5 text-sm text-slate-700 leading-relaxed">
                Based on the data extracted, Q3 revenue amounted to{" "}
                <strong className="text-primary-navy">$4.2M</strong>,
                representing a{" "}
                <strong className="text-secondary-teal">12% increase</strong>.
                {/* CLEAN MUI CHIPS (No Dark Blocks) */}
                <div className="pt-4 mt-4 border-t border-slate-50 flex gap-2">
                  <Chip
                    icon={<StorageRounded style={{ fontSize: 14 }} />}
                    label="neon_db.q3_financials"
                    size="small"
                    onClick={onToggleSources}
                    sx={{
                      bgcolor: "#f8fafc",
                      color: "#475569",
                      border: "1px solid #e2e8f0",
                      borderRadius: "6px",
                      "&:hover": { bgcolor: "#f1f5f9" },
                      "& .MuiChip-icon": { color: "#0D9488" },
                    }}
                  />
                </div>
              </div>

              {/* CLEAN TRACE BUTTON (MUI Text Variant) */}
              <div className="bg-slate-50/50 px-5 py-1.5 flex items-center justify-between border-t border-border-subtle">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  High Confidence • 1.2s
                </span>
                <Button
                  variant="text"
                  size="small"
                  endIcon={<ChevronRightRounded />}
                  onClick={onToggleSources}
                  sx={{
                    color: "#0D9488",
                    fontSize: "10px",
                    fontWeight: "bold",
                    letterSpacing: "0.05em",
                  }}
                >
                  View Trace
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input Area - Clean IconButton for Attach */}
      <div className="p-6 bg-white border-t border-border-subtle">
        <div className="max-w-4xl mx-auto flex items-end gap-2 bg-slate-50/50 border border-border-subtle rounded-3xl p-1.5 shadow-sm focus-within:bg-white focus-within:ring-2 focus-within:ring-secondary-teal/20 focus-within:border-secondary-teal transition-all">
          <Tooltip title="Attach Data">
            <IconButton
              sx={{
                color: "#94a3b8",
                mb: 0.5,
                "&:hover": { color: "#0D9488" },
              }}
            >
              <AttachFileRounded fontSize="small" />
            </IconButton>
          </Tooltip>

          <textarea
            placeholder="Ask Intellectus..."
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[40px] py-3 text-sm text-slate-700 outline-none"
            rows={1}
          />

          {/* Circular Teal Send Button */}
          <Tooltip title="Send Message">
            <IconButton
              sx={{
                bgcolor: "#0D9488",
                color: "white",
                mb: 0.5,
                "&:hover": { bgcolor: "#0f766e" },
              }}
            >
              <ArrowUpwardRounded fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
