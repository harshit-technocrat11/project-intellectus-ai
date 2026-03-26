import { useState } from "react";
import { sendQuestion } from "@/services/chatService";
import { useChatStore } from "@/store/chatStore";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatLayout() {
  const addMessage = useChatStore((s) => s.addMessage);
  const createSession = useChatStore((s) => s.createSession);
  const activeSessionId = useChatStore((s) => s.activeSessionId);

  const [loading, setLoading] = useState(false);

  const handleSend = async (question: string) => {
    let sessionId = activeSessionId;

    if (!sessionId) {
      sessionId = createSession();
    }

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: question,
    };

    addMessage(userMessage);

    setLoading(true);

    try {
      const response = await sendQuestion(question);

      const aiMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.summary,
        sql: response.generated_sql,
        table: response.data,
      };

      addMessage(aiMessage);
    } catch {
      addMessage({
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Something went wrong while processing your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ChatMessages />

      <ChatInput onSend={handleSend} loading={loading} />
    </div>
  );
}
