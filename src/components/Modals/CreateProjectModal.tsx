import React from 'react';
import { useProjectStore } from '../../store/projectStore';
import { toast } from 'sonner';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateProjectModal({ isOpen, onClose }: Props) {
  const { addProject } = useProjectStore();
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    settings: {
      autoSave: true,
      userInteractionDefault: false,
      saveInterval: 30000, // 30 seconds
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProject({
        id: crypto.randomUUID(),
        ...formData,
        created_at: Date.now(),
        updated_at: Date.now(),
      });
      toast.success('Project created successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to create project');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Create New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData(d => ({ ...d, name: e.target.value }))}
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
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="autoSave"
                checked={formData.settings.autoSave}
                onChange={e => setFormData(d => ({
                  ...d,
                  settings: { ...d.settings, autoSave: e.target.checked }
                }))}
              />
              <label htmlFor="autoSave" className="text-sm">Enable Auto-save</label>
            </div>
            {formData.settings.autoSave && (
              <div>
                <label className="block text-sm font-medium mb-1">Save Interval (seconds)</label>
                <input
                  type="number"
                  value={formData.settings.saveInterval / 1000}
                  onChange={e => setFormData(d => ({
                    ...d,
                    settings: { ...d.settings, saveInterval: Number(e.target.value) * 1000 }
                  }))}
                  className="w-full px-3 py-2 border rounded"
                  min={5}
                  max={300}
                />
              </div>
            )}
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
