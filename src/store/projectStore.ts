import { create } from 'zustand';
import type { Project } from '../types';
import { DatabaseService } from '../utils/database';
import { toast } from 'sonner';

interface ProjectState {
  projects: Project[];
  activeProject: Project | null;
  isLoading: boolean;
  error: string | null;
}

interface ProjectActions {
  loadProjects: () => Promise<void>;
  addProject: (project: Project) => Promise<void>;
  setActiveProject: (id: string) => void;
  deleteProject: (id: string) => Promise<void>;
}

const DEFAULT_SAVE_INTERVAL = 600000; // 600 seconds = 10 minutes

const db = new DatabaseService();

export const useProjectStore = create<ProjectState & ProjectActions>()((set, get) => ({
  projects: [],
  activeProject: null,
  isLoading: false,
  error: null,

  loadProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const projects = await db.getProjects();
      // Ensure all projects have the correct save interval
      const updatedProjects = projects.map(project => ({
        ...project,
        settings: {
          ...project.settings,
          saveInterval: DEFAULT_SAVE_INTERVAL
        }
      }));
      set({ projects: updatedProjects, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  addProject: async (project) => {
    set({ isLoading: true, error: null });
    try {
      // Ensure new projects have the correct save interval
      const projectWithSettings = {
        ...project,
        settings: {
          ...project.settings,
          saveInterval: DEFAULT_SAVE_INTERVAL
        }
      };
      await db.saveProject(projectWithSettings);
      set((state) => ({
        projects: [...state.projects, projectWithSettings],
        activeProject: projectWithSettings,
        isLoading: false
      }));
      toast.success('Project created successfully');
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      toast.error('Failed to create project');
    }
  },

  setActiveProject: (id) => {
    const project = get().projects.find(p => p.id === id);
    if (project) {
      set({ activeProject: project });
      toast.success(`Switched to project: ${project.name}`);
    }
  },

  deleteProject: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await db.deleteProject(id);
      set((state) => ({
        projects: state.projects.filter(p => p.id !== id),
        activeProject: state.activeProject?.id === id ? null : state.activeProject,
        isLoading: false
      }));
      toast.success('Project deleted successfully');
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      toast.error('Failed to delete project');
    }
  }
}));
