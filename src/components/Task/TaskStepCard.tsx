import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';
import { TaskStep } from '../../types/task';
import clsx from 'clsx';

interface Props {
  step: TaskStep;
  index: number;
  isStrictMode: boolean;
}

export function TaskStepCard({ step, index, isStrictMode }: Props) {
  const statusIcons = {
    pending: <Clock className="w-4 h-4 text-gray-500" />,
    in_progress: <AlertCircle className="w-4 h-4 text-blue-500" />,
    completed: <CheckCircle className="w-4 h-4 text-green-500" />,
    failed: <XCircle className="w-4 h-4 text-red-500" />
  };

  return (
    <div className={clsx(
      'p-3 rounded-lg border',
      step.status === 'completed' ? 'border-green-200 bg-green-50' :
      step.status === 'failed' ? 'border-red-200 bg-red-50' :
      step.status === 'in_progress' ? 'border-blue-200 bg-blue-50' :
      'border-gray-200 bg-gray-50'
    )}>
      <div className="flex items-center gap-2 mb-2">
        {statusIcons[step.status]}
        <span className="font-medium">Step {index + 1}</span>
      </div>
      
      <p className="text-sm mb-2">{step.description}</p>
      
      {step.result && (
        <div className="text-sm bg-white p-2 rounded mb-2">
          <div className="font-medium mb-1">Result:</div>
          {step.result}
        </div>
      )}
      
      {isStrictMode && step.audit_result && (
        <div className={clsx(
          'text-sm p-2 rounded',
          step.audit_result.passed ? 'bg-green-100' : 'bg-red-100'
        )}>
          <div className="font-medium mb-1">Audit:</div>
          <p className="mb-1">{step.audit_result.reasoning}</p>
          {step.audit_result.suggestions && step.audit_result.suggestions.length > 0 && (
            <div>
              <div className="font-medium mb-1">Suggestions:</div>
              <ul className="list-disc list-inside">
                {step.audit_result.suggestions.map((suggestion, i) => (
                  <li key={i} className="text-xs">{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
