import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import  type { ChatMessage } from "./ChatLayout";

interface Props {
  messages: ChatMessage[];
  loading: boolean;
}

export default function ChatMessages({ messages, loading }: Props) {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex items-start gap-3 ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {msg.role === "assistant" && (
            <Avatar>
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
          )}

          <div
            className={`max-w-md px-4 py-2 rounded-xl text-sm ${
              msg.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}
          >
            {msg.content}
          </div>

          {msg.role === "user" && (
            <Avatar>
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          )}
        </div>
      ))}

      {loading && (
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div className="bg-muted px-4 py-2 rounded-xl text-sm">Typing...</div>
        </div>
      )}
    </div>
  );
}
