import { Send, Paperclip, Mic, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  onSend: (text: string) => void;
  loading: boolean;
}

export default function ChatInput({ onSend, loading }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim() || loading) return;
    onSend(value);
    setValue("");
  };

  return (
    <div className="border-t bg-white/50 backdrop-blur-md p-4 lg:p-6">
      <div
        className={cn(
          "relative mx-auto max-w-4xl flex flex-col w-full rounded-2xl border bg-white shadow-sm transition-all duration-200 focus-within:shadow-md focus-within:ring-1 focus-within:ring-primary/20",
          loading && "opacity-80",
        )}
      >
        {/* Top Action Bar (Optional but Pro) */}
        <div className="flex items-center gap-2 px-3 pt-2 border-b border-slate-50">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-[10px] font-medium text-slate-500 hover:text-primary"
          >
            <Sparkles size={12} className="mr-1" />
            Improve Prompt
          </Button>
        </div>

        <div className="flex items-end gap-2 p-2">
          {/* Secondary Action: Attach */}
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 shrink-0 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-xl"
          >
            <Paperclip size={20} />
          </Button>

          {/* Main Input Area */}
          <textarea
            rows={1}
            placeholder="Ask Intellectus AI something..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            className="flex-1 min-h-[40px] max-h-48 w-full bg-transparent px-3 py-2.5 text-sm resize-none outline-none placeholder:text-slate-400"
          />

          {/* Primary Action: Send/Voice */}
          <div className="flex items-center gap-2 pb-0.5 pr-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-slate-400 hover:text-primary rounded-xl"
            >
              <Mic size={18} />
            </Button>

            <Button
              
              onClick={handleSubmit}
              disabled={!value.trim() || loading}
              size="sm"
              className={cn(
                "h-9 px-4 rounded-xl transition-all duration-200",
                value.trim()
                  ? "bg-primary shadow-sm"
                  : "bg-slate-100 text-slate-400",
              )}
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <>
                  <span className="hidden sm:inline mr-2 font-medium">
                    Send
                  </span>
                  <Send size={16} />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Disclaimer / Version Info */}
      <p className="mt-3 text-center text-[10px] text-slate-400 font-medium tracking-tight">
        PRO TIP: Press{" "}
        <kbd className="font-sans px-1 border rounded bg-slate-50">
          Shift + Enter
        </kbd>{" "}
        for new lines.
      </p>
    </div>
  );
}
