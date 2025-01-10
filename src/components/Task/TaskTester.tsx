import React from 'react';
import { BeakerIcon, AlertTriangle, Clock } from 'lucide-react';
import { TaskValidator } from '../../utils/testing/taskValidator';
import { Task } from '../../types/task';

export function TaskTester({ task }: { task: Task }) {
  const [results, setResults] = React.useState<any>(null);
  const validator = new TaskValidator();

  const runTests = () => {
    // Validate structure
    const validation = validator.validateTaskStructure(task);
    
    // Simulate execution
    const execution = validator.simulateTaskExecution(task);
    
    setResults({ validation, execution });
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <BeakerIcon className="w-5 h-5 text-purple-500" />
          <h3 className="font-medium">Task Validation</h3>
        </div>
        
        <button
          onClick={runTests}
          className="px-3 py-1.5 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Run Tests
        </button>
      </div>

      {results && (
        <div className="space-y-4">
          {/* Validation Results */}
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium mb-2">Structure Validation</h4>
            {results.validation.valid ? (
              <div className="text-green-500">✓ Task structure is valid</div>
            ) : (
              <div className="space-y-1">
                {results.validation.errors.map((error: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-red-500">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Execution Results */}
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium mb-2">Execution Simulation</h4>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>Total Time: {results.execution.totalTimeMs}ms</span>
              </div>

              {results.execution.bottlenecks.length > 0 && (
                <div className="text-orange-500">
                  <h5 className="font-medium">Potential Bottlenecks:</h5>
                  <ul className="list-disc list-inside">
                    {results.execution.bottlenecks.map((b: string, i: number) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-2">
                <h5 className="font-medium mb-1">Step Results:</h5>
                <div className="space-y-1">
                  {results.execution.stepResults.map((result: any, i: number) => (
                    <div 
                      key={i}
                      className={`text-sm p-2 rounded ${
                        result.success ? 'bg-green-50' : 'bg-red-50'
                      }`}
                    >
                      Step {i + 1}: {result.success ? '✓' : '✗'} 
                      ({result.timeMs}ms, {result.memory}MB)
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
