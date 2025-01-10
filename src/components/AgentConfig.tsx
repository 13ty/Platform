import React from 'react';
import { Editor } from '@monaco-editor/react';
import { Settings, Plus, Trash2 } from 'lucide-react';
import { useAgentStore } from '../store/agentStore';

export function AgentConfig() {
  const { agents, addAgent, removeAgent } = useAgentStore();
  const [configJson, setConfigJson] = React.useState('');

  const handleSave = () => {
    try {
      const config = JSON.parse(configJson);
      addAgent(config);
    } catch (e) {
      console.error('Invalid JSON');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Agent Configuration
        </h2>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      <Editor
        height="200px"
        defaultLanguage="json"
        value={configJson}
        onChange={(value) => setConfigJson(value || '')}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
        }}
      />

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Configured Agents</h3>
        <div className="space-y-2">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <div>
                <span className="font-medium">{agent.name}</span>
                <span className="text-sm text-gray-500 ml-2">
                  ({agent.provider})
                </span>
              </div>
              <button
                onClick={() => removeAgent(agent.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
