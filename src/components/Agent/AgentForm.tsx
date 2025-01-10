import React from 'react';
import { useAgentStore } from '../../store/agentStore';
import { AgentManager } from '../../utils/agents/AgentManager';
import { toast } from 'sonner';

interface Props {
  onSuccess?: () => void;
}

export function AgentForm({ onSuccess }: Props) {
  const { addAgent } = useAgentStore();
  const [loading, setLoading] = React.useState(false);
  const [availableModels, setAvailableModels] = React.useState<string[]>([]);
  const agentManager = new AgentManager();

  const [formData, setFormData] = React.useState({
    name: '',
    provider: 'ollama',
    model: '',
    instruction: '',
    baseUrl: ''
  });

  const fetchModels = async () => {
    setLoading(true);
    try {
      const models = await agentManager.getAvailableModels({
        ...formData,
        id: '',
        projectId: ''
      });
      setAvailableModels(models);
    } catch (error) {
      toast.error('Failed to fetch models');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchModels();
  }, [formData.provider, formData.baseUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const agentId = crypto.randomUUID();
      addAgent({
        id: agentId,
        ...formData,
        baseUrl: formData.baseUrl || (
          formData.provider === 'ollama' 
            ? 'http://localhost:11434' 
            : formData.provider === 'lmstudio'
              ? 'http://localhost:1234'
              : formData.provider === 'lmstudio2'
                ? 'http://localhost:1235'
                : 'http://localhost:1236'
        ),
        projectId: ''
      });

      onSuccess?.();
      toast.success('Agent created successfully');
    } catch (error) {
      toast.error('Failed to create agent');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form fields remain the same */}
      <div>
        <label className="block text-sm font-medium mb-1">Model</label>
        <select
          value={formData.model}
          onChange={(e) => setFormData(d => ({ ...d, model: e.target.value }))}
          className="w-full px-3 py-2 border rounded"
          required
        >
          <option value="">Select a model</option>
          {availableModels.map(model => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>
      </div>
      {/* Other form fields */}
    </form>
  );
}
