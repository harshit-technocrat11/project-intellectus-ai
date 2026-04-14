import { useState, useRef, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, Check, X } from "lucide-react";
import { useChatStore } from "@/store/chatStore";

export default function ChatHistory() {
  // Pull state and actions from the Zustand store
  const {
    chats,
    activeChatId,
    addChat,
    deleteChat,
    renameChat,
    setActiveChat,
  } = useChatStore();

  // Local state for handling the inline renaming input
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the input when a user clicks 'Rename'
  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingId]);

  const handleStartRename = (
    id: string,
    currentTitle: string,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    setEditingId(id);
    setEditTitle(currentTitle);
  };

  const handleSaveRename = (
    id: string,
    e?: React.MouseEvent | React.KeyboardEvent,
  ) => {
    if (e) e.stopPropagation();
    if (editTitle.trim()) {
      renameChat(id, editTitle.trim());
    }
    setEditingId(null);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteChat(id);
  };

  return (
    <div className="w-64 bg-white border-r border-border-subtle flex flex-col h-full shrink-0">
      {/* Top Actions Area */}
      <div className="p-4 space-y-4">
        <button
          onClick={addChat}
          className="w-full bg-secondary-teal-muted hover:bg-teal-100 text-secondary-teal border border-teal-200 rounded-md py-2 px-4 flex items-center justify-center gap-2 text-sm font-medium panel-transition cursor-pointer mb-4"
        >
          <Plus size={16} />
          <span>New Chat</span>
        </button>

        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search sessions..."
            className="w-full bg-slate-50 border border-border-subtle rounded-md py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary-teal focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Chat List Area */}
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2 mt-2">
          All Chats
        </h3>
        <ul className="space-y-1">
          {chats.map((chat) => {
            const isActive = chat.id === activeChatId;
            const isEditing = chat.id === editingId;

            return (
              <li key={chat.id}>
                <div
                  onClick={() => !isEditing && setActiveChat(chat.id)}
                  className={`w-full group relative text-left px-3 py-2.5 rounded-md text-sm flex flex-col gap-1 transition-colors cursor-pointer ${
                    isActive
                      ? "bg-secondary-teal-light border-l-2 border-secondary-teal"
                      : "hover:bg-slate-50 border-l-2 border-transparent"
                  }`}
                >
                  {isEditing ? (
                    // Inline Edit Mode
                    <div
                      className="flex items-center gap-1 w-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        ref={inputRef}
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleSaveRename(chat.id, e)
                        }
                        className="flex-1 bg-white border border-secondary-teal rounded px-2 py-0.5 text-sm text-primary-navy outline-none"
                      />
                      <button
                        onClick={(e) => handleSaveRename(chat.id, e)}
                        className="text-accent-green hover:bg-green-50 p-1 rounded cursor-pointer"
                      >
                        <Check size={14} />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-muted-foreground hover:bg-slate-100 p-1 rounded cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    // Standard Display Mode
                    <>
                      <div className="flex items-center justify-between w-full">
                        <span
                          className={`font-medium truncate pr-4 ${isActive ? "text-primary-navy" : "text-slate-700"}`}
                        >
                          {chat.title}
                        </span>

                        {/* Hover Actions (Rename/Delete) */}
                        <div className="absolute right-2 top-2.5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded shadow-sm border border-slate-100 p-0.5">
                          <button
                            onClick={(e) =>
                              handleStartRename(chat.id, chat.title, e)
                            }
                            className="p-1 text-slate-400 hover:text-secondary-teal hover:bg-slate-100 rounded transition-colors cursor-pointer"
                            title="Rename"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button
                            onClick={(e) => handleDelete(chat.id, e)}
                            className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {chat.time}
                      </span>
                    </>
                  )}
                </div>
              </li>
            );
          })}

          {/* Empty State */}
          {chats.length === 0 && (
            <div className="text-center p-4 text-xs text-muted-foreground">
              No chats found. Click "New Chat" to begin.
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}
