import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Props {
  onSend: (text: string) => void;
  loading: boolean;
}

export default function ChatInput({ onSend, loading }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim() || loading) return;
    onSend(value);
    setValue("");
  };

  return (
    <div className="border-t p-4 flex gap-3">
      <Input
        placeholder="Ask something..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
      />

      <Button onClick={handleSubmit} disabled={loading}>
        <Send size={16} />
      </Button>
    </div>
  );
}
