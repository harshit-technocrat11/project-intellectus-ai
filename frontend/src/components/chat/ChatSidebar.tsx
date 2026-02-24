import { useChatStore } from "@/store/chatStore";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Plus } from "lucide-react";

export default function ChatSidebar() {
  const { sessions, activeSessionId, createSession, switchSession } =
    useChatStore();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b flex items-center justify-between">
        <span className="text-sm font-semibold">Chats</span>
        <Button size="sm" variant="outline" onClick={createSession}>
          <Plus size={14} />
        </Button>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`group flex items-center justify-between px-3 py-2 rounded-lg text-sm cursor-pointer transition
              ${
                session.id === activeSessionId
                  ? "bg-muted font-medium"
                  : "hover:bg-muted"
              }`}
          >
            <div
              onClick={() => switchSession(session.id)}
              className="flex-1 truncate"
            >
              {session.title}
            </div>

            {/* Dropdown per session */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="opacity-0 group-hover:opacity-100 transition">
                  <MoreVertical size={16} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem>Rename</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    </div>
  );
}
