import { useState, useRef, useEffect } from "react";
import { useChatStore } from "../../store/chatStore";
import { IconButton } from "@mui/material";
import {
  AddRounded,
  SearchRounded,
  EditRounded,
  DeleteOutlineRounded,
  CheckRounded,
  CloseRounded,
} from "@mui/icons-material";

export default function ChatHistory() {
  const {
    chats,
    activeChatId,
    addChat,
    setActiveChat,
    deleteChat,
    renameChat,
  } = useChatStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the input field when editing starts
  useEffect(() => {
    if (editingId && inputRef.current) inputRef.current.focus();
  }, [editingId]);

  return (
    <div className="w-72 bg-white border-r border-border-subtle flex flex-col h-full shrink-0 z-10">
      {/* Top Actions */}
      <div className="p-4 space-y-4 border-b border-slate-100 bg-white shrink-0">
        {/* Dark Navy "New Chat" Button */}
        <button
          onClick={addChat}
          className="w-full bg-primary-navy hover:bg-[#152a45] text-white rounded-lg py-2.5 flex items-center justify-center gap-2 font-semibold text-sm transition-colors shadow-sm cursor-pointer"
        >
          <AddRounded fontSize="small" />
          <span>New Chat</span>
        </button>

        {/* Search Bar */}
        <div className="relative flex items-center">
          <SearchRounded
            fontSize="small"
            className="absolute left-3 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search sessions..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-secondary-teal transition-all placeholder:text-slate-400 outline-none"
          />
        </div>
      </div>

      {/* Chat List - Clean List View */}
      <div className="flex-1 overflow-y-auto pt-4 pb-2">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-5">
          All Chats
        </h3>

        <ul className="flex flex-col">
          {chats.map((chat) => {
            const isActive = chat.id === activeChatId;
            const isEditing = chat.id === editingId;

            return (
              <li key={chat.id} className="relative group">
                {isEditing ? (
                  // Edit Mode
                  <div
                    className="flex items-center gap-1 w-full bg-white px-4 py-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      ref={inputRef}
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          renameChat(chat.id, editTitle);
                          setEditingId(null);
                        }
                      }}
                      className="flex-1 bg-slate-50 border border-secondary-teal rounded px-2 py-1 text-sm text-primary-navy outline-none"
                    />
                    <IconButton
                      size="small"
                      onClick={() => {
                        renameChat(chat.id, editTitle);
                        setEditingId(null);
                      }}
                      sx={{ color: "#10B981" }}
                    >
                      <CheckRounded sx={{ fontSize: 16 }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => setEditingId(null)}
                      sx={{ color: "#94a3b8" }}
                    >
                      <CloseRounded sx={{ fontSize: 16 }} />
                    </IconButton>
                  </div>
                ) : (
                  // Display Mode
                  <button
                    onClick={() => setActiveChat(chat.id)}
                    className={`w-full text-left py-2.5 px-4 flex flex-col gap-0.5 transition-colors cursor-pointer border-l-[3px] ${
                      isActive
                        ? "border-secondary-teal bg-secondary-teal/5"
                        : "border-transparent hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`text-sm truncate w-full pr-12 ${isActive ? "text-primary-navy font-semibold" : "text-slate-700 font-medium"}`}
                    >
                      {chat.title}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {chat.time}
                    </span>

                    {/* Hover Actions (Rename/Delete) */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center bg-white/90 backdrop-blur-sm rounded shadow-sm border border-slate-200 p-0.5">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingId(chat.id);
                          setEditTitle(chat.title);
                        }}
                      >
                        <EditRounded sx={{ fontSize: 14 }} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChat(chat.id);
                        }}
                        sx={{ color: "#ef4444" }}
                      >
                        <DeleteOutlineRounded sx={{ fontSize: 14 }} />
                      </IconButton>
                    </div>
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
