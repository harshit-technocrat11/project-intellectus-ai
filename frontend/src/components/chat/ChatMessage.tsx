import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

export default function ChatMessage({
  role,
  content,
}: {
  role: string;
  content: string;
}) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex w-full gap-3 py-4",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      <Avatar className="h-8 w-8 border shadow-sm">
        {isUser ? (
          <User className="p-1.5" />
        ) : (
          <Bot className="p-1.5 text-blue-600" />
        )}
        <AvatarFallback>{isUser ? "U" : "AI"}</AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "flex max-w-[80%] flex-col gap-2",
          isUser ? "items-end" : "items-start",
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm transition-all",
            isUser
              ? "bg-blue-600 text-white rounded-tr-none"
              : "bg-slate-100 text-slate-900 rounded-tl-none border-slate-200",
          )}
        >
          {content}
        </div>
        <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 px-1">
          {isUser ? "You" : "Intellectus AI"}
        </span>
      </div>
    </div>
  );
}
