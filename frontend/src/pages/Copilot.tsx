import ChatLayout from "@/components/chat/ChatLayout";
import ChatSidebar from "@/components/chat/ChatSidebar";

export default function Copilot() {
  return (
    <div className="flex h-full flex-col bg-slate-50/50 p-4 lg:p-6">
      {/* Chat Sessions Sidebar */}
      <div className="w-72 border rounded-xl bg-card">
        <ChatSidebar />
      </div>

      {/* Chat Area */}
      <div className="mx-auto w-full max-w-5xl flex-1 overflow-hidden rounded-xl border bg-white shadow-sm">
        <ChatLayout />
      </div>
    </div>
  );
}
