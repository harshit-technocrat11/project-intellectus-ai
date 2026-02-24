import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function ChatInput() {
  const [value, setValue] = useState("");

  return (
    <div className="border-t p-4 flex gap-3">
      <Input
        placeholder="Ask something..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button>
        <Send size={16} />
      </Button>
    </div>
  );
}
