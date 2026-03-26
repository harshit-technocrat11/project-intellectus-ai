import { useEffect, useRef } from "react";
import { useChatStore } from "@/store/chatStore";
import ChatMessage from "./ChatMessage";

export default function ChatMessages() {
  const sessions = useChatStore((s) => s.sessions);
  const activeSessionId = useChatStore((s) => s.activeSessionId);

  const activeSession = sessions.find((s) => s.id === activeSessionId);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeSession?.messages.length]);

  if (!activeSession) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Start a new conversation
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {activeSession.messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}

      <div ref={bottomRef} />
    </div>
  );
}
