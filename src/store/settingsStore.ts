import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface APIStatus {
  connected: boolean;
  url: string;
  models: string[];
  apiKey?: string;
  muted?: boolean;
}

interface SettingsState {
  darkMode: boolean;
  userInteractionEnabled: boolean;
  autoSave: boolean;
  autoSaveInterval: number;
  apiStatus: {
    [key: string]: APIStatus;
  };
}

interface SettingsActions {
  toggleDarkMode: () => void;
  toggleUserInteraction: () => void;
  toggleAutoSave: () => void;
  setAutoSaveInterval: (interval: number) => void;
  updateApiStatus: (provider: string, updates: Partial<APIStatus>) => void;
  addProviderInstance: (provider: string) => void;
  removeProviderInstance: (provider: string) => void;
  resetSettings: () => void;
}

const initialState: SettingsState = {
  darkMode: false,
  userInteractionEnabled: false,
  autoSave: true,
  autoSaveInterval: 600,
  apiStatus: {
    ollama: { connected: false, url: 'http://localhost:11434', models: [], muted: false },
    lmstudio: { connected: false, url: 'http://localhost:1234', models: [], muted: false },
    openrouter: { connected: false, url: 'https://openrouter.ai/api', models: [], apiKey: '', muted: false },
    google: { connected: false, url: 'https://generativelanguage.googleapis.com', models: [], apiKey: '', muted: false },
    openai: { connected: false, url: 'https://api.openai.com', models: [], apiKey: '', muted: false }
  }
};

export const useSettingsStore = create<SettingsState & SettingsActions>()(
  persist(
    (set) => ({
      ...initialState,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      toggleUserInteraction: () => set((state) => ({ userInteractionEnabled: !state.userInteractionEnabled })),
      toggleAutoSave: () => set((state) => ({ autoSave: !state.autoSave })),
      setAutoSaveInterval: (interval) => set({ autoSaveInterval: interval }),
      updateApiStatus: (provider, updates) => set((state) => ({
        apiStatus: {
          ...state.apiStatus,
          [provider]: { ...state.apiStatus[provider], ...updates }
        }
      })),
      addProviderInstance: (provider) => set((state) => ({
        apiStatus: {
          ...state.apiStatus,
          [provider]: {
            connected: false,
            url: '',
            models: [],
            muted: false
          }
        }
      })),
      removeProviderInstance: (provider) => set((state) => {
        const { [provider]: removed, ...rest } = state.apiStatus;
        return { apiStatus: rest };
      }),
      resetSettings: () => set(initialState)
    }),
    { 
      name: 'settings-storage'
    }
  )
);
