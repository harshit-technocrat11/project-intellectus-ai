import { useChatStore } from "@/store/chatStore";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import type { ChatMessage } from "@/types/chat";

export default function ChatLayout() {
  const { sessions, activeSessionId, addMessage } = useChatStore();

  const activeSession = sessions.find((s) => s.id === activeSessionId);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: text,
    };

    addMessage(userMessage);

    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();

    addMessage({
      role: "assistant",
      content: data.reply,
    });
  };

  if (!activeSession) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Create or select a chat
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader />
      <ChatMessages messages={activeSession.messages} />
      <ChatInput onSend={sendMessage} />
    </div>
  );
}
