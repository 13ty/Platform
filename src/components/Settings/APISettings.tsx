import React from 'react';
import { useSettingsStore } from '../../store/settingsStore';
import { APIStatusIndicator } from './APIStatusIndicator';
import { OllamaService } from '../../utils/llm/ollamaService';
import { LMStudioService } from '../../utils/llm/lmStudioService';

export function APISettings() {
  const { apiStatus, updateApiStatus } = useSettingsStore();
  const [loading, setLoading] = React.useState(false);

  const testConnections = async () => {
    setLoading(true);
    try {
      // Test Ollama
      const ollama = new OllamaService(apiStatus.ollama.url);
      const ollamaConnected = await ollama.testConnection();
      const ollamaModels = ollamaConnected ? await ollama.getModels() : [];
      updateApiStatus('ollama', { connected: ollamaConnected, models: ollamaModels });

      // Test LM Studio
      const lmStudio = new LMStudioService(apiStatus.lmStudio.url);
      const lmStudioConnected = await lmStudio.testConnection();
      const lmStudioModels = lmStudioConnected ? await lmStudio.getModels() : [];
      updateApiStatus('lmStudio', { connected: lmStudioConnected, models: lmStudioModels });

      // Add similar tests for OpenAI and Anthropic
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {Object.entries(apiStatus).map(([provider, status]) => (
        <div key={provider} className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium">{provider} API</label>
            <APIStatusIndicator 
              connected={status.connected} 
              label={status.connected ? 'Connected' : 'Disconnected'} 
            />
          </div>
          <input
            type="text"
            value={status.url}
            onChange={(e) => updateApiStatus(provider as keyof typeof apiStatus, { url: e.target.value })}
            className="w-full px-3 py-2 border rounded"
            placeholder={`Enter ${provider} API URL`}
          />
          {status.connected && status.models.length > 0 && (
            <select className="w-full px-3 py-2 border rounded">
              {status.models.map((model) => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          )}
        </div>
      ))}
      <button
        onClick={testConnections}
        disabled={loading}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Testing Connections...' : 'Test Connections'}
      </button>
    </div>
  );
}
