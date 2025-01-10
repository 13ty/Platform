import React from 'react';
import { ListTodo, Trash2, Shield } from 'lucide-react';
import { Task } from '../../types/task';
import { TaskStepCard } from './TaskStepCard';
import clsx from 'clsx';

interface Props {
  task: Task;
  onRemove: (id: string) => void;
}

export function TaskCard({ task, onRemove }: Props) {
  const completedSteps = task.steps.filter(s => s.status === 'completed').length;
  const progress = (completedSteps / task.steps.length) * 100;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2">
            <ListTodo className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold">{task.title}</h3>
          </div>
          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
        </div>
        <button 
          onClick={() => onRemove(task.id)}
          className="p-1 hover:bg-red-100 rounded text-red-500"
          title="Remove Task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {task.strictMode && (
        <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 p-2 rounded mb-4">
          <Shield className="w-4 h-4" />
          Strict Mode Enabled - Audit Required
        </div>
      )}

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 rounded-full h-2 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {task.steps.map((step, index) => (
          <TaskStepCard
            key={step.id}
            step={step}
            index={index}
            isStrictMode={task.strictMode}
          />
        ))}
      </div>
    </div>
  );
}
