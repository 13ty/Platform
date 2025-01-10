import React from 'react';
import { FileJson, Download } from 'lucide-react';
import { toast } from 'sonner';

interface JsonConfig {
  name: string;
  provider: 'ollama' | 'lmstudio';
  model: string;
  instruction: string;
  baseUrl?: string;
}

export function JsonGenerator() {
  const [config, setConfig] = React.useState<JsonConfig>({
    name: '',
    provider: 'ollama',
    model: '',
    instruction: ''
  });

  const generateJson = () => {
    try {
      const jsonContent = JSON.stringify({
        id: crypto.randomUUID(),
        ...config,
        projectId: ''
      }, null, 2);

      // Create and download file
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${config.name.toLowerCase().replace(/\s+/g, '-')}-config.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('JSON configuration generated successfully');
    } catch (error) {
      toast.error('Failed to generate JSON configuration');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium flex items-center gap-2">
        <FileJson className="w-4 h-4" />
        Generate JSON Configuration
      </h3>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Agent Name"
          value={config.name}
          onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-3 py-2 border rounded text-sm"
        />

        <select
          value={config.provider}
          onChange={(e) => setConfig(prev => ({ ...prev, provider: e.target.value as 'ollama' | 'lmstudio' }))}
          className="w-full px-3 py-2 border rounded text-sm"
        >
          <option value="ollama">Ollama</option>
          <option value="lmstudio">LM Studio</option>
        </select>

        <input
          type="text"
          placeholder="Model Name"
          value={config.model}
          onChange={(e) => setConfig(prev => ({ ...prev, model: e.target.value }))}
          className="w-full px-3 py-2 border rounded text-sm"
        />

        <textarea
          placeholder="Instruction/Role Description"
          value={config.instruction}
          onChange={(e) => setConfig(prev => ({ ...prev, instruction: e.target.value }))}
          className="w-full px-3 py-2 border rounded text-sm"
          rows={3}
        />

        <input
          type="text"
          placeholder="Base URL (optional)"
          value={config.baseUrl}
          onChange={(e) => setConfig(prev => ({ ...prev, baseUrl: e.target.value }))}
          className="w-full px-3 py-2 border rounded text-sm"
        />

        <button
          onClick={generateJson}
          disabled={!config.name || !config.model || !config.instruction}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          Generate JSON
        </button>
      </div>
    </div>
  );
}
