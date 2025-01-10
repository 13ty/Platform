import { create } from 'zustand';

type View = 'chat' | 'project' | 'task' | 'agent';

interface ViewState {
  activeView: View;
  setActiveView: (view: View) => void;
}

export const useViewStore = create<ViewState>((set) => ({
  activeView: 'chat',
  setActiveView: (view) => set({ activeView: view }),
}));
