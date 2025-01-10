import { create } from 'zustand';
import { toast } from 'sonner';

export interface Source {
  id: string;
  name: string;
  description: string;
  role: string;
  readOnly: boolean;
  type: string;
  content: string | ArrayBuffer;
  projectId: string;
  created_at: number;
}

interface SourceState {
  sources: Source[];
  addSource: (source: Source) => void;
  removeSource: (id: string) => void;
  getSourceById: (id: string) => Source | undefined;
  getSourcesByProject: (projectId: string) => Source[];
}

export const useSourceStore = create<SourceState>((set, get) => ({
  sources: [],
  
  addSource: (source) => {
    set((state) => ({
      sources: [...state.sources, source]
    }));
    toast.success('Source added successfully');
  },
  
  removeSource: (id) => {
    set((state) => ({
      sources: state.sources.filter(s => s.id !== id)
    }));
    toast.success('Source removed successfully');
  },
  
  getSourceById: (id) => {
    return get().sources.find(s => s.id === id);
  },
  
  getSourcesByProject: (projectId) => {
    return get().sources.filter(s => s.projectId === projectId);
  }
}));
