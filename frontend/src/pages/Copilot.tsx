import ChatContainer from "@/components/chat/ChatContainer";

export default function Copilot() {
  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col">
        <ChatContainer />
      </div>
    </div>
  );
}
