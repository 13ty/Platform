import { create } from 'zustand';
import type { Agent } from '../types';
import { toast } from 'sonner';

interface AgentState {
  agents: Agent[];
  addAgent: (agent: Agent) => void;
  removeAgent: (id: string) => void;
}

export const useAgentStore = create<AgentState>((set) => ({
  agents: [],
  addAgent: (agent) => {
    set((state) => ({ 
      agents: [...state.agents, agent] 
    }));
    toast.success(`Agent ${agent.name} created successfully`);
  },
  removeAgent: (id) => {
    set((state) => ({ 
      agents: state.agents.filter((a) => a.id !== id) 
    }));
    toast.success('Agent removed successfully');
  },
}));
