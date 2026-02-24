import ChatLayout from "@/components/chat/ChatLayout";
import ChatSidebar from "@/components/chat/ChatSidebar";

export default function Copilot() {
  return (
    <div className="flex h-full gap-6">
      {/* Chat Sessions Sidebar */}
      <div className="w-72 border rounded-xl bg-card">
        <ChatSidebar />
      </div>

      {/* Chat Area */}
      <div className="flex-1 border rounded-xl bg-card">
        <ChatLayout />
      </div>
    </div>
  );
}
