import { useState } from "react";

export default function ChatMessages() {
  const [messages] = useState([
    { role: "user", content: "Hello AI" },
    { role: "assistant", content: "Hello 👋 How can I help?" },
  ]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-md px-4 py-2 rounded-xl text-sm ${
              msg.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  );
}
