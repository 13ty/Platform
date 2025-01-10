import React from 'react';
import { useTaskStore } from '../../store/taskStore';
import { useAgentStore } from '../../store/agentStore';
import { Task } from '../../types/task';
import { toast } from 'sonner';

interface Props {
  onSuccess?: () => void;
}

export function TaskForm({ onSuccess }: Props) {
  const { addTask } = useTaskStore();
  const { agents } = useAgentStore();
  const [showJsonInput, setShowJsonInput] = React.useState(false);
  const [jsonConfig, setJsonConfig] = React.useState('');
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    agents: [] as string[],
    strictMode: false,
    auditAgent: '',
    steps: [{ description: '' }]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const taskData: Task = showJsonInput 
        ? JSON.parse(jsonConfig)
        : {
            id: crypto.randomUUID(),
            ...formData,
            status: 'pending',
            steps: formData.steps.map(step => ({
              id: crypto.randomUUID(),
              description: step.description,
              status: 'pending'
            })),
            created_at: Date.now(),
            updated_at: Date.now()
          };

      addTask(taskData);
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Create New Task</h3>
        <button
          type="button"
          onClick={() => setShowJsonInput(!showJsonInput)}
          className="text-sm text-blue-500 hover:text-blue-600"
        >
          Switch to {showJsonInput ? 'Form' : 'JSON'} Input
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {showJsonInput ? (
          <div>
            <label className="block text-sm font-medium mb-1">JSON Configuration</label>
            <textarea
              value={jsonConfig}
              onChange={(e) => setJsonConfig(e.target.value)}
              className="w-full px-3 py-2 border rounded font-mono text-sm"
              rows={10}
              placeholder={`{
  "title": "Create Storyboard Framework",
  "description": "Develop a framework for creating storyboards and planning documents",
  "agents": ["agent-id-1", "agent-id-2"],
  "strictMode": true,
  "auditAgent": "agent-id-3",
  "steps": [
    {
      "description": "Define core components of the framework"
    },
    {
      "description": "Create documentation structure"
    }
  ]
}`}
              required
            />
          </div>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(d => ({ ...d, title: e.target.value }))}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(d => ({ ...d, description: e.target.value }))}
                className="w-full px-3 py-2 border rounded"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Assigned Agents</label>
              <select
                multiple
                value={formData.agents}
                onChange={(e) => setFormData(d => ({
                  ...d,
                  agents: Array.from(e.target.selectedOptions, option => option.value)
                }))}
                className="w-full px-3 py-2 border rounded"
                required
              >
                {agents.map(agent => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Audit Agent</label>
              <select
                value={formData.auditAgent}
                onChange={(e) => setFormData(d => ({ ...d, auditAgent: e.target.value }))}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Select an agent for auditing</option>
                {agents.map(agent => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="strictMode"
                checked={formData.strictMode}
                onChange={(e) => setFormData(d => ({ ...d, strictMode: e.target.checked }))}
                className="rounded border-gray-300"
              />
              <label htmlFor="strictMode" className="text-sm">
                Enable Strict Mode (Require audit approval for each step)
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Steps</label>
              <div className="space-y-2">
                {formData.steps.map((step, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={step.description}
                      onChange={(e) => {
                        const newSteps = [...formData.steps];
                        newSteps[index].description = e.target.value;
                        setFormData(d => ({ ...d, steps: newSteps }));
                      }}
                      className="flex-1 px-3 py-2 border rounded"
                      placeholder={`Step ${index + 1}`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newSteps = formData.steps.filter((_, i) => i !== index);
                        setFormData(d => ({ ...d, steps: newSteps }));
                      }}
                      className="px-3 py-2 text-red-500 hover:bg-red-50 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setFormData(d => ({
                    ...d,
                    steps: [...d.steps, { description: '' }]
                  }))}
                  className="w-full px-3 py-2 text-blue-500 hover:bg-blue-50 rounded border border-dashed"
                >
                  Add Step
                </button>
              </div>
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}
