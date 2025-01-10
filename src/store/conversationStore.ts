import { create } from 'zustand';
import type { Message } from '../types';

interface ConversationStore {
  isRunning: boolean;
  isPaused: boolean;
  autoSaveRound: number;
  messages: Message[];
  startConversation: () => void;
  pauseConversation: () => void;
  stopConversation: () => void;
  setAutoSaveRound: (round: number) => void;
  addMessage: (message: Message) => void;
  exportConversation: () => Promise<{
    messages: Message[];
    metadata: {
      exportedAt: number;
      autoSaveRound: number;
    };
  }>;
  importConversation: (data: any) => void;
}

export const useConversationStore = create<ConversationStore>((set, get) => ({
  isRunning: false,
  isPaused: false,
  autoSaveRound: 10,
  messages: [],

  startConversation: () => set({ isRunning: true, isPaused: false }),
  pauseConversation: () => set({ isPaused: true }),
  stopConversation: () => set({ isRunning: false, isPaused: false }),
  
  setAutoSaveRound: (round) => set({ autoSaveRound: round }),
  
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),

  exportConversation: async () => ({
    messages: get().messages,
    metadata: {
      exportedAt: Date.now(),
      autoSaveRound: get().autoSaveRound
    }
  }),

  importConversation: (data) => {
    if (data.messages && Array.isArray(data.messages)) {
      set({ messages: data.messages });
      if (data.metadata?.autoSaveRound) {
        set({ autoSaveRound: data.metadata.autoSaveRound });
      }
    }
  }
}));
