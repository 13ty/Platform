import React from 'react';
import { useAgentStore } from '../../store/agentStore';
import { LMStudioService } from '../../utils/llm/lmStudioService';
import { OllamaService } from '../../utils/llm/ollamaService';
import { toast } from 'sonner';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateAgentModal({ isOpen, onClose }: Props) {
  const { addAgent } = useAgentStore();
  const [formData, setFormData] = React.useState({
    name: '',
    provider: 'lmstudio',
    model: '',
    instruction: '',
    baseUrl: 'http://localhost:1234'
  });
  const [availableModels, setAvailableModels] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  const fetchModels = async () => {
    setLoading(true);
    try {
      let models: string[] = [];
      if (formData.provider === 'lmstudio') {
        const service = new LMStudioService(formData.baseUrl);
        models = await service.getModels();
      } else if (formData.provider === 'ollama') {
        const service = new OllamaService(formData.baseUrl);
        models = await service.getModels();
      }
      setAvailableModels(models);
    } catch (error) {
      console.error('Failed to fetch models:', error);
      toast.error('Could not connect to model provider');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (formData.provider && formData.baseUrl) {
      fetchModels();
    }
  }, [formData.provider, formData.baseUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      addAgent({
        id: crypto.randomUUID(),
        ...formData,
        projectId: ''
      });
      toast.success('Agent created successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to create agent');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Create New Agent</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData(d => ({ ...d, name: e.target.value }))}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter agent name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Provider</label>
            <select
              value={formData.provider}
              onChange={e => setFormData(d => ({ ...d, provider: e.target.value }))}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="lmstudio">LM Studio</option>
              <option value="ollama">Ollama</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Model</label>
            <select
              value={formData.model}
              onChange={e => setFormData(d => ({ ...d, model: e.target.value }))}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="">Select a model</option>
              {availableModels.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
            {loading && (
              <div className="text-sm text-gray-500 mt-1">Loading available models...</div>
            )}
            {!loading && availableModels.length === 0 && (
              <div className="text-sm text-red-500 mt-1">
                No models found. Please ensure {formData.provider} is running.
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Instructions</label>
            <textarea
              value={formData.instruction}
              onChange={e => setFormData(d => ({ ...d, instruction: e.target.value }))}
              className="w-full px-3 py-2 border rounded"
              rows={3}
              placeholder="Describe the agent's role and purpose..."
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={loading || !formData.model}
            >
              Create Agent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
