import React from 'react';
import { Crown, CheckCircle, AlertCircle } from 'lucide-react';
import { useTaskStore } from '../../store/taskStore';
import { useAgentStore } from '../../store/agentStore';
import { Task, TaskStep } from '../../types/task';

export function TaskLeader({ task }: { task: Task }) {
  const { agents } = useAgentStore();
  const { updateTaskStep } = useTaskStore();
  
  const leader = agents.find(a => a.id === task.agents[0]);
  const currentStep = task.steps.find(s => s.status === 'in_progress');

  const evaluateStepResult = (step: TaskStep) => {
    const success = Math.random() > 0.2; // Replace with actual evaluation logic
    updateTaskStep(task.id, step.id, {
      status: success ? 'completed' : 'failed',
      evaluation: {
        passed: success,
        feedback: success ? 'Goal achieved successfully' : 'Needs improvement',
        nextSteps: success ? 'Proceeding to next step' : 'Please revise and try again'
      }
    });
  };

  return (
    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
      <div className="flex items-center gap-2 mb-4">
        <Crown className="w-5 h-5 text-amber-500" />
        <h3 className="font-medium">Task Leader: {leader?.name}</h3>
      </div>

      {currentStep && (
        <div className="space-y-2">
          <div className="text-sm text-gray-600">Current Focus:</div>
          <div className="p-3 bg-white rounded border border-amber-100">
            {currentStep.description}
          </div>
          
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => evaluateStepResult(currentStep)}
              className="flex items-center gap-2 px-3 py-1.5 bg-amber-500 text-white rounded-md hover:bg-amber-600"
            >
              <CheckCircle className="w-4 h-4" />
              Evaluate Result
            </button>
            
            <button
              onClick={() => {/* Add clarification logic */}}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200"
            >
              <AlertCircle className="w-4 h-4" />
              Request Clarification
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
