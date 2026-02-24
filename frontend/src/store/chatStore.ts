import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ChatMessage, ChatSession } from "@/types/chat.ts";

interface ChatStore {
  sessions: ChatSession[];
  activeSessionId: string | null;

  createSession: () => void;
  switchSession: (id: string) => void;
  addMessage: (message: ChatMessage) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      sessions: [],
      activeSessionId: null,

      createSession: () => {
        const newSession: ChatSession = {
          id: crypto.randomUUID(),
          title: "New Chat",
          messages: [],
        };

        set((state) => ({
          sessions: [newSession, ...state.sessions],
          activeSessionId: newSession.id,
        }));
      },

      switchSession: (id) => {
        set({ activeSessionId: id });
      },

      addMessage: (message) => {
        const { sessions, activeSessionId } = get();
        if (!activeSessionId) return;

        const updatedSessions = sessions.map((session) =>
          session.id === activeSessionId
            ? {
                ...session,
                messages: [...session.messages, message],
              }
            : session,
        );

        set({ sessions: updatedSessions });
      },
    }),
    {
      name: "chat-storage",
    },
  ),
);
