import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatLayout() {
  return (
    <div className="flex flex-col h-full">
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
}
