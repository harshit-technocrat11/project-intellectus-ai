// components/chat/ChatHistory.tsx
import { useState } from "react";
import { useChatStore } from "@/store/useChatStore";
import { Plus, MessageSquare, Trash2, Check, Edit2 } from "lucide-react";

export const ChatHistory = () => {
  const {
    chats,
    activeChatId,
    setActiveChat,
    addChat,
    deleteChat,
    renameChat,
  } = useChatStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleStartRename = (
    id: string,
    currentTitle: string,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    setEditingId(id);
    setEditValue(currentTitle);
  };

  const handleSaveRename = (id: string) => {
    if (editValue.trim()) renameChat(id, editValue);
    setEditingId(null);
  };

  return (
    <div className="w-72 flex flex-col h-full p-4 bg-white border-r border-slate-100 shrink-0">
      <button
        onClick={addChat}
        className="flex items-center justify-center gap-2 w-full py-3 mb-6 bg-[#0F172A] text-white rounded-xl hover:bg-slate-800 transition-all shadow-md active:scale-[0.98]"
      >
        <Plus size={18} />
        <span className="font-medium text-sm">New Chat</span>
      </button>

      <div className="space-y-2 overflow-y-auto pr-2 custom-scrollbar">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setActiveChat(chat.id)}
            className={`group relative p-3 rounded-xl cursor-pointer transition-all border-2 ${
              activeChatId === chat.id
                ? "bg-slate-50 border-teal-500/20 shadow-sm"
                : "bg-transparent border-transparent hover:bg-slate-50"
            }`}
          >
            <div className="flex items-start gap-3">
              <MessageSquare
                size={16}
                className={`mt-0.5 ${activeChatId === chat.id ? "text-teal-600" : "text-slate-400"}`}
              />

              <div className="flex-1 min-w-0">
                {editingId === chat.id ? (
                  <input
                    autoFocus
                    className="w-full bg-white border border-teal-500 rounded px-1 text-sm outline-none"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleSaveRename(chat.id)
                    }
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <p
                    className={`text-sm font-semibold truncate ${activeChatId === chat.id ? "text-slate-900" : "text-slate-600"}`}
                  >
                    {chat.title}
                  </p>
                )}
                <p className="text-[10px] text-slate-400 mt-0.5">{chat.time}</p>
              </div>

              {/* Hover Actions */}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {editingId === chat.id ? (
                  <Check
                    size={14}
                    className="text-teal-600 hover:scale-120"
                    onClick={() => handleSaveRename(chat.id)}
                  />
                ) : (
                  <>
                    <Edit2
                      size={14}
                      className="text-slate-400 hover:text-slate-600"
                      onClick={(e) => handleStartRename(chat.id, chat.title, e)}
                    />
                    <Trash2
                      size={14}
                      className="text-slate-400 hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChat(chat.id);
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
