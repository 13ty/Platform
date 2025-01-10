import React from 'react';
import { Editor } from '@monaco-editor/react';
import { FileJson, Play } from 'lucide-react';
import { useAgentStore } from '../store/agentStore';

export function TaskConfig() {
  const { setTask } = useAgentStore();
  const [taskJson, setTaskJson] = React.useState('');

  const handleStart = () => {
    try {
      const task = JSON.parse(taskJson);
      setTask(task);
    } catch (e) {
      console.error('Invalid JSON');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FileJson className="w-5 h-5" />
          Task Configuration
        </h2>
        <button
          onClick={handleStart}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          <Play className="w-4 h-4" />
        </button>
      </div>

      <Editor
        height="200px"
        defaultLanguage="json"
        value={taskJson}
        onChange={(value) => setTaskJson(value || '')}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
        }}
      />
    </div>
  );
}
