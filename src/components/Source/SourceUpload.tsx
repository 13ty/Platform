import React from 'react';
import { Upload, Plus } from 'lucide-react';
import { useSourceStore } from '../../store/sourceStore';
import { useProjectStore } from '../../store/projectStore';
import { toast } from 'sonner';

export function SourceUpload() {
  const { addSource } = useSourceStore();
  const { activeProject } = useProjectStore();
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    role: '',
    readOnly: false
  });
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !activeProject) return;

    try {
      // Read file content
      const content = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result);
        reader.readAsArrayBuffer(file);
      });

      // Create source
      addSource({
        id: crypto.randomUUID(),
        name: file.name,
        description: formData.description,
        role: formData.role,
        readOnly: formData.readOnly,
        type: file.type,
        content,
        projectId: activeProject.id,
        created_at: Date.now()
      });

      // Reset form
      setFormData({
        name: '',
        description: '',
        role: '',
        readOnly: false
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast.error('Failed to upload file');
    }
  };

  if (!activeProject) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm border">
        <p className="text-center text-gray-500">
          Please select or create a project first
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border">
      <form className="space-y-4">
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-gray-500" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">Any file type supported</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileSelect}
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description of source
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={e => setFormData(d => ({ ...d, description: e.target.value }))}
            className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Small emblem in shape of rabbit"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role in project
          </label>
          <input
            type="text"
            value={formData.role}
            onChange={e => setFormData(d => ({ ...d, role: e.target.value }))}
            className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Element of design, logotype of company"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="readOnly"
            checked={formData.readOnly}
            onChange={e => setFormData(d => ({ ...d, readOnly: e.target.checked }))}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="readOnly" className="text-sm text-gray-700">
            Read-only (cannot be modified by agents)
          </label>
        </div>
      </form>
    </div>
  );
}
