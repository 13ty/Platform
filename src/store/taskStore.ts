import { create } from 'zustand';
import { Task, TaskStep, StepEvaluation } from '../types/task';
import { toast } from 'sonner';

interface TaskState {
  tasks: Task[];
  activeTask: Task | null;
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  updateTaskStep: (taskId: string, stepId: string, updates: Partial<TaskStep>) => void;
  evaluateStep: (taskId: string, stepId: string, evaluation: StepEvaluation) => void;
  setActiveTask: (taskId: string | null) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  activeTask: null,

  addTask: (task) => {
    set((state) => ({
      tasks: [...state.tasks, task],
      activeTask: task
    }));
    toast.success('Task created successfully');
  },

  updateTask: (taskId, updates) => {
    set((state) => ({
      tasks: state.tasks.map(task =>
        task.id === taskId
          ? { ...task, ...updates, updated_at: Date.now() }
          : task
      )
    }));
  },

  updateTaskStep: (taskId, stepId, updates) => {
    set((state) => ({
      tasks: state.tasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              steps: task.steps.map(step =>
                step.id === stepId
                  ? { ...step, ...updates, updated_at: Date.now() }
                  : step
              ),
              updated_at: Date.now()
            }
          : task
      )
    }));
  },

  evaluateStep: (taskId, stepId, evaluation) => {
    set((state) => ({
      tasks: state.tasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              steps: task.steps.map(step =>
                step.id === stepId
                  ? {
                      ...step,
                      status: evaluation.passed ? 'completed' : 'failed',
                      evaluation,
                      updated_at: Date.now()
                    }
                  : step
              )
            }
          : task
      )
    }));
    
    toast.success(
      evaluation.passed 
        ? 'Step completed successfully' 
        : 'Step needs revision'
    );
  },

  setActiveTask: (taskId) => {
    set((state) => ({
      activeTask: taskId ? state.tasks.find(t => t.id === taskId) || null : null
    }));
  },
}));
