import ChatLayout from "@/components/chat/ChatLayout";
import ChatSidebar from "@/components/chat/ChatSidebar";

export default function Copilot() {
  return (
    <div className="flex h-full bg-slate-50/50 p-4 lg:p-6 gap-4">
      {/* Chat Sessions Sidebar */}
      <div className="w-72 border rounded-xl bg-card flex-shrink-0">
        <ChatSidebar />
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden rounded-xl border bg-white shadow-sm">
        <ChatLayout />
      </div>
    </div>
  );
}
