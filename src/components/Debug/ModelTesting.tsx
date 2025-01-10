import React from 'react';
import { Activity } from 'lucide-react';
import { ModelTester } from '../../utils/testing/modelTester';
import { toast } from 'sonner';

export function ModelTesting() {
  const [selectedProvider, setSelectedProvider] = React.useState<'ollama' | 'lmstudio'>('ollama');
  const [selectedModel, setSelectedModel] = React.useState('');
  const [testResults, setTestResults] = React.useState<any>(null);
  const [isTesting, setIsTesting] = React.useState(false);

  const tester = new ModelTester();

  const runTest = async () => {
    if (!selectedModel) {
      toast.error('Please select a model first');
      return;
    }

    setIsTesting(true);
    try {
      const results = await tester.benchmarkModel(selectedProvider, selectedModel);
      setTestResults(results);
      toast.success('Model test completed');
    } catch (error) {
      toast.error('Test failed: ' + error.message);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold flex items-center gap-2">
        <Activity className="w-5 h-5" />
        Model Testing
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Provider</label>
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value as 'ollama' | 'lmstudio')}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="ollama">Ollama</option>
            <option value="lmstudio">LM Studio</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Model</label>
          <input
            type="text"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter model name"
          />
        </div>

        <button
          onClick={runTest}
          disabled={isTesting}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isTesting ? 'Running Tests...' : 'Run Tests'}
        </button>

        {testResults && (
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <h4 className="font-medium mb-2">Test Results</h4>
            <div className="space-y-2">
              <p>Average Latency: {testResults.averageLatency.toFixed(2)}ms</p>
              <p>Success Rate: {(testResults.successRate * 100).toFixed(1)}%</p>
              {testResults.errors.length > 0 && (
                <div>
                  <p className="text-red-500">Errors:</p>
                  <ul className="list-disc pl-5">
                    {testResults.errors.map((error: string, i: number) => (
                      <li key={i}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
