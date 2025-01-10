import { Agent } from './agent';

export interface Task {
  id: string;
  title: string;
  description: string;
  agents: string[];
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  steps: TaskStep[];
  created_at: number;
  updated_at: number;
  evaluation?: TaskEvaluation;
}

export interface TaskStep {
  id: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  assignedTo?: string;
  evaluation?: StepEvaluation;
  created_at: number;
  updated_at: number;
}

export interface StepEvaluation {
  passed: boolean;
  feedback: string;
  nextSteps?: string;
  evaluatedBy: string;
  evaluatedAt: number;
}

export interface TaskEvaluation {
  overallSuccess: boolean;
  feedback: string;
  recommendations: string[];
  evaluatedBy: string;
  evaluatedAt: number;
}
