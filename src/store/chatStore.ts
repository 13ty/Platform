import { create } from 'zustand';
import type { ChatMessage, ChatSession } from '../types/chat';
import { toast } from 'sonner';

interface ChatState {
  sessions: ChatSession[];
  activeSession: ChatSession | null;
  isProcessing: boolean;
  createSession: (agentIds: string[]) => void;
  addMessage: (message: ChatMessage) => void;
  setProcessing: (processing: boolean) => void;
  pauseSession: () => void;
  resumeSession: () => void;
  endSession: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  sessions: [],
  activeSession: null,
  isProcessing: false,

  createSession: (agentIds) => {
    const session: ChatSession = {
      id: crypto.randomUUID(),
      messages: [],
      activeAgents: agentIds,
      status: 'active',
      created_at: Date.now(),
      updated_at: Date.now()
    };

    set((state) => ({
      sessions: [...state.sessions, session],
      activeSession: session
    }));
    
    toast.success('Chat session started');
  },

  addMessage: (message) => {
    set((state) => {
      if (!state.activeSession) return state;

      const updatedSession = {
        ...state.activeSession,
        messages: [...state.activeSession.messages, message],
        updated_at: Date.now()
      };

      return {
        sessions: state.sessions.map(s => 
          s.id === updatedSession.id ? updatedSession : s
        ),
        activeSession: updatedSession
      };
    });
  },

  setProcessing: (processing) => set({ isProcessing: processing }),

  pauseSession: () => {
    set((state) => {
      if (!state.activeSession) return state;
      
      const updatedSession = {
        ...state.activeSession,
        status: 'paused' as const
      };

      return {
        sessions: state.sessions.map(s => 
          s.id === updatedSession.id ? updatedSession : s
        ),
        activeSession: updatedSession
      };
    });
    toast.info('Chat session paused');
  },

  resumeSession: () => {
    set((state) => {
      if (!state.activeSession) return state;
      
      const updatedSession = {
        ...state.activeSession,
        status: 'active' as const
      };

      return {
        sessions: state.sessions.map(s => 
          s.id === updatedSession.id ? updatedSession : s
        ),
        activeSession: updatedSession
      };
    });
    toast.success('Chat session resumed');
  },

  endSession: () => {
    set((state) => {
      if (!state.activeSession) return state;
      
      const updatedSession = {
        ...state.activeSession,
        status: 'completed' as const
      };

      return {
        sessions: state.sessions.map(s => 
          s.id === updatedSession.id ? updatedSession : s
        ),
        activeSession: null
      };
    });
    toast.info('Chat session ended');
  }
}));
