import { create } from "zustand";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
  traceData?: {
    sql?: string;
    matchScore?: string;
    reasoning?: string;
    sourceName?: string;
  };
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
  activeMessageId: string | null; // For the SourceSidebar

  // Session Actions
  addChat: () => void;
  setActiveChat: (id: string) => void;
  deleteChat: (id: string) => void;
  renameChat: (id: string, newTitle: string) => void;

  // Message Actions
  addMessage: (chatId: string, message: Omit<Message, "id" | "time">) => void;
  setActiveMessage: (id: string | null) => void;
  clearMessages: (chatId: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chats: [
    {
      id: "1",
      title: "Q3 Revenue Deep Dive",
      time: "2 mins ago",
      messages: [
        {
          id: "m1",
          role: "assistant",
          content:
            "Hello! I'm connected to your Neon DB. How can I help with your financial data today?",
          time: "12:00 PM",
        },
      ],
    },
  ],
  activeChatId: "1",
  activeMessageId: null,

  setActiveChat: (id) => set({ activeChatId: id, activeMessageId: null }),

  setActiveMessage: (id) => set({ activeMessageId: id }),

  addChat: () =>
    set((state) => {
      const newChat: ChatSession = {
        id: Date.now().toString(),
        title: "New Chat",
        time: "Just now",
        messages: [],
      };
      return { chats: [newChat, ...state.chats], activeChatId: newChat.id };
    }),

  addMessage: (chatId, message) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  ...message,
                  id: Math.random().toString(36).substring(7),
                  time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                },
              ],
            }
          : chat,
      ),
    })),

  clearMessages: (chatId) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId ? { ...chat, messages: [] } : chat,
      ),
    })),

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
