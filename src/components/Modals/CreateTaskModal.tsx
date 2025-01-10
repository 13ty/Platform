import React from 'react';
import { useTaskStore } from '../../store/taskStore';
import { useAgentStore } from '../../store/agentStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateTaskModal({ isOpen, onClose }: Props) {
  const { addTask } = useTaskStore();
  const { agents } = useAgentStore();
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    agents: [] as string[],
    userInteraction: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({
      id: Date.now().toString(),
      ...formData
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Create New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData(d => ({ ...d, title: e.target.value }))}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData(d => ({ ...d, description: e.target.value }))}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Agents</label>
            <select
              multiple
              value={formData.agents}
              onChange={e => setFormData(d => ({
                ...d,
                agents: Array.from(e.target.selectedOptions, option => option.value)
              }))}
              className="w-full px-3 py-2 border rounded"
            >
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
              id="userInteraction"
              checked={formData.userInteraction}
              onChange={e => setFormData(d => ({ ...d, userInteraction: e.target.checked }))}
            />
            <label htmlFor="userInteraction" className="text-sm">
              Enable User Interaction
            </label>
          </div>
          <div className="flex justify-end gap-2">
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
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
