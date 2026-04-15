import { create } from "zustand";

export interface ChatSession {
  id: string;
  title: string;
  time: string;
}

interface ChatStore {
  chats: ChatSession[];
  activeChatId: string | null;
  addChat: () => void;
  setActiveChat: (id: string) => void;
  deleteChat: (id: string) => void;
  renameChat: (id: string, newTitle: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chats: [
    { id: "1", title: "Q3 Revenue Deep Dive", time: "2 mins ago" },
    { id: "2", title: "Inventory Optimization", time: "1 hour ago" },
  ],
  activeChatId: "1",

  addChat: () =>
    set((state) => {
      const newChat = {
        id: Date.now().toString(),
        title: "New Chat",
        time: "Just now",
      };
      return { chats: [newChat, ...state.chats], activeChatId: newChat.id };
    }),

  setActiveChat: (id) => set({ activeChatId: id }),

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
}));
