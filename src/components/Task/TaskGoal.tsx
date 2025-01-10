import React from 'react';
import { Target, ChevronRight } from 'lucide-react';
import { Task } from '../../types/task';

export function TaskGoal({ task }: { task: Task }) {
  const completedSteps = task.steps.filter(s => s.status === 'completed').length;
  const progress = (completedSteps / task.steps.length) * 100;

  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5 text-blue-500" />
        <h3 className="font-medium">Main Goal</h3>
      </div>

      <div className="space-y-4">
        <p className="text-gray-700">{task.description}</p>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div 
              className="bg-blue-500 rounded-full h-2 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="space-y-2">
          {task.steps.map((step, index) => (
            <div 
              key={step.id}
              className="flex items-center gap-2 text-sm"
            >
              <ChevronRight className={`w-4 h-4 ${
                step.status === 'completed' ? 'text-green-500' :
                step.status === 'in_progress' ? 'text-blue-500' :
                'text-gray-400'
              }`} />
              <span className={step.status === 'completed' ? 'line-through text-gray-500' : ''}>
                {step.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
