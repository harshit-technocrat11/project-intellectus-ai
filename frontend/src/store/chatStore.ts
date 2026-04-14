import { create } from "zustand";

export interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: string;
  confidence?: "high" | "review" | "flagged"; // Drives the colored status dots [cite: 1598, 1660]
  sources?: string[];
}

export interface ChatSession {
  id: string;
  title: string;
  time: string;
  messages: Message[];
}

interface ChatStore {
  chats: ChatSession[];
  activeChatId: string | null;
  addChat: () => void;
  deleteChat: (id: string) => void;
  renameChat: (id: string, newTitle: string) => void;
  setActiveChat: (id: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chats: [
    {
      id: "1",
      title: "Q3 Revenue Deep Dive",
      time: "2 mins ago",
      messages: [],
    },
    {
      id: "2",
      title: "Inventory Optimization - EMEA",
      time: "1 hour ago",
      messages: [],
    },
    {
      id: "3",
      title: "Compute Cost Analysis",
      time: "Yesterday",
      messages: [],
    },
  ],
  activeChatId: "1",

  addChat: () =>
    set((state) => {
      const newChat: ChatSession = {
        id: crypto.randomUUID(),
        title: "New Analysis",
        time: "Just now",
        messages: [],
      };
      return { chats: [newChat, ...state.chats], activeChatId: newChat.id };
    }),

  deleteChat: (id) =>
    set((state) => {
      const remaining = state.chats.filter((c) => c.id !== id);
      return {
        chats: remaining,
        activeChatId:
          state.activeChatId === id
            ? remaining[0]?.id || null
            : state.activeChatId,
      };
    }),

  renameChat: (id, newTitle) =>
    set((state) => ({
      chats: state.chats.map((c) =>
        c.id === id ? { ...c, title: newTitle } : c,
      ),
    })),

  setActiveChat: (id) => set({ activeChatId: id }),
}));
