import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello. I am Intellectus AI. How can I assist you today?",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (message: string) => {
    const userMessage: Message = { role: "user", content: message };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        role: "assistant",
        content: "This is a simulated response from the backend.",
      };

      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
        {messages.map((msg, index) => (
          <ChatMessage key={index} role={msg.role} content={msg.content} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t px-8 py-4 bg-background">
        <ChatInput onSend={handleSend} loading={loading} />
      </div>
    </div>
  );
}
