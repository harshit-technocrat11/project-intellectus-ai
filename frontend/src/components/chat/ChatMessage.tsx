import { cn } from "@/lib/utils";

type Props ={
    role: "user" | "assistant",
    content: string
}

export default function ChatMessage ( {role, content} :Props){
    const isUser =  role =="user"

    return (
      <div className="flex w-full">
        <div
          className={cn(
            "max-w-2xl rounded-xl px-4 py-3 text-sm shadow-sm",
            isUser ? "ml-auto bg-primary text-primary-foreground" : "bg-muted",
          )}
        >
          {content}
        </div>
      </div>
    );
}