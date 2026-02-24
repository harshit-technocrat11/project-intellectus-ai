import ChatLayout from "@/components/chat/ChatLayout";
import { Card } from "@/components/ui/card";

export default function Copilot() {
  return (
    <div className="flex h-full gap-6">
      <Card className="flex-1 flex flex-col">
        <ChatLayout />
      </Card>
    </div>
  );
}
