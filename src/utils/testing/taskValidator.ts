import type { Task, TaskStep } from '../../types/task';

export class TaskValidator {
  validateTaskStructure(task: Task): ValidationResult {
    const errors: string[] = [];
    
    // Basic validation
    if (!task.agents[0]) {
      errors.push('No leader assigned');
    }
    
    if (task.steps.length === 0) {
      errors.push('Task has no steps defined');
    }
    
    // Step validation
    const stepErrors = task.steps.map((step, index) => 
      this.validateStep(step, index)
    ).flat();
    
    return {
      valid: errors.length === 0 && stepErrors.length === 0,
      errors: [...errors, ...stepErrors]
    };
  }

  private validateStep(step: TaskStep, index: number): string[] {
    const errors: string[] = [];
    
    if (!step.description?.trim()) {
      errors.push(`Step ${index + 1}: Missing description`);
    }
    
    if (step.description?.length > 500) {
      errors.push(`Step ${index + 1}: Description too long`);
    }
    
    return errors;
  }

  simulateTaskExecution(task: Task): ExecutionResult {
    const results: StepResult[] = [];
    let totalTime = 0;
    
    for (const step of task.steps) {
      const stepResult = this.simulateStepExecution(step);
      results.push(stepResult);
      totalTime += stepResult.timeMs;
    }

    return {
      success: results.every(r => r.success),
      stepResults: results,
      totalTimeMs: totalTime,
      bottlenecks: this.identifyBottlenecks(results)
    };
  }

  private simulateStepExecution(step: TaskStep): StepResult {
    // Simulate realistic execution
    const timeMs = Math.floor(Math.random() * 1000) + 500;
    const success = Math.random() > 0.3;
    
    return {
      stepId: step.id,
      success,
      timeMs,
      memory: Math.floor(Math.random() * 100) + 50,
      errors: success ? [] : ['Simulated execution failure']
    };
  }

  private identifyBottlenecks(results: StepResult[]): string[] {
    const bottlenecks: string[] = [];
    
    // Time bottlenecks
    const slowSteps = results.filter(r => r.timeMs > 800);
    if (slowSteps.length > 0) {
      bottlenecks.push(`${slowSteps.length} steps took longer than expected`);
    }
    
    // Resource bottlenecks
    const highMemorySteps = results.filter(r => r.memory > 80);
    if (highMemorySteps.length > 0) {
      bottlenecks.push(`${highMemorySteps.length} steps used high memory`);
    }
    
    return bottlenecks;
  }
}

interface ValidationResult {
  valid: boolean;
  errors: string[];
}

interface StepResult {
  stepId: string;
  success: boolean;
  timeMs: number;
  memory: number;
  errors: string[];
}

interface ExecutionResult {
  success: boolean;
  stepResults: StepResult[];
  totalTimeMs: number;
  bottlenecks: string[];
}
