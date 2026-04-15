// components/chat/ChatArea.tsx
import { useChatStore } from "@/store/useChatStore";
import { MessageSquare } from "lucide-react";
export const ChatArea = () => {
  const { chats, activeChatId } = useChatStore();
  const activeChat = chats.find((c) => c.id === activeChatId);

  if (!activeChat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-slate-50/30">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <MessageSquare size={32} className="opacity-20" />
        </div>
        <p className="text-sm font-medium">
          Select or start a new conversation
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <header className="h-16 border-b border-slate-100 flex items-center justify-between px-8">
        <div className="flex flex-col">
          <h2 className="text-sm font-bold text-slate-800">
            {activeChat.title}
          </h2>
          <span className="text-[10px] text-teal-600 font-medium uppercase tracking-tighter">
            Active Session
          </span>
        </div>
        <div className="bg-slate-50 px-3 py-1 rounded text-[10px] font-bold text-slate-500 border border-slate-200">
          NEON DB
        </div>
      </header>

      {/* Messages will render here based on the activeChat.id */}
      <div className="flex-1 overflow-y-auto p-8">
        {/* Mapping of activeChat.messages would go here */}
      </div>
    </div>
  );
};
