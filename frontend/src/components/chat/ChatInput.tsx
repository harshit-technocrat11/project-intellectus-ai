import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  onSend: (message: string) => void;
  loading: boolean;
};

export default function ChatInput({ onSend, loading }: Props) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Ask something..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={loading}
      />
      <Button onClick={handleSend} disabled={loading}>
        Send
      </Button>
    </div>
  );
}
