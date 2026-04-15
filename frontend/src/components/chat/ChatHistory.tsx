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
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editingId && inputRef.current) inputRef.current.focus();
  }, [editingId]);

  return (
    <div className="w-80 bg-white border-r border-slate-200 flex flex-col h-full shrink-0">
      {/* TOP */}
      <div className="p-4 space-y-3 border-b border-slate-100">
        <button
          onClick={addChat}
          className="w-full bg-primary-navy hover:bg-[#1e3a5f] text-white rounded-lg py-2.5 flex items-center justify-center gap-2 font-semibold text-sm transition"
        >
          <AddRounded fontSize="small" />
          New Chat
        </button>

        <div className="relative">
          <SearchRounded className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search sessions..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-secondary-teal"
          />
        </div>
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-y-auto pt-3 pb-2">
        <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2 px-6">
          All Chats
        </h3>

        <ul className="flex flex-col gap-1 px-3">
          {chats.map((chat) => {
            const isActive = chat.id === activeChatId;
            const isEditing = chat.id === editingId;

            return (
              <li key={chat.id} className="relative group">
                {isEditing ? (
                  <div className="flex items-center gap-1 px-4 py-2">
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
                      className="flex-1 bg-slate-50 border border-secondary-teal rounded px-2 py-1 text-sm outline-none"
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
                  <button
                    onClick={() => setActiveChat(chat.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg flex flex-col gap-0.5 transition-all duration-150
                      ${
                        isActive
                          ? "bg-slate-100 text-slate-900"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                  >
                    <span
                      className={`text-sm truncate pr-12 ${
                        isActive
                          ? "font-semibold text-slate-900"
                          : "text-slate-700"
                      }`}
                    >
                      {chat.title}
                    </span>

                    <span className="text-[11px] text-slate-400 mt-[2px]">
                      {chat.time}
                    </span>

                    {/* ACTIONS */}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition flex items-center bg-white rounded-md shadow-sm border border-slate-200 p-0.5">
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
